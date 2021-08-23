import {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'microseconds'
 * @param initial		Object's initial value (in microseconds).
 * @returns				Time object
 */
export function microseconds(initial: number): Time {
	return timeMake('μs', initial);
}
