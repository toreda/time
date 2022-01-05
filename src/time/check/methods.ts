import type {Time} from '../../time';
import {timeMethods} from '../methods';

/**
 * Check whether provided object defines all time methods required to
 * a Time object.
 * @param o
 * @returns
 *
 * @category Validators
 */
export function timeCheckMethods(o?: Time | null): boolean {
	if (!o) {
		return false;
	}

	for (const timeMethod of timeMethods) {
		if (typeof o[timeMethod] !== 'function') {
			return false;
		}
	}

	return true;
}
