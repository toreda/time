import type {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'seconds'
 * @param initial		Object's initial value (in seconds).
 * @returns				Time object
 *
 * @category Time Conversions
 */
export function seconds(initial: number): Time {
	return timeMake('s', initial);
}
