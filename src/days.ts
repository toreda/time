import {Time} from './time';
import {timeMake} from './time/make';

export function days(value: number): Time {
	return timeMake('d', value);
}
