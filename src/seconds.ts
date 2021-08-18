import {Time} from './time';
import {timeMake} from './time/make';

export function seconds(value: number): Time {
	return timeMake('s', value);
}
