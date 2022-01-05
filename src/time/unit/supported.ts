import type {TimeUnit} from '../unit';
import {timeUnits} from '../units';

/**
 * Check if time unit is supported.
 * @param unit		String to validate as supported time unit.
 * @returns			true 	-	Provided `unit` string is a supported time unit.
 *					false	-	Provided `unit` string is not a supported time unit.
 *
 * @category Time Units
 */
export function timeUnitSupported(unit?: TimeUnit): unit is TimeUnit {
	if (!unit) {
		return false;
	}

	if (!timeUnits.has(unit)) {
		return false;
	}

	return typeof timeUnits.get(unit) === 'string';
}
