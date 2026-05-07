import type {Time} from '../time';
import {TimeConstants} from './constants';
import type {TimeUnit} from './unit';
import {timeMake} from './make';

/**
 * Create timestamp using current time at creation. Does not automatically
 * update  to match
 * @param units
 * @returns
 */
export function timeNow(units?: TimeUnit): Time {
	const targetUnits = units ?? 's';
	const now = Math.floor(Date.now() / TimeConstants.SECONDS_TO_MILLISECONDS);

	return timeMake(targetUnits, now);
}
