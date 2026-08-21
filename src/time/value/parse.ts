import type {TimeUnit} from '../unit';
import {TimeUtils} from '../utils';
import {timeConvert} from '../convert';

const SUFFIX_RE = /(\d+(?:\.\d+)?)(us|ms|mo|y|w|d|h|m|s)/g;
const PURE_NUMERIC_RE = /^[+-]?\d+(\.\d+)?$/;
const DATE_LIKE_RE = /[-/:T]/;

const UNIT_ORDER: TimeUnit[] = ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms', 'us'];
const UNIT_RANK: Record<TimeUnit, number> = UNIT_ORDER.reduce(
	(acc, u, i) => {
		acc[u] = i;
		return acc;
	},
	{} as Record<TimeUnit, number>
);

/**
 * Parse a duration value into a number expressed in `units`. Accepts:
 *   - finite numbers (returned as-is when in safe range)
 *   - pure numeric strings ('5', '-1.5', '+30') - interpreted as a duration in `units`
 *   - simple suffix form ('5m', '-1.5h', '+30s') - converted to `units`
 *   - compound suffix form ('1h30m', '2d4h30m') - components must be in
 *     descending unit order with no repeats and no whitespace; sign applies
 *     to the whole expression, not per component
 *
 * Returns null for empty / whitespace-only strings, NaN/Infinity, date-like
 * strings (those containing '-', '/', ':', or 'T' - use `timeValueParseDate`
 * for those), unit aliases like '5min', and any result outside the safe
 * integer range.
 *
 * @param value		Duration value to parse.
 * @param units		Target unit; pure numeric strings are read as this unit
 *					and suffix components are converted into this unit.
 *
 * @category Time Parsing
 */
export function timeValueParse(value: number | string, units: TimeUnit): number | null {
	if (typeof value === 'number') {
		if (!isFinite(value) || !TimeUtils.withinSafeRange(value)) {
			return null;
		}
		return value;
	}

	if (typeof value !== 'string') {
		return null;
	}

	const trimmed = value.trim();
	if (trimmed.length === 0) {
		return null;
	}

	if (PURE_NUMERIC_RE.test(trimmed)) {
		const n = Number(trimmed);
		if (!isFinite(n) || !TimeUtils.withinSafeRange(n)) {
			return null;
		}
		return n;
	}

	let body = trimmed;
	let sign = 1;
	if (body[0] === '+' || body[0] === '-') {
		sign = body[0] === '-' ? -1 : 1;
		body = body.slice(1);
	}

	if (body.length === 0) {
		return null;
	}

	if (DATE_LIKE_RE.test(body)) {
		return null;
	}

	SUFFIX_RE.lastIndex = 0;
	const seen = new Set<TimeUnit>();
	let consumed = 0;
	let lastRank = -1;
	let total = 0;

	let match: RegExpExecArray | null;
	while ((match = SUFFIX_RE.exec(body)) !== null) {
		if (match.index !== consumed) {
			return null;
		}

		const componentValue = Number(match[1]);
		const componentUnit = match[2] as TimeUnit;

		if (seen.has(componentUnit)) {
			return null;
		}

		const rank = UNIT_RANK[componentUnit];
		if (rank <= lastRank) {
			return null;
		}

		const converted = timeConvert(componentUnit, units, componentValue);
		if (converted === null) {
			return null;
		}

		total += converted;
		seen.add(componentUnit);
		lastRank = rank;
		consumed = SUFFIX_RE.lastIndex;
	}

	if (consumed === 0 || consumed !== body.length) {
		return null;
	}

	const result = sign * total;
	if (!isFinite(result) || !TimeUtils.withinSafeRange(result)) {
		return null;
	}

	return result;
}
