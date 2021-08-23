import {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'milliseconds'
 * @param initial		Object's initial value (in milliseconds).
 * @returns				Time object
 */
export function milliseconds(initial: number): Time {
	return timeMake('ms', initial);
}