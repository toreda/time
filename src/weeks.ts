import {Time} from './time';
import {timeMake} from './time/make';

export function weeks(value: number): Time {
	return timeMake('w', value);
}
