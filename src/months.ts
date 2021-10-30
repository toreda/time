import {Log} from '@toreda/log';
import {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'months'
 * @param initial		Object's initial value (in months).
 * @returns				Time object
 *
 * @category Time Conversions
 */
export function months(initial: number, log?: Log): Time {
	return timeMake('mo', initial, log);
}
