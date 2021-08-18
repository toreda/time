import {Time} from './time';
import {timeMake} from './time/make';

export function years(value: number): Time {
	return timeMake('y', value);
}
