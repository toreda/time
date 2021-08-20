import {fromSecondsFactor, toSecondsFactor} from './conversion/factor';

import {TimeUnit} from './unit';
import {timeUnitSupported} from './unit/supported';

/**
 * Check whether time conversion is possible before calling time convert.
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
 * Convert time value from a supported time unit to another supported time unit.
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
	const decimalCount = typeof decimals === 'number' ? decimals : 2;

	if (!canConvert(from, to, value)) {
		return null;
	}

	if (value === 0) {
		return 0;
	}

	if (from === to) {
		return value;
	}

	// Get conversion factor to go from input value units to seconds.
	const toSeconds = toSecondsFactor(from);
	// Get conversion factor to go from seconds to output unit.
	const fromSeconds = fromSecondsFactor(to);

	// Convert input unit to seconds.
	const valueIn = value * toSeconds;
	const valueOut = valueIn * fromSeconds;

	if (isNaN(valueOut)) {
		return null;
	}

	if (Math.floor(valueOut) === valueOut) {
		return valueOut;
	}

	return Number.parseFloat(valueOut.toFixed(decimalCount));
}
