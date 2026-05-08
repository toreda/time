import {TimeConstants} from '../../time/constants';

/**
 * Get the current time as a unix timestamp in integer seconds.
 * Does not create a Time object.
 *
 * @param offset	Optional seconds to add or subtract. Non-finite values
 *					(NaN, Infinity) are ignored. No effect when omitted or null.
 * @returns			Seconds since Unix Epoch.
 */
export function unixTimestampNow(offset?: number | null): number {
	const now = Math.floor(Date.now() / TimeConstants.SECONDS_TO_MILLISECONDS);

	if (typeof offset !== 'number' || !isFinite(offset)) {
		return now;
	}

	return now + offset;
}
