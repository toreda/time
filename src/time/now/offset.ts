import {Time} from '../../time';
import {timeNow} from '../now';

export function timeNowOffset(offset: number | Time): Time {
	const now = timeNow();
	now.add(offset);

	return now;
}
