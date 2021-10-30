import {Defaults} from '../../src/defaults';
import {Log} from '@toreda/log';
import {Time} from '../../src/time';
import {TimeData} from '../../src/time/data';
import {timeMake} from '../../src/time/make';
import {timeNow} from '../../src/time/now';
import {timeUnitKeys} from '../_data/units';
import {typeMatch} from '@toreda/strong-types';

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

		it(`should create a new log instance when log arg is undefined`, () => {
			const custom = new TimeData('s', 0, undefined);
			expect(typeMatch(custom.log, Log)).toBe(true);
		});

		it(`should create a new log instance when log arg is null`, () => {
			const custom = new TimeData('s', 0, null);
			expect(typeMatch(custom.log, Log)).toBe(true);
		});

		it(`should create a new log instance when log arg is truthy, but not a log instance`, () => {
			const custom = new TimeData('s', 0, time as any);
			expect(typeMatch(custom.log, Log)).toBe(true);
		});
	});

	describe('Implementation', () => {
		describe('getUnitValue', () => {
			it(`should return null when input is undefined`, () => {
				expect(instance.getUnitValue('s', undefined)).toBeNull();
			});

			it(`should return null when input is null`, () => {
				expect(instance.getUnitValue('s', null)).toBeNull();
			});

			it(`should return null when input is undefined`, () => {
				expect(instance.getUnitValue('s', undefined)).toBeNull();
			});
		});

		describe('Invert', () => {
			it(`should change 1 to -1 when posOnly flag is not set`, () => {
				instance.set(time, 1);
				expect(instance.get()).toBe(1);
				instance.invert(time);
				expect(instance.get()).toBe(-1);
			});

			it(`should change -1 to 1 when posOnly flag is not set`, () => {
				instance.set(time, -1);
				expect(instance.get()).toBe(-1);
				instance.invert(time);
				expect(instance.get()).toBe(1);
			});

			it(`should change -1 to 1 when posOnly flag is false`, () => {
				instance.set(time, -1);
				expect(instance.get()).toBe(-1);
				instance.invert(time, false);
				expect(instance.get()).toBe(1);
			});

			it(`should change 1 to -1 when posOnly flag is false`, () => {
				instance.set(time, 1);
				expect(instance.get()).toBe(1);
				instance.invert(time, false);
				expect(instance.get()).toBe(-1);
			});

			it(`should change 1 to -1 when posOnly flag is true`, () => {
				instance.set(time, 1);
				expect(instance.get()).toBe(1);
				instance.invert(time, true);
				expect(instance.get()).toBe(-1);
			});

			it(`should not change -1 to 1 when posOnly flag is true`, () => {
				instance.set(time, -1);
				expect(instance.get()).toBe(-1);
				instance.invert(time, true);
				expect(instance.get()).toBe(-1);
			});
		});
		describe('set', () => {
			it(`should not change value or time units when input is null`, () => {
				const units = instance.units();
				const value = 11974;
				instance.set(time, value);
				instance.set(time, null);
				expect(instance.get()).toBe(value);
				expect(instance.units()).toBe(units);
			});

			it(`should not change value or time units when input is undefined`, () => {
				const units = instance.units();
				const value = 11974;
				instance.set(time, value);
				instance.set(time, undefined);
				expect(instance.get()).toBe(value);
				expect(instance.units()).toBe(units);
			});

			it(`should be able to set value to 0`, () => {
				const value = 1497141;
				instance.set(time, 1497141);
				expect(instance.get()).toBe(value);
				instance.set(time, 0);
				expect(instance.get()).toBe(0);
			});

			it(`should not change value when input is an invalid Time object`, () => {
				const o = {
					until: jest.fn(),
					since: jest.fn(),
					units: 's'
				};

				const value = 7417691;
				instance.set(time, value);
				expect(instance.get()).toBe(value);
				instance.set(time, o as any);
				expect(instance.get()).toBe(value);
			});
		});

		describe('timeUntilTime', () => {
			it(`should return 0 when target time value is 0`, () => {
				const time = timeMake('s', 0);
				const result = instance.timeUntilTime(time);
				expect(result).not.toBeNull();
				expect(result!()).toBe(0);
			});

			it(`should return null when time arg is undefined`, () => {
				expect(instance.timeUntilTime(undefined)).toBeNull();
			});

			it(`should return null when time arg is null`, () => {
				expect(instance.timeUntilTime(null)).toBeNull();
			});

			it(`should return null when time arg is not a valid time object`, () => {
				const sampleData = {
					timeSinceNumber: jest.fn(),
					timeUntilTime: jest.fn(),
					timeSinceTime: jest.fn()
				};
				expect(instance.timeUntilTime(sampleData as any)).toBeNull();
			});

			it(`should return null when time conversion fails`, () => {
				const input = timeMake('d', Number.MAX_SAFE_INTEGER);
				const custom = new TimeData('ms', Number.MAX_SAFE_INTEGER);
				expect(custom.timeUntilTime(input)).toBeNull();
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
				const curr = Math.floor(Date.now() / Defaults.Time.MsPerSec);
				const offset = 330100;
				const target = curr - offset;
				instance.set(time, curr);
				const result = instance.timeSinceNumber(target);
				expect(result).not.toBeNull();
				expect(result!()).toBe(offset);
			});
		});

		describe('timeSinceTime', () => {
			it(`should return null when target time arg is null`, () => {
				expect(instance.timeSinceTime(null as any)).toBeNull();
			});

			it(`should return null when target time arg is undefined`, () => {
				expect(instance.timeSinceTime(undefined as any)).toBeNull();
			});

			it(`should return 0 when target time value is 0`, () => {
				instance.set(time, 0);
				const target = timeMake('s', 0);
				const result = instance.timeSinceTime(target);

				expect(result!()).toBe(0);
			});

			it(`should return null when target time arg is not a Time object`, () => {
				const notTime = {
					timeUntilNumber: jest.fn(),
					timeUntilTime: jest.fn()
				};

				expect(instance.timeSinceTime(notTime as any)).toBeNull();
			});

			it(`should return null when time conversion fails`, () => {
				const data = new TimeData('ms', Number.MAX_SAFE_INTEGER);
				const target = timeMake('y', Number.MAX_SAFE_INTEGER);

				expect(data.timeSinceTime(target)).toBeNull();
			});

			it(`should return time since target time in instance's native time units`, () => {
				const target = timeMake('s', 3600);
				const data = new TimeData('h', 10);
				const result = data.timeSinceTime(target);

				expect(result!()).toBe(9);
			});
		});

		describe('addUnit', () => {
			it(`should not change value when value is null`, () => {
				const value = 77911;
				instance.set(time, value);
				expect(instance.get()).toBe(value);

				instance.addUnit(time, null as any);
				expect(instance.get()).toBe(value);
			});

			it(`should not change value when unit conversion fails`, () => {
				const target = timeMake('y', Number.MAX_SAFE_INTEGER);

				const value = 871901;
				instance.set(time, value);
				expect(instance.get()).toBe(value);
				instance.addUnit(time, target.units(), target());
			});
		});

		describe('addNumber', () => {
			it(`should not change current value when input is null`, () => {
				const input = 971971;
				instance.set(time, input);
				expect(instance.get()).toBe(input);
				instance.addNumber(time, null);
				expect(instance.get()).toBe(input);
			});

			it(`should not change current value when input is undefined`, () => {
				const input = 668198761;
				instance.set(time, input);
				expect(instance.get()).toBe(input);
				instance.addNumber(time, undefined);
				expect(instance.get()).toBe(input);
			});

			it(`should not change current value when input is a truthy non-number`, () => {
				const input = 61818999;
				instance.set(time, input);
				expect(instance.get()).toBe(input);
				instance.addNumber(time, 'aaaaaa' as any);
				expect(instance.get()).toBe(input);
			});

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

		describe('subUnit', () => {
			it(`should not change value when units arg is undefined`, () => {
				const value = 6766191;
				instance.set(time, value);
				expect(instance.get()).toBe(value);

				instance.subUnit(time, undefined as any, value);
				expect(instance.get()).toBe(value);
			});

			it(`should not change value when units arg is null`, () => {
				const value = 6766191;
				instance.set(time, value);
				expect(instance.get()).toBe(value);

				instance.subUnit(time, null as any, value);
				expect(instance.get()).toBe(value);
			});

			it(`should not change value when value is undefined`, () => {
				const value = 444111;
				instance.set(time, value);
				expect(instance.get()).toBe(value);

				instance.subUnit(time, 's', undefined);
				expect(instance.get()).toBe(value);
			});

			it(`should not change value when value is null`, () => {
				const value = 3311441;
				instance.set(time, value);
				expect(instance.get()).toBe(value);

				instance.subUnit(time, 's', null);
				expect(instance.get()).toBe(value);
			});

			it(`should not change when value unit conversion fails`, () => {
				const value = 8819818161;
				instance.set(time, value);
				expect(instance.get()).toBe(value);

				instance.subUnit(time, 'd', Number.MAX_SAFE_INTEGER);
				expect(instance.get()).toBe(value);
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
