import type {Time} from '../../time';
import {timeNow} from '../now';

export function timeNowOffset(offset: number | Time): Time {
	return timeNow().add(offset);
}
