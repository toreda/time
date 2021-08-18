import {Time} from './time';
import {timeMake} from './time/make';

export function months(value: number): Time {
	return timeMake('mo', value);
}
