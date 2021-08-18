import {Time} from './time';
import {timeMake} from './time/make';

export function hours(value: number): Time {
	return timeMake('h', value);
}
