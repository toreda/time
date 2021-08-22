import {Time} from '../../time';
import {timeMethods} from '../methods';

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
