import {canConvert, timeConvert} from '../../src/time/convert';

import {TimeConstants} from '../../src/time/constants';
import {TimeUnit} from '../../src/time/unit';
import {timeUnitLabels} from '../../src/time/unit/labels';

const MOCK_FROM = 's';
const MOCK_TO = 'ms';

function unitsAmtLabel(amt: number): string {
	if (amt < 1) {
		return 'partial unit';
	}

	if (amt === 1) {
		return 'single unit';
	}

	if (amt > 1) {
		return 'multiple units';
	}

	return 'zero units';
}

const CONVERT_TESTS = [
	{
		name: 'seconds',
		unit: 's',
		tests: [
			{from: 's', to: 's', value: 99910, result: 99910},
			{from: 's', to: 'h', value: TimeConstants.HOURS_TO_SECONDS, result: 1},
			{from: 's', to: 'h', value: TimeConstants.HOURS_TO_SECONDS * 10, result: 10},
			{from: 's', to: 'h', value: TimeConstants.HOURS_TO_SECONDS / 10, result: 0.1},
			{from: 's', to: 'h', value: TimeConstants.HOURS_TO_SECONDS / 2, result: 0.5},
			{from: 's', to: 'h', value: TimeConstants.HOURS_TO_SECONDS * 0.33, result: 0.33},
			{from: 's', to: 'ms', value: 60, result: TimeConstants.SECONDS_TO_MILLISECONDS * 60},
			{from: 's', to: 'ms', value: 33.1, result: TimeConstants.SECONDS_TO_MILLISECONDS * 33.1}
		]
	},
	{
		name: 'minutes',
		units: 'm',
		tests: [
			{from: 'm', to: 'h', value: TimeConstants.HOURS_TO_MINUTES * 10, result: 10},
			{from: 'm', to: 'h', value: TimeConstants.HOURS_TO_MINUTES, result: 1},
			{from: 'm', to: 'h', value: TimeConstants.HOURS_TO_MINUTES / 2, result: 0.5},
			{from: 'm', to: 'h', value: 23, result: 0.38},
			{from: 'm', to: 's', value: 1, result: TimeConstants.MINUTES_TO_SECONDS},
			{from: 'm', to: 's', value: 8, result: TimeConstants.MINUTES_TO_SECONDS * 8},
			{from: 'm', to: 's', value: 0.25, result: TimeConstants.MINUTES_TO_SECONDS / 4},
			{from: 'm', to: 'd', value: TimeConstants.DAYS_TO_MINUTES, result: 1},
			{from: 'm', to: 'd', value: TimeConstants.DAYS_TO_MINUTES * 8, result: 8},
			{from: 'm', to: 'd', value: TimeConstants.DAYS_TO_MINUTES / 4, result: 0.25},
			{from: 'm', to: 'w', value: TimeConstants.WEEKS_TO_MINUTES, result: 1},
			{from: 'm', to: 'w', value: TimeConstants.WEEKS_TO_MINUTES * 3, result: 3},
			{from: 'm', to: 'w', value: TimeConstants.WEEKS_TO_MINUTES / 4, result: 0.25},
			{from: 'm', to: 'mo', value: TimeConstants.MONTHS_TO_MINUTES, result: 1},
			{from: 'm', to: 'mo', value: TimeConstants.MONTHS_TO_MINUTES * 2, result: 2},
			{from: 'm', to: 'mo', value: TimeConstants.MONTHS_TO_MINUTES / 4, result: 0.25},
			{from: 'm', to: 'y', value: TimeConstants.YEARS_TO_MINUTES, result: 1},
			{from: 'm', to: 'y', value: TimeConstants.YEARS_TO_MINUTES * 8, result: 8},
			{from: 'm', to: 'y', value: TimeConstants.YEARS_TO_MINUTES / 4, result: 0.25},
			{from: 'm', to: 'm', value: 1, result: 1},
			{from: 'm', to: 'm', value: 2, result: 2},
			{from: 'm', to: 'm', value: 0.25, result: 0.25}
		]
	},
	{
		name: 'hours',
		units: 'h',
		tests: [
			{from: 'h', to: 'm', value: 1, result: TimeConstants.HOURS_TO_MINUTES},
			{from: 'h', to: 'm', value: 0.5, result: TimeConstants.HOURS_TO_MINUTES / 2},
			{from: 'h', to: 'm', value: 4, result: TimeConstants.HOURS_TO_MINUTES * 4},
			{from: 'h', to: 'y', value: TimeConstants.YEARS_TO_HOURS, result: 1},
			{from: 'h', to: 'y', value: TimeConstants.YEARS_TO_HOURS / 2, result: 0.5},
			{from: 'h', to: 'y', value: TimeConstants.YEARS_TO_HOURS * 4, result: 4},
			{from: 'h', to: 'mo', value: TimeConstants.MONTHS_TO_HOURS, result: 1},
			{from: 'h', to: 'mo', value: TimeConstants.MONTHS_TO_HOURS / 2, result: 0.5},
			{from: 'h', to: 'mo', value: TimeConstants.MONTHS_TO_HOURS * 4, result: 4},
			{from: 'h', to: 'w', value: TimeConstants.WEEKS_TO_HOURS * 0.33, result: 0.33},
			{from: 'h', to: 'w', value: TimeConstants.WEEKS_TO_HOURS * 7, result: 7},
			{from: 'h', to: 'w', value: TimeConstants.WEEKS_TO_HOURS, result: 1},
			{from: 'h', to: 's', value: 1, result: TimeConstants.HOURS_TO_SECONDS},
			{from: 'h', to: 's', value: 2, result: TimeConstants.HOURS_TO_SECONDS * 2},
			{from: 'h', to: 's', value: 0.5, result: TimeConstants.HOURS_TO_SECONDS / 2},
			{from: 'h', to: 'd', value: TimeConstants.DAYS_TO_HOURS * 3, result: 3},
			{from: 'h', to: 'd', value: TimeConstants.DAYS_TO_HOURS / 2, result: 0.5},
			{from: 'h', to: 'd', value: TimeConstants.DAYS_TO_HOURS, result: 1},

			{from: 'h', to: 'ms', value: 1 * 3, result: TimeConstants.HOURS_TO_MILLISECONDS * 3},
			{from: 'h', to: 'ms', value: 1, result: TimeConstants.HOURS_TO_MILLISECONDS},
			{from: 'h', to: 'ms', value: 0.5, result: TimeConstants.HOURS_TO_MILLISECONDS / 2},
			{from: 'h', to: 'μs', value: 1, result: TimeConstants.HOURS_TO_MICROSECONDS},
			{from: 'h', to: 'μs', value: 2, result: TimeConstants.HOURS_TO_MICROSECONDS * 2},
			{from: 'h', to: 'μs', value: 0.5, result: TimeConstants.HOURS_TO_MICROSECONDS / 2},

			{from: 'h', to: 'h', value: 1, result: 1},
			{from: 'h', to: 'h', value: 2, result: 2},
			{from: 'h', to: 'h', value: 0.5, result: 0.5}
		]
	},
	{
		name: 'days',
		units: 'd',
		tests: [
			{from: 'd', to: 'm', value: 4, result: 4 * TimeConstants.DAYS_TO_MINUTES},
			{
				from: 'd',
				to: 'm',
				value: 1,
				result: TimeConstants.DAYS_TO_MINUTES
			},
			{
				from: 'd',
				to: 'm',
				value: 0.5,
				result: TimeConstants.DAYS_TO_MINUTES / 2
			},
			{
				from: 'd',
				to: 's',
				value: 4,
				result: TimeConstants.DAYS_TO_SECONDS * 4
			},
			{
				from: 'd',
				to: 's',
				value: 0.5,
				result: TimeConstants.DAYS_TO_SECONDS / 2
			},
			{
				from: 'd',
				to: 's',
				value: 1,
				result: TimeConstants.DAYS_TO_SECONDS
			},
			{
				from: 'd',
				to: 'h',
				value: 3,
				result: TimeConstants.DAYS_TO_HOURS * 3
			},
			{
				from: 'd',
				to: 'h',
				value: 1,
				result: TimeConstants.DAYS_TO_HOURS * 1
			},
			{
				from: 'd',
				to: 'w',
				value: 14,
				result: 2
			},
			{
				from: 'd',
				to: 'w',
				value: 7,
				result: 1
			},
			{
				from: 'd',
				to: 'w',
				value: TimeConstants.WEEKS_TO_DAYS / 2,
				result: 0.5
			},
			{
				from: 'd',
				to: 'mo',
				value: TimeConstants.MONTHS_TO_DAYS / 2,
				result: 0.5
			},
			{
				from: 'd',
				to: 'mo',
				value: TimeConstants.MONTHS_TO_DAYS * 4,
				result: 4
			},
			{
				from: 'd',
				to: 'mo',
				value: TimeConstants.MONTHS_TO_DAYS,
				result: 1
			},
			{
				from: 'd',
				to: 'y',
				value: 365,
				result: 1
			},
			{
				from: 'd',
				to: 'y',
				value: 365 * 5,
				result: 5
			},
			{
				from: 'd',
				to: 'y',
				value: TimeConstants.YEARS_TO_DAYS / 2,
				result: 0.5
			}
		]
	},
	{
		name: 'weeks',
		units: 'w',
		tests: [
			{from: 'w', to: 's', value: 1, result: TimeConstants.WEEKS_TO_SECONDS},
			{from: 'w', to: 's', value: 0.25, result: TimeConstants.WEEKS_TO_SECONDS / 4},
			{from: 'w', to: 's', value: 5, result: TimeConstants.WEEKS_TO_SECONDS * 5},
			{from: 'w', to: 'h', value: 1, result: TimeConstants.WEEKS_TO_HOURS},
			{from: 'w', to: 'h', value: 0.5, result: TimeConstants.WEEKS_TO_HOURS / 2},
			{from: 'w', to: 'h', value: 8, result: TimeConstants.WEEKS_TO_HOURS * 8},
			{from: 'w', to: 'm', value: 1, result: TimeConstants.WEEKS_TO_MINUTES},
			{from: 'w', to: 'm', value: 0.5, result: TimeConstants.WEEKS_TO_MINUTES / 2},
			{from: 'w', to: 'm', value: 10, result: TimeConstants.WEEKS_TO_MINUTES * 10},
			{from: 'w', to: 's', value: 3, result: TimeConstants.WEEKS_TO_SECONDS * 3},
			{from: 'w', to: 's', value: 1, result: TimeConstants.WEEKS_TO_SECONDS},
			{from: 'w', to: 's', value: 0.5, result: TimeConstants.WEEKS_TO_SECONDS / 2},
			{from: 'w', to: 'ms', value: TimeConstants.MILLISECONDS_TO_WEEKS * 4, result: 4},
			{from: 'w', to: 'ms', value: TimeConstants.MILLISECONDS_TO_WEEKS, result: 1},
			{from: 'w', to: 'ms', value: TimeConstants.MILLISECONDS_TO_WEEKS / 4, result: 0.25},
			{from: 'w', to: 'y', value: TimeConstants.YEARS_TO_WEEKS * 2, result: 2},
			{from: 'w', to: 'y', value: TimeConstants.YEARS_TO_WEEKS, result: 1},
			{from: 'w', to: 'y', value: TimeConstants.YEARS_TO_WEEKS / 2, result: 0.5},
			{from: 'w', to: 'mo', value: TimeConstants.MONTHS_TO_WEEKS * 2, result: 2},
			{from: 'w', to: 'mo', value: TimeConstants.MONTHS_TO_WEEKS, result: 1},
			{from: 'w', to: 'mo', value: TimeConstants.MONTHS_TO_WEEKS / 2, result: 0.5},

			{from: 'w', to: 'd', value: 2, result: TimeConstants.WEEKS_TO_DAYS * 2},
			{from: 'w', to: 'd', value: 1, result: TimeConstants.WEEKS_TO_DAYS},
			{from: 'w', to: 'd', value: 0.5, result: TimeConstants.WEEKS_TO_DAYS / 2},
			{from: 'w', to: 'μs', value: 2, result: TimeConstants.WEEKS_TO_MICROSECONDS * 2},
			{from: 'w', to: 'μs', value: 1, result: TimeConstants.WEEKS_TO_MICROSECONDS},
			{from: 'w', to: 'μs', value: 0.5, result: TimeConstants.WEEKS_TO_MICROSECONDS / 2},

			{from: 'w', to: 'w', value: 2, result: 2},
			{from: 'w', to: 'w', value: 1, result: 1},
			{from: 'w', to: 'w', value: 0.5, result: 0.5}
		]
	}
];

describe('timeConvert', () => {
	describe('Helpers', () => {
		describe('canConvert', () => {
			it(`should return false when value is undefined`, () => {
				expect(canConvert(MOCK_FROM, MOCK_TO, undefined as any)).toBe(false);
			});

			it(`should return false when value is null`, () => {
				expect(canConvert(MOCK_FROM, MOCK_TO, null as any)).toBe(false);
			});

			it(`should return false when value is a truthy non-number`, () => {
				expect(canConvert(MOCK_FROM, MOCK_TO, 'aaaa' as any)).toBe(false);
			});

			it(`should return false when value is NaN`, () => {
				expect(canConvert(MOCK_FROM, MOCK_TO, NaN)).toBe(false);
			});

			it(`should return false when value exceeds max safe int`, () => {
				expect(canConvert(MOCK_FROM, MOCK_TO, Number.MAX_SAFE_INTEGER + 111)).toBe(false);
			});

			it(`should return false when value is smaller than min safe int`, () => {
				expect(canConvert(MOCK_FROM, MOCK_TO, Number.MIN_SAFE_INTEGER - 100)).toBe(false);
			});

			it(`should return false when value is not finite`, () => {
				expect(canConvert(MOCK_FROM, MOCK_TO, Number.POSITIVE_INFINITY)).toBe(false);
				expect(canConvert(MOCK_FROM, MOCK_TO, Number.NEGATIVE_INFINITY)).toBe(false);
			});
		});
	});

	describe('Bad Input', () => {
		it('should return null when input value is undefined', () => {
			expect(timeConvert('s', 'm', undefined as any)).toBeNull();
		});

		it('should return null when input value is null', () => {
			expect(timeConvert('s', 'm', null as any)).toBeNull();
		});

		it('should return null when input value is a truthy string', () => {
			expect(timeConvert('s', 'm', 'aaaaaa' as any)).toBeNull();
		});

		it('should return null when input value is an empty string', () => {
			expect(timeConvert('s', 'm', '' as any)).toBeNull();
		});

		it('should return null when to is not a valid timeKey', () => {
			expect(timeConvert('s', 'mmmmmm' as any, 100)).toBeNull();
		});

		it('should return null when from is not a valid timeKey', () => {
			expect(timeConvert('aaaaaaaa' as any, 'm', 100)).toBeNull();
		});

		it('should return null when to and from are both invalid timeKeys', () => {
			expect(timeConvert('ssssss' as any, 'mmmmmm' as any, 100)).toBeNull();
		});

		it(`should return null when conversion result is NaN`, () => {
			expect(timeConvert('s', 's', Number.POSITIVE_INFINITY)).toBeNull();
		});

		it(`should return null when conversion result is too big`, () => {
			expect(timeConvert('y', 'ms', Number.MAX_SAFE_INTEGER)).toBeNull();
		});

		it(`should return null when conversion result is too small`, () => {
			expect(timeConvert('y', 'ms', Number.MIN_SAFE_INTEGER - 100)).toBeNull();
		});
	});

	describe('Unit Conversions', () => {
		it(`should return 0 when value is zero and both units are the same`, () => {
			expect(timeConvert('s', 's', 0)).toBe(0);
		});

		it(`should return 0 when value is zero and units are different`, () => {
			expect(timeConvert('s', 'h', 0)).toBe(0);
		});

		it(`should return null when converted value is too big to be converted accurately`, () => {
			expect(timeConvert('d', 'ms', 99999999999999999999999)).toBeNull();
		});

		it(`should return null when output value is not finite`, () => {
			expect(timeConvert('μs', 'y', Number.POSITIVE_INFINITY)).toBeNull();
		});

		let sectionId = 0;
		let testId = 0;
		for (const section of CONVERT_TESTS) {
			describe(`${section.name} (id:${sectionId})`, () => {
				for (const test of section.tests) {
					const fromAmtLabel = unitsAmtLabel(test.value);
					const toAmtLabel = unitsAmtLabel(test.result);
					const fromLabel = timeUnitLabels[test.from as TimeUnit];
					const toLabel = timeUnitLabels[test.to as TimeUnit];

					it(`should convert ${fromLabel.full.plural} to ${toLabel.full.plural}: ${test.value}${test.from} (${fromAmtLabel}) -> ${test.result}${test.to} (${toAmtLabel}) [testid:${testId}]`, () => {
						expect(timeConvert(test.from as TimeUnit, test.to as TimeUnit, test.value)).toBe(
							test.result
						);
					});

					testId++;
				}
			});

			sectionId++;
		}
	});
});
