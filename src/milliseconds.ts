import type {LogLike} from './log/like';
import type {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object in 'milliseconds'
 * @param initial		Object's initial value (in milliseconds).
 * @returns				Time object
 *
 * @category Time Conversions
 */
export function milliseconds(initial: number, log?: LogLike): Time {
	return timeMake('ms', initial, log);
}
