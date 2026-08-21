import type {TimeUnit} from '../unit';
import {TimeUtils} from '../utils';
import {timeConvert} from '../convert';

/**
 * Parse a timestamp value into a number expressed in `units`. Accepts:
 *   - finite numbers (treated as **already** a timestamp in `units`; not
 *     re-interpreted as ms or seconds)
 *   - any string accepted by `Date.parse` (ISO 8601, RFC 2822, etc.) -
 *     converted from ms to `units`
 *
 * Returns null for empty / whitespace-only strings, NaN/Infinity numeric
 * input, unparseable strings, pre-epoch results (negative timestamps), and
 * any result outside the safe integer range.
 *
 * @param value		Timestamp value to parse.
 * @param units		Target unit. Numeric inputs are treated as already in
 *					this unit; date-string inputs are converted from ms.
 *
 * @category Time Parsing
 */
export function timeValueParseDate(value: number | string, units: TimeUnit): number | null {
	if (typeof value === 'number') {
		if (!isFinite(value) || !TimeUtils.withinSafeRange(value)) {
			return null;
		}
		if (value < 0) {
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

	const ms = Date.parse(trimmed);
	if (!isFinite(ms)) {
		return null;
	}

	if (ms < 0) {
		return null;
	}

	const converted = timeConvert('ms', units, ms);
	if (converted === null || !TimeUtils.withinSafeRange(converted)) {
		return null;
	}

	return converted;
}
