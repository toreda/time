import {timeMethods} from '../methods';

/**
 * Check whether provided object defines all time methods required to
 * a Time object, and is itself callable (Time instances are callable).
 * @param o
 * @returns
 *
 * @category Validators
 */
export function timeCheckMethods(o: unknown): boolean {
	if (typeof o !== 'function') {
		return false;
	}

	const candidate = o as unknown as Record<string, unknown>;
	for (const timeMethod of timeMethods) {
		if (typeof candidate[timeMethod] !== 'function') {
			return false;
		}
	}

	return true;
}
