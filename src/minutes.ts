import {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'minutes'
 * @param initial		Object's initial value (in minutes).
 * @returns				Time object
 */
export function minutes(initial: number): Time {
	return timeMake('m', initial);
}
