import {TimeUnit} from '../unit';
import {timeUnits} from '../units';

/**
 * Check whether target
 * @param key
 * @returns
 */
export function timeUnitSupported(unit?: TimeUnit): boolean {
	if (!unit) {
		return false;
	}

	if (!timeUnits.has(unit)) {
		return false;
	}

	return typeof timeUnits.get(unit) === 'string';
}
