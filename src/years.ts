import type {LogLike} from './log/like';
import type {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'years'
 * @param initial		Object's initial value (in years).
 * @returns				Time object
 *
 * @category Time Conversions
 */
export function years(initial: number | string, log?: LogLike): Time {
	return timeMake('y', initial, log);
}
