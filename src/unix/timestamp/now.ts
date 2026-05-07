import {TimeConstants} from '../../time/constants';

/**
 * Get the current time as a unix timestamp in number form.
 * Does not create a Time object.
 * @param offset		Optional seconds to add or subtract from timestamp. No effect on
 *						on result when not provided.
 * @returns				Number of seconds since Unix Epoch.
 */
export function unixTimestampNow(offset?: number | null): number {
	const now = Math.floor(Date.now() / TimeConstants.SECONDS_TO_MILLISECONDS);

	let result = now;
	if (typeof offset === 'number') {
		result += offset;
	}

	return result;
}
