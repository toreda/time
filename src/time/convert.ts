import type {TimeUnit} from './unit';
import {TimeUnits} from './utils';
import {timeConversions} from './conversions';

/**
 * Check whether timeConvert can convert between the provided units.
 * @deprecated Use `TimeUnits.canConvert` instead. This re-export will be removed in a future major release.
 * @param from
 * @param to
 * @param value
 * @returns
 */
export function canConvert(from: TimeUnit, to: TimeUnit, value?: number | null): value is number {
	return TimeUnits.canConvert(from, to, value);
}

/**
 * Convert value to a different time unit.
 * @param from
 * @param to
 * @param value
 * @param decimals
 * @returns
 */
export function timeConvert(
	from: TimeUnit,
	to: TimeUnit,
	value?: number | null,
	decimals?: number
): number | null {
	if (!TimeUnits.canConvert(from, to, value)) {
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
	if (!isFinite(result) || !TimeUnits.withinSafeRange(result)) {
		return null;
	}

	if (Number.isInteger(result)) {
		return result;
	}

	const decimalCount = TimeUnits.resolveDecimals(decimals);
	const rounded = TimeUnits.roundToDecimals(result, decimalCount);

	if (rounded !== 0) {
		return rounded;
	}

	const preserved = Number(result.toPrecision(Math.max(decimalCount, 1)));
	return isFinite(preserved) ? preserved : null;
}
