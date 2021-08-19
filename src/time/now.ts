import {Time} from '../time';
import {timeMake} from './make';

export function timeNow(): Time {
	const now = Math.floor(Date.now() / 1000);

	return timeMake('s', now);
}
