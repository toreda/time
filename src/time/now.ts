import {Defaults} from '../defaults';
import {Time} from '../time';
import {TimeUnit} from './unit';
import {timeMake} from './make';

/**
 * Create timestamp using current time at creation. Does not automatically
 * update  to match
 * @param units
 * @returns
 */
export function timeNow(units?: TimeUnit): Time {
	const targetUnits = units ?? 's';
	const now = Math.floor(Date.now() / Defaults.Time.MsPerSec);

	return timeMake(targetUnits, now);
}
