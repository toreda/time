import {TimeConstants} from '../constants';
import {TimeUnit} from '../unit';
import {timeUnitSupported} from '../unit/supported';

export function toSecondsFactor(unit?: TimeUnit): number {
	if (!timeUnitSupported(unit)) {
		return 0;
	}

	switch (unit) {
		case 'y':
			return TimeConstants.YEARS_TO_SECONDS;
		case 'mo':
			return TimeConstants.MONTHS_TO_SECONDS;
		case 'w':
			return TimeConstants.WEEKS_TO_SECONDS;
		case 'd':
			return TimeConstants.DAYS_TO_SECONDS;
		case 'h':
			return TimeConstants.HOURS_TO_SECONDS;
		case 'm':
			return TimeConstants.MINUTES_TO_SECONDS;
		case 's':
			return 1;
		case 'ms':
			return TimeConstants.MILLISECONDS_TO_SECONDS;
		case 'μs':
			return TimeConstants.MICROSECONDS_TO_SECONDS;
		default:
			return 0;
	}
}

export function fromSecondsFactor(unit?: TimeUnit): number {
	switch (unit) {
		case 'y':
			return TimeConstants.SECONDS_TO_YEARS;
		case 'mo':
			return TimeConstants.SECONDS_TO_MONTHS;
		case 'w':
			return TimeConstants.SECONDS_TO_WEEKS;
		case 'd':
			return TimeConstants.SECONDS_TO_DAYS;
		case 'h':
			return TimeConstants.SECONDS_TO_HOURS;
		case 'm':
			return TimeConstants.SECONDS_TO_MINUTES;
		case 's':
			return 1;
		case 'ms':
			return TimeConstants.SECONDS_TO_MILLISECONDS;
		case 'μs':
			return TimeConstants.SECONDS_TO_MICROSECONDS;
		default:
			return 0;
	}
}
