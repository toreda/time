import {Time} from '../time';
import {timeNow} from './now';

export function timeSince(time: Time | number): Time {
	const now = timeNow();
	now.sub(time);
	return now;
}
