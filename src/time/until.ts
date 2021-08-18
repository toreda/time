import {Time} from '../time';
import {timeConvert} from './convert';
import {timeMake} from './make';
import {timeNow} from './now';

export function timeUntil(time: Time | number): Time {
	const output = timeMake('s', 0);
	const now = timeNow();
	const future = typeof time === 'number' ? time : timeConvert(time.units(), 's', time());

	if (future === null) {
		return output;
	}

	const result = future - now();

	return timeMake('s', result);
}
