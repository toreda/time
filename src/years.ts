import {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'years'
 * @param initial		Object's initial value (in years).
 * @returns				Time object
 */
export function years(initial: number): Time {
	return timeMake('y', initial);
}
