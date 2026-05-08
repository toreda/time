import type {Time} from '../time';
import type {TimeUnit} from './unit';
import {timeConvert} from './convert';
import {timeMake} from './make';

/**
 * Create a Time snapshot of the current system clock in `units`
 * (defaults to seconds). The returned Time holds a frozen value
 * captured at call time and does not auto-update.
 */
export function timeNow(units?: TimeUnit): Time {
	const targetUnits = units ?? 's';
	const value = timeConvert('ms', targetUnits, Date.now()) ?? 0;

	return timeMake(targetUnits, value);
}
