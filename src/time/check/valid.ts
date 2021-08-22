import {Time} from '../../time';
import {timeCheckMethods} from './methods';
import {timeCheckType} from './type';

/**
 * Determine if target object is a valid Time object. Inspects object for
 * all required properties and methods to determine validity.
 * @param o
 * @returns
 */
export function timeCheckValid(o: unknown): o is Time {
	if (!timeCheckType(o)) {
		return false;
	}

	if (!timeCheckMethods(o)) {
		return false;
	}

	return true;
}
