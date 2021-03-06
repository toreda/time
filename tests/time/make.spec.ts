import {Defaults} from '../../src/defaults';
import MockDate from 'mockdate';
import type {Time} from '../../src/time';
import type {TimeUnit} from '../../src/time/unit';
import {timeConvert} from '../../src/time/convert';
import {timeMake} from '../../src/time/make';
import {timeMethods} from '../../src/time/methods';
import {timeUnitLabels} from '../../src/time/unit/labels';

const TIME_UNITS: TimeUnit[] = ['s', 'm', 'mo', 'd', 'y', 'w', 'ms', 'μs'];

const AS_METHODS = [
	{name: 'asMilliseconds', unit: 'ms'},
	{name: 'asMicroseconds', unit: 'μs'},
	{name: 'asSeconds', unit: 's'},
	{name: 'asMinutes', unit: 'm'},
	{name: 'asHours', unit: 'h'},
	{name: 'asDays', unit: 'd'},
	{name: 'asMonths', unit: 'mo'},
	{name: 'asYears', unit: 'y'},
	{name: 'asWeeks', unit: 'w'}
];

const TO_METHODS = [
	{name: 'toMilliseconds', unit: 'ms'},
	{name: 'toMicroseconds', unit: 'μs'},
	{name: 'toSeconds', unit: 's'},
	{name: 'toMinutes', unit: 'm'},
	{name: 'toHours', unit: 'h'},
	{name: 'toDays', unit: 'd'},
	{name: 'toMonths', unit: 'mo'},
	{name: 'toYears', unit: 'y'},
	{name: 'toWeeks', unit: 'w'}
];

const MATH_METHODS: {name: string; unit: TimeUnit; label: string; op: 'add' | 'sub'}[] = [
	{name: 'addDays', unit: 'd', label: 'days', op: 'add'},
	{name: 'addHours', unit: 'h', label: 'hours', op: 'add'},
	{name: 'addMicroseconds', unit: 'μs', label: 'microseconds', op: 'add'},
	{name: 'addMilliseconds', unit: 'ms', label: 'milliseconds', op: 'add'},
	{name: 'addMinutes', unit: 'm', label: 'minutes', op: 'add'},
	{name: 'addMonths', unit: 'mo', label: 'months', op: 'add'},
	{name: 'addSeconds', unit: 's', label: 'seconds', op: 'add'},
	{name: 'addWeeks', unit: 'w', label: 'weeks', op: 'add'},
	{name: 'addYears', unit: 'y', label: 'years', op: 'add'},
	{name: 'subDays', unit: 'd', label: 'days', op: 'sub'},
	{name: 'subHours', unit: 'h', label: 'hours', op: 'sub'},
	{name: 'subMicroseconds', unit: 'μs', label: 'microseconds', op: 'sub'},
	{name: 'subMilliseconds', unit: 'ms', label: 'milliseconds', op: 'sub'},
	{name: 'subMinutes', unit: 'm', label: 'minutes', op: 'sub'},
	{name: 'subMonths', unit: 'mo', label: 'months', op: 'sub'},
	{name: 'subSeconds', unit: 's', label: 'seconds', op: 'sub'},
	{name: 'subWeeks', unit: 'w', label: 'weeks', op: 'sub'},
	{name: 'subYears', unit: 'y', label: 'years', op: 'sub'}
];

const TIME_INITIAL_VALUE = 11;
describe('timeMake', () => {
	let instance: Time;
	beforeAll(() => {
		instance = timeMake('s', TIME_INITIAL_VALUE);
	});

	it(`should set value when calling instance as a function with a positive non-zero value`, () => {
		const result = 4181;
		instance(0);
		expect(instance()).toBe(0);
		instance(result);
		expect(instance()).toBe(result);
	});

	it(`should set value to zero when calling instance as a function with zero`, () => {
		const result = 4181;
		instance(result);
		expect(instance()).toBe(result);
		instance(0);
		expect(instance()).toBe(0);
	});

	it(`should not change value when calling instance as afunction without an argument`, () => {
		const result = 887670;
		instance(result);
		instance();
		expect(instance()).toBe(result);
	});

	it(`should pass initial value to time object when initial value is 0`, () => {
		const time = timeMake('s', 0);
		expect(time()).toBe(0);
	});

	it(`should pass initial value to time object when initial value is 1`, () => {
		const time = timeMake('s', 1);
		expect(time()).toBe(1);
	});

	it(`should pass initial value to time object when initial value is an arbitrary positive value`, () => {
		const time = timeMake('s', 6816814);
		expect(time()).toBe(6816814);
	});

	describe('Time interface', () => {
		describe('Methods', () => {
			for (const timeMethod of timeMethods) {
				describe(timeMethod, () => {
					it(`should return instance implementing method '${timeMethod}'`, () => {
						expect(instance[timeMethod]).not.toBeUndefined();
						expect(typeof instance[timeMethod]).toBe('function');
					});
				});
			}
		});

		describe('reset', () => {
			it(`should reset value back to initial value '${TIME_INITIAL_VALUE}'`, () => {
				instance(999);
				expect(instance()).toBe(999);
				instance.reset();
				expect(instance()).toBe(TIME_INITIAL_VALUE);
			});

			it(`should return the Time caller`, () => {
				expect(instance.reset()).toEqual(instance);
			});
		});

		describe('add', () => {
			it(`should add positive number value arg when current value is 0`, () => {
				instance(0);
				expect(instance()).toBe(0);

				const value = 319;
				instance.add(value);
				expect(instance()).toBe(value);
			});

			it(`should not change value when time arg is only a partially valid Time object`, () => {
				const o = {
					reset: jest.fn(),
					set: jest.fn(),
					setNow: jest.fn()
				};

				const value = 81333111;
				instance(value);
				expect(instance()).toBe(value);
				instance.add(o as any);
				expect(instance()).toBe(value);
			});

			it(`should add positive time object arg when current value is 0`, () => {
				const current = 101187;
				const value = 0;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.add(time);
				expect(instance()).toBe(current + value);
			});

			it(`should add negative number value arg when current value is 0`, () => {
				instance(0);
				expect(instance()).toBe(0);

				const value = -9912;
				instance.add(value);
				expect(instance()).toBe(value);
			});

			it(`should add negative time object arg when current value is 0`, () => {
				const current = -3233;
				const value = 0;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.add(time);
				expect(instance()).toBe(current + value);
			});

			it(`should add negative number value arg when current value is positive`, () => {
				const current = 717;
				instance(current);
				expect(instance()).toBe(current);

				const value = -319;
				const result = current + value;
				instance.add(value);
				expect(instance()).toBe(result);
			});

			it(`should add negative time object arg when current value is positive`, () => {
				const current = -96621;
				const value = 11199;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.add(time);
				expect(instance()).toBe(current + value);
			});

			it(`should add negative number value arg when current value is negative`, () => {
				const current = -20;
				instance(current);
				expect(instance()).toBe(current);

				const value = -20;

				const result = current + value;
				instance.add(value);
				expect(instance()).toBe(result);
			});

			it(`should add negative time object arg when current value is negative`, () => {
				const current = -81812;
				const value = -91091;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.add(time);
				expect(instance()).toBe(current + value);
			});

			it(`should add positive number value arg when current value is positive`, () => {
				const current = 99912;
				instance(current);
				expect(instance()).toBe(current);

				const value = 77778991;
				const result = current + value;
				instance.add(value);
				expect(instance()).toBe(result);
			});

			it(`should add positive time object arg when current value is positive`, () => {
				const current = 101010;
				const value = 9101;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.add(time);
				expect(instance()).toBe(current + value);
			});

			it(`should add positive number value arg when current value is negative`, () => {
				const current = -6617;
				instance(current);
				expect(instance()).toBe(current);

				const value = 333891;

				const result = current + value;
				instance.add(value);
				expect(instance()).toBe(result);
			});

			it(`should add positive time object arg when current value is negative`, () => {
				const current = -3232;
				const value = 3010;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.add(time);
				expect(instance()).toBe(current + value);
			});

			it(`should return caller when value is a Time object`, () => {
				const value = 4414;
				const time = timeMake('s', value);
				expect(instance.add(time)).toEqual(instance);
			});

			it(`should return caller when value is a number`, () => {
				const value = 881981;
				expect(instance.add(value)).toEqual(instance);
			});
		});

		describe('sub', () => {
			it(`should sub positive number value arg when current value is 0`, () => {
				instance(0);
				expect(instance()).toBe(0);

				const value = 319;
				instance.sub(value);
				expect(instance()).toBe(value * -1);
			});

			it(`should sub positive time object arg when current value is 0`, () => {
				const current = 101187;
				const value = 0;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.sub(time);
				expect(instance()).toBe(current - value);
			});

			it(`should sub negative number value arg when current value is 0`, () => {
				instance(0);
				expect(instance()).toBe(0);

				const value = -9912;
				instance.sub(value);
				expect(instance()).toBe(value * -1);
			});

			it(`should sub negative time object arg when current value is 0`, () => {
				const current = -3233;
				const value = 0;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.sub(time);
				expect(instance()).toBe(current - value);
			});

			it(`should sub negative number value arg when current value is positive`, () => {
				const current = 717;
				instance(current);
				expect(instance()).toBe(current);

				const value = -319;
				const result = current - value;
				instance.sub(value);
				expect(instance()).toBe(result);
			});

			it(`should sub negative time object arg when current value is positive`, () => {
				const current = -96621;
				const value = 11199;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.sub(time);
				expect(instance()).toBe(current - value);
			});

			it(`should sub negative number value arg when current value is negative`, () => {
				const current = -20;
				instance(current);
				expect(instance()).toBe(current);

				const value = -20;

				const result = current - value;
				instance.sub(value);
				expect(instance()).toBe(result);
			});

			it(`should sub negative time object arg when current value is negative`, () => {
				const current = -81812;
				const value = -91091;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.sub(time);
				expect(instance()).toBe(current - value);
			});

			it(`should sub positive number value arg when current value is positive`, () => {
				const current = 99912;
				instance(current);
				expect(instance()).toBe(current);

				const value = 77778991;
				const result = current - value;
				instance.sub(value);
				expect(instance()).toBe(result);
			});

			it(`should sub positive time object arg when current value is positive`, () => {
				const current = 101010;
				const value = 9101;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.sub(time);
				expect(instance()).toBe(current - value);
			});

			it(`should sub positive number value arg when current value is negative`, () => {
				const current = -6617;
				instance(current);
				expect(instance()).toBe(current);

				const value = 333891;

				const result = current - value;
				instance.sub(value);
				expect(instance()).toBe(result);
			});

			it(`should sub positive time object arg when current value is negative`, () => {
				const current = -3232;
				const value = 3010;
				const time = timeMake('s', value);
				instance(current);
				expect(instance()).toBe(current);

				instance.sub(time);
				expect(instance()).toBe(current - value);
			});

			it(`should not change value when time arg is only a partially valid Time object`, () => {
				const o = {
					reset: jest.fn(),
					set: jest.fn(),
					setNow: jest.fn()
				};

				const value = 1121817;
				instance(value);
				expect(instance()).toBe(value);
				instance.sub(o as any);
				expect(instance()).toBe(value);
			});
		});

		describe('set', () => {
			it(`should set instance time value when input arg is a number`, () => {
				const input = 8614861;
				instance.set(input);
				expect(instance()).toBe(input);
			});

			it(`should set instance time value when input arg is a negative number`, () => {
				const input = -97141;
				instance(140108);
				instance.set(input);
				expect(instance()).toBe(input);
			});

			it(`should return the time object`, () => {
				const custom = timeMake('s', 25);
				expect(custom.set(11111)).toEqual(custom);
			});
		});

		describe('until', () => {
			it(`should return time object with value 0 when time value is 0`, () => {
				const result = instance.until(0);
				expect(result!()).toBe(0);
			});

			it(`should return time object with value 0 when time is a Time object with value 0`, () => {
				const time = timeMake('s', 0);
				const result = instance.until(time);
				expect(result!()).toBe(0);
			});
		});

		describe('since', () => {
			it(`should return time object with value 0 when time value is 0`, () => {
				const result = instance.since(0);
				expect(result!()).toBe(0);
			});

			it(`should return time object with value 0 when time is a Time object with value 0`, () => {
				const time = timeMake('s', 0);
				const result = instance.since(time);
				expect(result!()).toBe(0);
			});
		});

		describe('elapsed', () => {
			let sinceSpy: jest.SpyInstance;

			beforeAll(() => {
				sinceSpy = jest.spyOn(instance, 'since');
			});

			beforeEach(() => {
				sinceSpy.mockClear();
			});

			afterAll(() => {
				sinceSpy.mockRestore();
			});

			it(`should return true when target time is a number literal with value 0`, () => {
				instance.setNow();
				expect(instance.elapsed(0)).toBe(true);
			});

			it(`should return true when Time object elapsed time exceeds time since start`, () => {
				const since = timeMake('s', 20);
				sinceSpy.mockReturnValueOnce(since);

				expect(instance.elapsed(timeMake('s', 5))).toBe(true);
			});

			it(`should return true when number value of elapsed time exceeds time since start`, () => {
				const since = timeMake('s', 20);
				sinceSpy.mockReturnValueOnce(since);

				expect(instance.elapsed(5)).toBe(true);
			});

			it(`should return false when time since returns null`, () => {
				sinceSpy.mockReturnValueOnce(null);

				expect(instance.elapsed(5)).toBe(false);
			});

			it(`should return true when time since start is exactly equal to elapsed target`, () => {
				const since = timeMake('s', 5);
				sinceSpy.mockReturnValueOnce(since);

				expect(instance.elapsed(5)).toBe(true);
			});

			it(`should return false when target time is now and time limit is several seconds away`, () => {
				const time = Math.floor(Date.now() / 1000);
				sinceSpy.mockReturnValue(timeMake('s', 0));

				MockDate.set(time);
				instance(time);

				expect(instance.elapsed(5)).toBe(false);
			});
		});

		describe('setNow', () => {
			it(`should set value to the current time in seconds`, () => {
				const custom = timeMake('s', 0);
				expect(custom()).toBe(0);
				MockDate.set(`2005-08-08 12:13:14`);
				const now = Math.floor(new Date().getTime() / Defaults.Time.MsPerSec);
				custom.setNow();
				expect(custom()).toBe(now);
				MockDate.reset();
			});

			it(`should set value to the current time in time object unit type`, () => {
				const custom = timeMake('h', 0);
				expect(custom()).toBe(0);
				MockDate.set(`2006-08-08 12:13:14`);
				const now = Math.floor(Date.now() / Defaults.Time.MsPerSec) / 3600;

				const nowHours = Number.parseFloat(now.toFixed(2));
				custom.setNow();
				expect(custom()).toBe(nowHours);
				MockDate.reset();
			});

			it(`should return the caller`, () => {
				const custom = timeMake('s', 25);
				expect(custom.setNow()).toEqual(custom);
			});
		});

		describe('Unit Conversions', () => {
			describe('As Methods', () => {
				for (const method of AS_METHODS) {
					describe(method.name, () => {
						it(`should return 0 when value is 0`, () => {
							instance(0);
							const units = instance.units();
							expect(instance()).toBe(0);
							expect(instance[method.name]()).toBe(0);
							expect(instance.units()).toBe(units);
						});

						it(`should copy and return value converted to '${method.unit}' without changing original time value`, () => {
							const value = 5000;
							instance(value);
							expect(instance()).toBe(value);
							const result = timeConvert(instance.units(), method.unit as TimeUnit, instance());
							expect(instance[method.name]()).toBe(result);
							expect(instance()).toBe(value);
						});
					});
				}
			});
			describe('To Methods', () => {
				for (const method of TO_METHODS) {
					describe(method.name, () => {
						it(`should change unit type to '${method.unit}`, () => {
							const custom = timeMake('s', 100);
							expect(custom.units()).toBe('s');
							custom[method.name]();
							expect(custom.units()).toBe(method.unit);
						});

						it(`should convert time value from 's' to '${method.unit}'`, () => {
							const initial = 500000;
							const custom = timeMake('s', initial);
							custom[method.name]();
							const result = timeConvert('s', method.unit as TimeUnit, initial);
							expect(custom()).toBe(result);
						});

						it(`should unit type but not value when time value is 0`, () => {
							const custom = timeMake('s', 0);
							expect(custom()).toBe(0);
							custom[method.name]();
							expect(custom()).toBe(0);
							expect(custom.units()).toBe(method.unit);
						});
					});
				}
			});
		});

		describe('Math Methods', () => {
			for (const method of MATH_METHODS) {
				describe(method.label, () => {
					it(`should not change instance time when value arg is null`, () => {
						const value = 21;
						instance(value);
						expect(instance()).toBe(value);
						instance[method.name](null);

						expect(instance()).toBe(value);
					});

					it(`should not change instance time when value arg is undefined`, () => {
						const value = 33;
						instance(value);
						expect(instance()).toBe(value);
						instance[method.name]();

						expect(instance()).toBe(value);
					});

					it(`should not change instance time when value arg is 0`, () => {
						const value = 9101;
						instance(value);
						expect(instance()).toBe(value);
						instance[method.name](0);

						expect(instance()).toBe(value);
					});

					for (const timeUnit of TIME_UNITS) {
						const timeUnitLabel = timeUnitLabels[timeUnit];
						const methodUnitLabel = timeUnitLabels[method.unit];

						if (!timeUnitLabel) {
							throw new Error(`timeUnits label not found for unit '${timeUnit}.`);
						}

						it(`${method.name} - should ${method.op} ${timeUnitLabel.full.plural} from time object using ${methodUnitLabel.full.plural}`, () => {
							const initial = 10;
							const opValue = 100;
							const decimals = 10;
							const custom = timeMake(timeUnit, initial);
							expect(custom()).toBe(initial);
							expect(custom.units()).toBe(timeUnit);

							let expectedResult: number;
							const converted = timeConvert(method.unit, timeUnit, opValue, decimals);
							expect(converted).not.toBeNull();

							switch (method.op) {
								case 'add':
									expectedResult = initial + converted!;
									break;
								case 'sub':
									expectedResult = initial - converted!;
									break;
								default:
									throw new Error(
										`Unsupported method op '${method.op}' for ${method.name} in timeMake tests.`
									);
							}

							custom[method.name](opValue);

							const result = parseFloat(custom().toFixed(decimals));

							expect(result).toBeCloseTo(expectedResult, 2);
						});

						it(`${method.name} should return caller when value is > 0`, () => {
							expect(instance[method.name](1411)).toEqual(instance);
						});

						it(`${method.name} should return caller when value is 0`, () => {
							expect(instance[method.name](0)).toEqual(instance);
						});

						it(`${method.name} should return caller when value is < 0`, () => {
							expect(instance[method.name](-310)).toEqual(instance);
						});
					}
				});
			}
		});
	});
});
