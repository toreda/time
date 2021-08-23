import {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'months'
 * @param initial		Object's initial value (in months).
 * @returns				Time object
 */
export function months(initial: number): Time {
	return timeMake('mo', initial);
}
