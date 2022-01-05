import type {Time} from '../time';
import {timeCheckMethods} from './check/methods';
import {timeCheckType} from './check/type';

/**
 * Determine if target object is a valid Time object. Inspects object for
 * all required properties and methods to determine validity.
 * @param o
 * @returns
 *
 * @category Validators
 */
export function timeValid(o: unknown): o is Time {
	if (!timeCheckType(o)) {
		return false;
	}

	if (!timeCheckMethods(o)) {
		return false;
	}

	return true;
}
