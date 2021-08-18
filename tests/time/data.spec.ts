import {Time} from '../../src/time';
import {TimeData} from '../../src/time/data';
import {timeMake} from '../../src/time/make';
import {timeNow} from '../../src/time/now';
import {timeUnitKeys} from '../_data/units';

describe('TimeData', () => {
	let instance: TimeData;
	let time: Time;

	beforeAll(() => {
		instance = new TimeData('s', 0);
		time = timeMake('s', 0);
	});

	beforeEach(() => {
		instance.value(0);
	});

	describe('Constructor', () => {
		for (const key of timeUnitKeys) {
			it(`should create instance with unit '${key}' when units arg is '${key}'`, () => {
				const custom = new TimeData(key, 1);
				expect(custom.units()).toBe(key);
			});
		}
	});

	describe('Implementation', () => {
		describe('timeUntilTime', () => {
			it(`should return 0 when target time value is 0`, () => {
				const time = timeMake('s', 0);
				const result = instance.timeUntilTime(time);
				expect(result).not.toBeNull();
				expect(result!()).toBe(0);
			});
		});

		describe('timeUntilNumber', () => {
			it(`should return null when target is undefined`, () => {
				expect(instance.timeUntilNumber(undefined as any)).toBeNull();
			});

			it(`should return null when target is null`, () => {
				expect(instance.timeUntilNumber(null as any)).toBeNull();
			});

			it(`should return null when target is a truthy non-number`, () => {
				expect(instance.timeUntilNumber('aaaa' as any)).toBeNull();
			});

			it(`should return time with value 0 when target time is 0`, () => {
				const result = instance.timeUntilNumber(0);
				expect(result!.units()).toBe('s');
				expect(result!()).toBe(0);
			});

			it(`should return time with value of 0 for converted units`, () => {
				const result = instance.timeUntilNumber(0);
				expect(result!.units()).toBe('s');
				expect(result).not.toBeNull();

				expect(result!()).toBe(0);
				expect(result!.toDays()).toBe(0);
				expect(result!.toHours()).toBe(0);
				expect(result!.toWeeks()).toBe(0);
				expect(result!.toYears()).toBe(0);
				expect(result!.toMicroseconds()).toBe(0);
				expect(result!.toMilliseconds()).toBe(0);
				expect(result!.toMinutes()).toBe(0);
				expect(result!.toMonths()).toBe(0);
				expect(result!.toSeconds()).toBe(0);
			});

			it(`should return time with number of seconds until target time`, () => {
				const now = timeNow();
				//const now = Math.floor(Date.now() / 1000);
				const offset = 10000;
				instance.value(now());
				const future = now() + offset;
				const result = instance.timeUntilNumber(future);
				expect(result).not.toBeNull();
				expect(result!.units()).toBe('s');
				expect(result!()).toBe(offset);
			});

			it(`should return converted days & hours until target time`, () => {
				const now = timeNow();
				const offset = 86400;

				instance.value(now());
				const future = now() + offset;
				const result = instance.timeUntilNumber(future);
				expect(result).not.toBeNull();
				expect(result!.toDays()).toBe(1);
				expect(result!.toHours()).toBe(24);
			});
		});

		describe('timeSinceNumber', () => {
			it(`should return null when target is undefined`, () => {
				expect(instance.timeSinceNumber(undefined as any)).toBeNull();
			});

			it(`should return null when target is null`, () => {
				expect(instance.timeSinceNumber(null as any)).toBeNull();
			});

			it(`should return 0 when target is 0`, () => {
				const result = instance.timeSinceNumber(0);
				expect(result).not.toBeNull();
				expect(result!()).toBe(0);
			});

			it(`should return seconds since target time`, () => {
				const curr = Math.floor(Date.now() / 1000);
				const offset = 330100;
				const target = curr - offset;
				instance.value(curr);
				const result = instance.timeSinceNumber(target);
				expect(result).not.toBeNull();
				expect(result!()).toBe(offset);
			});
		});

		describe('addNumber', () => {
			it(`should add positive number when current value is 0`, () => {
				instance.value(0);
				instance.addNumber(time, 333);
				expect(instance.value()).toBe(333);
			});

			it(`should add negative number when current value is 0`, () => {
				instance.value(0);
				instance.addNumber(time, -212);
				expect(instance.value()).toBe(-212);
			});

			it(`should add positive number when current value is negative`, () => {
				instance.value(-30);
				instance.addNumber(time, 100);
				expect(instance.value()).toBe(70);
			});

			it(`should add negative number when current value is negative`, () => {
				instance.value(-100);
				instance.addNumber(time, -100);
				expect(instance.value()).toBe(-200);
			});

			it(`should add positive number when current value is positive`, () => {
				instance.value(55);
				instance.addNumber(time, 30);
				expect(instance.value()).toBe(85);
			});
		});

		describe('subNumber', () => {
			it(`should return the caller time argument when input is not a number`, () => {
				expect(instance.subNumber(time, 'aaaa' as any)).toBe(time);
			});

			it(`should return the caller time argument when input is a number`, () => {
				expect(instance.subNumber(time, 1)).toBe(time);
			});

			it(`should subtract input from instance's value`, () => {
				const value = 1081;
				instance.value(value);
				instance.subNumber(time, 33);
				const result = value - 33;
				expect(instance.value()).toBe(result);
			});

			it(`should not change instance's value when called with 0`, () => {
				const value = 3131;
				instance.value(value);
				instance.subNumber(time, 0);
				expect(instance.value()).toBe(value);
			});

			it(`should add negative value`, () => {
				const value = -50;
				instance.value(0);
				instance.subNumber(time, value);
				expect(instance.value()).toBe(50);
			});
		});

		describe('reset', () => {
			it(`should return time caller`, () => {
				expect(instance.reset(time)).toBe(time);
			});

			it(`should reset value to 0`, () => {
				instance.value(333);
				expect(instance.value()).toBe(333);
				instance.reset(time);
				expect(instance.value()).toBe(0);
			});

			it(`should reset units to starting time unit`, () => {
				const custom = new TimeData('ms', 1);
				custom.units('w');
				expect(custom.units()).toBe('w');
				custom.reset(time);
				expect(custom.units()).toBe('ms');
			});
		});
	});
});
