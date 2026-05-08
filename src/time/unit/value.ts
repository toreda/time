import {type TimeUnit} from '../unit';
import {timeUnitSupported} from './supported';

/**
 * Returns the first value that is a valid `TimeUnit`. If none of the
 * provided values are valid, returns `fallback`.
 *
 * @param fallback		Returned when no `values` entry is a valid `TimeUnit`.
 * @param values		Candidate values to validate, in priority order.
 *
 * @category Time Units
 */
export function timeUnitValue(fallback: TimeUnit, ...values: unknown[]): TimeUnit {
	if (!Array.isArray(values) || !values.length) {
		return fallback;
	}

	for (const value of values) {
		if (timeUnitSupported(value)) {
			return value;
		}
	}

	return fallback;
}
