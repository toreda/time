import type {Time} from '../time';
import type {TimeUnit} from './unit';
import {timeNow} from './now';

/**
 * Time elapsed since `time`. Negative when `time` is in the future.
 * Numbers are interpreted as a unix timestamp in seconds. The returned
 * Time uses `units` (defaults to seconds). Returns null when input is
 * invalid or the computed result falls outside the safe integer range.
 *
 * @param time		Reference Time instance, or unix timestamp in seconds.
 * @param units		Units for the returned Time. Defaults to `'s'`.
 */
export function timeSince(time: Time | number, units: TimeUnit = 's'): Time | null {
	return timeNow(units).since(time);
}
