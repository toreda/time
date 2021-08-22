import {Time} from '../../time';
import {timeCheckMethods} from './methods';
import {timeCheckType} from './type';

export function timeCheckValid(o: unknown): o is Time {
	if (!timeCheckType(o)) {
		return false;
	}

	if (!timeCheckMethods(o)) {
		return false;
	}

	return true;
}
