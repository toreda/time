import {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'weeks'
 * @param initial		Object's initial value (in weeks).
 * @returns				Time object
 */
export function weeks(initial: number): Time {
	return timeMake('w', initial);
}
