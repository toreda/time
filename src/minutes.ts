import {Time} from './time';
import {timeMake} from './time/make';

export function minutes(value: number): Time {
	return timeMake('m', value);
}
