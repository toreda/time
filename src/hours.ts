import {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'hours'
 * @param initial		Object's initial value (in hours).
 * @returns				Time object
 */
export function hours(initial: number): Time {
	return timeMake('h', initial);
}
