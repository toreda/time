import {TimeConstants} from './constants';
import type {TimeUnit} from './unit';

export const timeConversions: Record<TimeUnit, Record<TimeUnit, number>> = {
	m: {
		d: TimeConstants.MINUTES_TO_DAYS,
		h: TimeConstants.MINUTES_TO_HOURS,
		m: 1,
		mo: TimeConstants.MINUTES_TO_MONTHS,
		ms: TimeConstants.MINUTES_TO_MILLISECONDS,
		s: TimeConstants.MINUTES_TO_SECONDS,
		w: TimeConstants.MINUTES_TO_WEEKS,
		y: TimeConstants.MINUTES_TO_YEARS,
		μs: TimeConstants.MINUTES_TO_MICROSECONDS
	},
	s: {
		d: TimeConstants.SECONDS_TO_DAYS,
		h: TimeConstants.SECONDS_TO_HOURS,
		m: TimeConstants.SECONDS_TO_MINUTES,
		mo: TimeConstants.SECONDS_TO_MONTHS,
		ms: TimeConstants.SECONDS_TO_MILLISECONDS,
		s: 1,
		w: TimeConstants.SECONDS_TO_WEEKS,
		y: TimeConstants.SECONDS_TO_YEARS,
		μs: TimeConstants.SECONDS_TO_MICROSECONDS
	},
	h: {
		d: TimeConstants.HOURS_TO_DAYS,
		h: 1,
		m: TimeConstants.HOURS_TO_MINUTES,
		mo: TimeConstants.HOURS_TO_MONTHS,
		ms: TimeConstants.HOURS_TO_MILLISECONDS,
		s: TimeConstants.HOURS_TO_SECONDS,
		w: TimeConstants.HOURS_TO_WEEKS,
		y: TimeConstants.HOURS_TO_YEARS,
		μs: TimeConstants.HOURS_TO_MICROSECONDS
	},
	mo: {
		d: TimeConstants.MONTHS_TO_DAYS,
		h: TimeConstants.MONTHS_TO_HOURS,
		m: TimeConstants.MONTHS_TO_MINUTES,
		mo: 1,
		ms: TimeConstants.MONTHS_TO_MILLISECONDS,
		s: 1,
		w: TimeConstants.MONTHS_TO_WEEKS,
		y: TimeConstants.MONTHS_TO_YEARS,
		μs: TimeConstants.MONTHS_TO_MICROSECONDS
	},
	d: {
		d: 1,
		h: TimeConstants.DAYS_TO_HOURS,
		m: TimeConstants.DAYS_TO_MINUTES,
		s: TimeConstants.DAYS_TO_SECONDS,
		mo: TimeConstants.DAYS_TO_MONTHS,
		ms: TimeConstants.DAYS_TO_MILLISECONDS,
		w: TimeConstants.DAYS_TO_WEEKS,
		y: TimeConstants.DAYS_TO_YEARS,
		μs: TimeConstants.DAYS_TO_MICROSECONDS
	},
	w: {
		d: TimeConstants.WEEKS_TO_DAYS,
		h: TimeConstants.WEEKS_TO_HOURS,
		m: TimeConstants.WEEKS_TO_MINUTES,
		mo: TimeConstants.WEEKS_TO_MONTHS,
		ms: TimeConstants.WEEKS_TO_MILLISECONDS,
		s: TimeConstants.WEEKS_TO_SECONDS,
		w: 1,
		y: TimeConstants.WEEKS_TO_YEARS,
		μs: TimeConstants.WEEKS_TO_MICROSECONDS
	},
	y: {
		d: TimeConstants.YEARS_TO_DAYS,
		h: TimeConstants.YEARS_TO_HOURS,
		m: TimeConstants.YEARS_TO_MINUTES,
		mo: TimeConstants.YEARS_TO_MONTHS,
		ms: TimeConstants.YEARS_TO_MILLISECONDS,
		s: TimeConstants.YEARS_TO_SECONDS,
		w: TimeConstants.YEARS_TO_WEEKS,
		y: 1,
		μs: TimeConstants.YEARS_TO_MICROSECONDS
	},
	ms: {
		d: TimeConstants.MILLISECONDS_TO_DAYS,
		h: TimeConstants.MILLISECONDS_TO_HOURS,
		m: TimeConstants.MILLISECONDS_TO_MINUTES,
		s: TimeConstants.MILLISECONDS_TO_SECONDS,
		mo: TimeConstants.MILLISECONDS_TO_MONTHS,
		ms: 1,
		w: TimeConstants.MILLISECONDS_TO_WEEKS,
		y: TimeConstants.MILLISECONDS_TO_YEARS,
		μs: TimeConstants.MILLISECONDS_TO_MICROSECONDS
	},
	μs: {
		d: TimeConstants.MICROSECONDS_TO_DAYS,
		h: TimeConstants.MICROSECONDS_TO_HOURS,
		m: TimeConstants.MICROSECONDS_TO_MINUTES,
		mo: TimeConstants.MICROSECONDS_TO_MONTHS,
		ms: TimeConstants.MICROSECONDS_TO_MILLISECONDS,
		s: TimeConstants.MICROSECONDS_TO_SECONDS,
		w: TimeConstants.MICROSECONDS_TO_WEEKS,
		y: TimeConstants.MICROSECONDS_TO_YEARS,
		μs: 1
	}
};
