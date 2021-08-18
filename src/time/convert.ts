import {fromSecondsFactor, toSecondsFactor} from './conversion/factor';

import {TimeUnit} from './unit';
import {timeUnitSupported} from './unit/supported';

export function timeConvert(from: TimeUnit, to: TimeUnit, value: number, decimals?: number): number | null {
	const decimalCount = typeof decimals === 'number' ? decimals : 2;

	if (typeof value !== 'number' || isNaN(value)) {
		return null;
	}

	if (!timeUnitSupported(from) || !timeUnitSupported(to)) {
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
	if (toSeconds === 0) {
		return null;
	}

	// Get conversion factor to go from seconds to output unit.
	const fromSeconds = fromSecondsFactor(to);
	if (fromSeconds === 0) {
		return null;
	}

	// Convert input unit to seconds.
	const valueIn = value * toSeconds;
	const valueOut = valueIn * fromSeconds;

	if (isNaN(valueOut) || !isFinite(valueOut)) {
		return null;
	}

	if (Math.floor(valueOut) === valueOut) {
		return valueOut;
	}

	return Number.parseFloat(valueOut.toFixed(decimalCount));
}
