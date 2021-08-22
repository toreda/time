import {Time} from '../../time';

/**
 *
 * @param o
 * @returns
 *
 * @category Helpers
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
