import type {LogLike} from './log/like';
import type {Time} from './time';
import {timeMake} from './time/make';

/**
 * Create Time object using minutes.
 * @param initial		Object's initial value (in minutes).
 * @returns				Time object
 *
 * @category Time Conversions
 */
export function minutes(initial: number | string, log?: LogLike): Time {
	return timeMake('m', initial, log);
}
