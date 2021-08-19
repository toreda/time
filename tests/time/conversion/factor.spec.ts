import {fromSecondsFactor, toSecondsFactor} from '../../../src/time/conversion/factor';

import {TimeConstants} from '../../../src/time/constants';

describe('Time Conversion Factors', () => {
	describe('toSecondsFactor', () => {
		it(`should return 0 when unit is an unsupported time unit`, () => {
			expect(toSecondsFactor('-----' as any)).toBe(0);
		});

		it(`should return 0 when unit arg is undefined`, () => {
			expect(toSecondsFactor(undefined as any)).toBe(0);
		});

		it(`should return 0 when unit arg is null`, () => {
			expect(toSecondsFactor(null as any)).toBe(0);
		});

		it(`should return seconds -> years conversion factor when unit arg is 'y'`, () => {
			expect(toSecondsFactor('y')).toBe(TimeConstants.YEARS_TO_SECONDS);
		});

		it(`should return seconds -> mo conversion factor when unit arg is 'mo'`, () => {
			expect(toSecondsFactor('mo')).toBe(TimeConstants.MONTHS_TO_SECONDS);
		});

		it(`should return seconds -> w conversion factor when unit arg is 'w'`, () => {
			expect(toSecondsFactor('w')).toBe(TimeConstants.WEEKS_TO_SECONDS);
		});

		it(`should return seconds -> d conversion factor when unit arg is 'd'`, () => {
			expect(toSecondsFactor('d')).toBe(TimeConstants.DAYS_TO_SECONDS);
		});

		it(`should return seconds -> h conversion factor when unit arg is 'h'`, () => {
			expect(toSecondsFactor('h')).toBe(TimeConstants.HOURS_TO_SECONDS);
		});

		it(`should return seconds -> m conversion factor when unit arg is 'm'`, () => {
			expect(toSecondsFactor('m')).toBe(TimeConstants.MINUTES_TO_SECONDS);
		});

		it(`should return seconds -> seconds conversion factor when unit arg is 's'`, () => {
			expect(toSecondsFactor('s')).toBe(1);
		});

		it(`should return seconds -> ms conversion factor when unit arg is 'ms'`, () => {
			expect(toSecondsFactor('ms')).toBe(TimeConstants.MILLISECONDS_TO_SECONDS);
		});

		it(`should return seconds -> d conversion factor when unit arg is 'd'`, () => {
			expect(toSecondsFactor('μs')).toBe(TimeConstants.MICROSECONDS_TO_SECONDS);
		});
	});

	describe('fromSecondsFactor', () => {
		it(`should return 0 when unit is an unsupported time unit`, () => {
			expect(fromSecondsFactor('-----' as any)).toBe(0);
		});

		it(`should return 0 when unit arg is undefined`, () => {
			expect(fromSecondsFactor(undefined as any)).toBe(0);
		});

		it(`should return 0 when unit arg is null`, () => {
			expect(fromSecondsFactor(null as any)).toBe(0);
		});

		it(`should return seconds -> years conversion factor when unit arg is 'y'`, () => {
			expect(fromSecondsFactor('y')).toBe(TimeConstants.SECONDS_TO_YEARS);
		});

		it(`should return seconds -> mo conversion factor when unit arg is 'mo'`, () => {
			expect(fromSecondsFactor('mo')).toBe(TimeConstants.SECONDS_TO_MONTHS);
		});

		it(`should return seconds -> w conversion factor when unit arg is 'w'`, () => {
			expect(fromSecondsFactor('w')).toBe(TimeConstants.SECONDS_TO_WEEKS);
		});

		it(`should return seconds -> d conversion factor when unit arg is 'd'`, () => {
			expect(fromSecondsFactor('d')).toBe(TimeConstants.SECONDS_TO_DAYS);
		});

		it(`should return seconds -> h conversion factor when unit arg is 'h'`, () => {
			expect(fromSecondsFactor('h')).toBe(TimeConstants.SECONDS_TO_HOURS);
		});

		it(`should return seconds -> m conversion factor when unit arg is 'm'`, () => {
			expect(fromSecondsFactor('m')).toBe(TimeConstants.SECONDS_TO_MINUTES);
		});

		it(`should return seconds -> seconds conversion factor when unit arg is 's'`, () => {
			expect(fromSecondsFactor('s')).toBe(1);
		});

		it(`should return seconds -> ms conversion factor when unit arg is 'ms'`, () => {
			expect(fromSecondsFactor('ms')).toBe(TimeConstants.SECONDS_TO_MILLISECONDS);
		});

		it(`should return seconds -> d conversion factor when unit arg is 'd'`, () => {
			expect(fromSecondsFactor('μs')).toBe(TimeConstants.SECONDS_TO_MICROSECONDS);
		});
	});
});
