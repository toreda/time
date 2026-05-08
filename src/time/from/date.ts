import type {LogLike} from '../../log/like';
import type {Time} from '../../time';
import type {TimeUnit} from '../unit';
import {timeMake} from '../make';
import {timeValueParseDate} from '../value/parse-date';

/**
 * Create a Time instance from a date string or numeric timestamp. Strings
 * are parsed with `Date.parse` (ISO 8601, RFC 2822, etc.); numbers are
 * treated as already a timestamp in `units`.
 *
 * Bad input is sanitized to `0` and logged, matching `timeMake`'s contract.
 *
 * @param input		Date string or numeric timestamp.
 * @param units		Target unit. Defaults to `'s'` (unix seconds).
 * @param log
 *
 * @category Factories
 */
export function timeFromDate(input: number | string, units: TimeUnit = 's', log?: LogLike): Time {
	const parsed = timeValueParseDate(input, units);
	return timeMake(units, parsed ?? 0, log);
}
