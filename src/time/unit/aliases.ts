import type {TimeUnit} from '../unit';

/**
 * Maps common time unit aliases (e.g. `'day'`, `'sec'`, `'minutes'`) to
 * their canonical `TimeUnit` value. Intended for user-facing functions
 * that accept loose alias input; core functions should use canonical
 * `TimeUnit` values directly.
 *
 * @category Time Units
 */
export const timeUnitAliases = new Map<string, TimeUnit>([
	['d', 'd'],
	['day', 'd'],
	['days', 'd'],
	['s', 's'],
	['sec', 's'],
	['secs', 's'],
	['seconds', 's'],
	['second', 's'],
	['h', 'h'],
	['hr', 'h'],
	['hrs', 'h'],
	['hour', 'h'],
	['hours', 'h'],
	['week', 'w'],
	['weeks', 'w'],
	['wk', 'w'],
	['wks', 'w'],
	['w', 'w'],
	['m', 'm'],
	['min', 'm'],
	['minute', 'm'],
	['minutes', 'm'],
	['mins', 'm'],
	['mo', 'mo'],
	['mos', 'mo'],
	['month', 'mo'],
	['months', 'mo'],
	['y', 'y'],
	['yr', 'y'],
	['yrs', 'y'],
	['year', 'y'],
	['years', 'y'],
	['ms', 'ms'],
	['milliseconds', 'ms'],
	['millisecond', 'ms'],
	['microsecond', 'μs'],
	['microseconds', 'μs'],
	['μs', 'μs']
]);
