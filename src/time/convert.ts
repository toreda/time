import type {TimeUnit} from './unit';
import {TimeUtils} from './utils';
import {timeConversions} from './conversions';

/**
 * @deprecated Use `TimeUtils.canConvert` instead. This re-export will be removed in a future major release.
 */
export const canConvert = TimeUtils.canConvert;

/**
 * Convert value to a different time unit.
 * @param from		`TimeUnit` to convert from.
 * @param to		`TimeUnit` to convert to.
 * @param value		value to convert
 * @param decimals	(optional) Decimals to use for precision.
 */
export function timeConvert(
	from: TimeUnit,
	to: TimeUnit,
	value?: number | null,
	decimals?: number
): number | null {
	if (!TimeUtils.canConvert(from, to, value)) {
		return null;
	}

	if (value === 0 || from === to) {
		return value;
	}

	const factor = timeConversions[from][to];
	if (typeof factor !== 'number' || !isFinite(factor)) {
		return null;
	}

	const result = value * factor;
	if (!isFinite(result) || !TimeUtils.withinSafeRange(result)) {
		return null;
	}

	if (Number.isInteger(result)) {
		return result;
	}

	const decimalCount = TimeUtils.resolveDecimals(decimals);
	const rounded = TimeUtils.roundToDecimals(result, decimalCount);

	if (rounded !== 0) {
		return rounded;
	}

	const preserved = Number(result.toPrecision(Math.max(decimalCount, 1)));
	return isFinite(preserved) ? preserved : null;
}
