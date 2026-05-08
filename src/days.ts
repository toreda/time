import type {LogLike} from './log/like';
import type {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'days'
 * @param initial		Object's initial value (in days).
 * @returns				Time object
 *
 * @category Time Conversions
 */
export function days(initial: number | string, log?: LogLike): Time {
	return timeMake('d', initial, log);
}
