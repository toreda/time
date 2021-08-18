import {TimeConstants} from '../../src/time/constants';
import {TimeUnit} from '../../src/time/unit';
import {timeConvert} from '../../src/time/convert';
import {timeUnitLabels} from '../../src/time/unit/labels';

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
			{from: 'm', to: 'm', value: 338, result: 338},
			{from: 'm', to: 'h', value: TimeConstants.HOURS_TO_MINUTES * 10, result: 10},
			{from: 'm', to: 'h', value: TimeConstants.HOURS_TO_MINUTES, result: 1},
			{from: 'm', to: 'h', value: TimeConstants.HOURS_TO_MINUTES / 2, result: 0.5},
			{from: 'm', to: 'h', value: 23, result: 0.38},
			{from: 'm', to: 'd', value: TimeConstants.DAYS_TO_MINUTES, result: 1},
			{from: 'm', to: 'd', value: TimeConstants.DAYS_TO_MINUTES * 8, result: 8},
			{from: 'm', to: 'd', value: TimeConstants.DAYS_TO_MINUTES / 4, result: 0.25},
			{from: 'm', to: 'w', value: TimeConstants.WEEKS_TO_MINUTES, result: 1},
			{from: 'm', to: 'w', value: TimeConstants.WEEKS_TO_MINUTES * 3, result: 3},
			{from: 'm', to: 'w', value: TimeConstants.WEEKS_TO_MINUTES / 4, result: 0.25},
			{from: 'm', to: 'mo', value: TimeConstants.MONTHS_TO_MINUTES, result: 1},
			{from: 'm', to: 'mo', value: TimeConstants.MONTHS_TO_MINUTES * 2, result: 2},
			{from: 'm', to: 'mo', value: TimeConstants.MONTHS_TO_MINUTES / 4, result: 0.25}
		]
	},
	{
		name: 'hours',
		units: 'h',
		tests: [
			{from: 'h', to: 'm', value: 1, result: TimeConstants.HOURS_TO_MINUTES},
			{from: 'h', to: 'm', value: 0.5, result: TimeConstants.HOURS_TO_MINUTES / 2},
			{from: 'h', to: 'm', value: 4, result: TimeConstants.HOURS_TO_MINUTES * 4},
			{from: 'h', to: 'h', value: 100, result: 100},
			{from: 'h', to: 's', value: 1, result: TimeConstants.HOURS_TO_SECONDS},
			{from: 'h', to: 's', value: 2, result: TimeConstants.HOURS_TO_SECONDS * 2},
			{from: 'h', to: 's', value: 0.5, result: TimeConstants.HOURS_TO_SECONDS / 2},
			{from: 'h', to: 'd', value: TimeConstants.DAYS_TO_HOURS * 3, result: 3},
			{from: 'h', to: 'd', value: TimeConstants.DAYS_TO_HOURS / 2, result: 0.5},
			{from: 'h', to: 'd', value: TimeConstants.DAYS_TO_HOURS, result: 1},
			{from: 'h', to: 'w', value: TimeConstants.WEEKS_TO_HOURS * 0.33, result: 0.33},
			{from: 'h', to: 'w', value: TimeConstants.WEEKS_TO_HOURS * 7, result: 7},
			{from: 'h', to: 'w', value: TimeConstants.WEEKS_TO_HOURS, result: 1},
			{from: 'h', to: 'ms', value: 1 * 3, result: TimeConstants.HOURS_TO_MILLISECONDS * 3},
			{from: 'h', to: 'ms', value: 1, result: TimeConstants.HOURS_TO_MILLISECONDS},
			{from: 'h', to: 'ms', value: 0.5, result: TimeConstants.HOURS_TO_MILLISECONDS / 2},
			{from: 'h', to: 'μs', value: 1, result: TimeConstants.HOURS_TO_MICROSECONDS},
			{from: 'h', to: 'μs', value: 2, result: TimeConstants.HOURS_TO_MICROSECONDS * 2},
			{from: 'h', to: 'μs', value: 0.5, result: TimeConstants.HOURS_TO_MICROSECONDS / 2}
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
				result: 24
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
	}
];

describe('timeConvert', () => {
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
	});

	describe('Unit Conversions', () => {
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
