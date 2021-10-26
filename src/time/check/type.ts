import {Time} from '../../time';

/**
 * Check whether provided object is a Time object.
 * @param o
 * @returns
 *
 * @category Validators
 */
export function timeCheckType(o: unknown): o is Time {
	if (!o) {
		return false;
	}

	const time = o as Time;

	if (!time.type) {
		return false;
	}

	return time.type === 'Time';
}
