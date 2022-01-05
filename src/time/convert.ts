import {Defaults} from '../defaults';
import type {TimeUnit} from './unit';
import {timeConversions} from './conversions';
import {timeUnitSupported} from './unit/supported';

/**
 * Check whether timeConvert can convert between the provided units.
 * @param from
 * @param to
 * @param value
 * @returns
 */
export function canConvert(from: TimeUnit, to: TimeUnit, value?: number | null): value is number {
	if (!timeUnitSupported(from)) {
		return false;
	}

	if (!timeUnitSupported(to)) {
		return false;
	}

	if (typeof value !== 'number' || isNaN(value)) {
		return false;
	}

	if (!isFinite(value)) {
		return false;
	}

	if (value > Number.MAX_SAFE_INTEGER) {
		return false;
	}

	if (value < Number.MIN_SAFE_INTEGER) {
		return false;
	}

	return true;
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
	const decimalCount = typeof decimals === 'number' ? decimals : Defaults.Math.Precision.Base;

	if (!canConvert(from, to, value)) {
		return null;
	}

	if (value === 0) {
		return 0;
	}

	if (from === to) {
		return value;
	}

	const conversionFactor = timeConversions[from][to];
	const result = value * conversionFactor;

	if (isNaN(result)) {
		return null;
	}

	if (result < Number.MIN_SAFE_INTEGER || result > Number.MAX_SAFE_INTEGER) {
		return null;
	}

	if (Math.floor(result) === result) {
		return result;
	}

	return Number.parseFloat(result.toFixed(decimalCount));
}
