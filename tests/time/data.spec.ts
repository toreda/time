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
		instance.set(time, 0);
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
				expect(result!.asDays()).toBe(0);
				expect(result!.asHours()).toBe(0);
				expect(result!.asWeeks()).toBe(0);
				expect(result!.asYears()).toBe(0);
				expect(result!.asMicroseconds()).toBe(0);
				expect(result!.asMilliseconds()).toBe(0);
				expect(result!.asMinutes()).toBe(0);
				expect(result!.asMonths()).toBe(0);
				expect(result!.asSeconds()).toBe(0);
			});

			it(`should return time with number of seconds until target time`, () => {
				const now = timeNow();
				//const now = Math.floor(Date.now() / 1000);
				const offset = 10000;
				instance.set(time, now());
				const future = now() + offset;
				const result = instance.timeUntilNumber(future);
				expect(result).not.toBeNull();
				expect(result!.units()).toBe('s');
				expect(result!()).toBe(offset);
			});

			it(`should return converted days & hours until target time`, () => {
				const now = timeNow();
				const offset = 86400;

				instance.set(time, now());
				const future = now() + offset;
				const result = instance.timeUntilNumber(future);
				expect(result).not.toBeNull();
				expect(result!.asDays()).toBe(1);
				expect(result!.asHours()).toBe(24);
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
				instance.set(time, curr);
				const result = instance.timeSinceNumber(target);
				expect(result).not.toBeNull();
				expect(result!()).toBe(offset);
			});
		});

		describe('addNumber', () => {
			it(`should add positive number when current value is 0`, () => {
				instance.set(time, 0);
				instance.addNumber(time, 333);
				expect(instance.get()).toBe(333);
			});

			it(`should add negative number when current value is 0`, () => {
				instance.set(time, 0);
				instance.addNumber(time, -212);
				expect(instance.get()).toBe(-212);
			});

			it(`should add positive number when current value is negative`, () => {
				instance.set(time, -30);
				instance.addNumber(time, 100);
				expect(instance.get()).toBe(70);
			});

			it(`should add negative number when current value is negative`, () => {
				instance.set(time, -100);
				instance.addNumber(time, -100);
				expect(instance.get()).toBe(-200);
			});

			it(`should add positive number when current value is positive`, () => {
				instance.set(time, 55);
				instance.addNumber(time, 30);
				expect(instance.get()).toBe(85);
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
				instance.set(time, value);
				instance.subNumber(time, 33);
				const result = value - 33;
				expect(instance.get()).toBe(result);
			});

			it(`should not change instance's value when called with 0`, () => {
				const value = 3131;
				instance.set(time, value);
				instance.subNumber(time, 0);
				expect(instance.get()).toBe(value);
			});

			it(`should add negative value`, () => {
				const value = -50;
				instance.set(time, 0);
				instance.subNumber(time, value);
				expect(instance.get()).toBe(50);
			});
		});

		describe('reset', () => {
			it(`should return time caller`, () => {
				expect(instance.reset(time)).toBe(time);
			});

			it(`should reset value to 0`, () => {
				instance.set(time, 333);
				expect(instance.get()).toBe(333);
				instance.reset(time);
				expect(instance.get()).toBe(0);
			});
		});
	});
});
