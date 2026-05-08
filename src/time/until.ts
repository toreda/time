import type {Time} from '../time';
import type {TimeUnit} from './unit';
import {timeConvert} from './convert';
import {timeMake} from './make';
import {timeNow} from './now';
import {TimeUtils} from './utils';

/**
 * Time remaining until `time`. Negative when `time` is already in the past.
 * Numbers are interpreted as a unix timestamp in seconds. The returned Time
 * uses `units` (defaults to seconds). Returns null when input is invalid or
 * the computed result falls outside the safe integer range.
 *
 * @param time		Target Time instance, or unix timestamp in seconds.
 * @param units		Units for the returned Time. Defaults to `'s'`.
 */
export function timeUntil(time: Time | number, units: TimeUnit = 's'): Time | null {
	const now = timeNow(units);

	const future =
		typeof time === 'number' ? timeConvert('s', units, time) : timeConvert(time.units(), units, time());

	if (future === null) {
		return null;
	}

	const result = future - now();
	if (!isFinite(result) || !TimeUtils.withinSafeRange(result)) {
		return null;
	}

	return timeMake(units, result);
}
