import type {TimeUnit} from '../unit';
import {timeUnits} from '../units';

/**
 * Type guard: returns `true` only when `unit` is a canonical `TimeUnit`.
 * Aliases (e.g. `'day'`, `'sec'`) are rejected - use `timeUnitFromAlias`
 * to resolve aliases to canonical values first.
 *
 * @param unit		Value to validate as a canonical time unit.
 * @returns			true 	-	`unit` is a canonical `TimeUnit`.
 *					false	-	`unit` is not a canonical `TimeUnit`.
 *
 * @category Time Units
 */
export function timeUnitSupported(unit?: unknown): unit is TimeUnit {
	if (typeof unit !== 'string') {
		return false;
	}

	return timeUnits.has(unit as TimeUnit);
}
