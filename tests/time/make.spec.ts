import MockDate from 'mockdate';
import {Time} from '../../src/time';
import {TimeConstants} from '../../src/time/constants';
import {TimeUnit} from '../../src/time/unit';
import {timeConvert} from '../../src/time/convert';
import {timeMake} from '../../src/time/make';
import {timeUnitLabels} from '../../src/time/unit/labels';
import {toSecondsFactor} from '../../src/time/conversion/factor';

const INTERFACE_METHODS = [
	{name: 'add', method: 'add'},
	{name: 'sub', method: 'sub'},
	{name: 'reset', method: 'reset'},
	{name: 'units', method: 'units'},
	{name: 'since', method: 'since'},
	{name: 'until', method: 'until'},
	{name: 'toMicroseconds', method: 'toMicroseconds'},
	{name: 'asSeconds', method: 'toSeconds'},
	{name: 'asMilliseconds', method: 'toMilliseconds'},
	{name: 'asMinutes', method: 'toMinutes'},
	{name: 'asHours', method: 'toHours'},
	{name: 'asDays', method: 'toDays'},
	{name: 'asWeeks', method: 'toWeeks'},
	{name: 'asMonths', method: 'toMonths'},
	{name: 'asYears', method: 'toYears'},
	{name: 'setNow', method: 'setNow'}
];

const TIME_UNITS: TimeUnit[] = ['s', 'm', 'mo', 'd', 'y', 'w', 'ms', 'μs'];

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

describe('timeMake', () => {
	let instance: Time;
	beforeAll(() => {
		instance = timeMake('s', 11);
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
			for (const method of INTERFACE_METHODS) {
				it(`should return instance which implements required interface method '${method.name}`, () => {
					expect(instance[method.method]).not.toBeUndefined();
					expect(typeof instance[method.method]).toBe('function');
				});
			}
		});

		describe('reset', () => {
			it(`should reset value back to initial value 0`, () => {
				instance(999);
				expect(instance()).toBe(999);
				instance.reset();
				expect(instance()).toBe(0);
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
		});

		describe('setNow', () => {
			it(`should set value to the current time in seconds`, () => {
				const custom = timeMake('s', 0);
				expect(custom()).toBe(0);
				MockDate.set(`2005-08-08 12:13:14`);
				const now = Math.floor(new Date().getTime() / 1000);
				custom.setNow();
				expect(custom()).toBe(now);
				MockDate.reset();
			});

			it(`should set value to the current time in time object unit type`, () => {
				const custom = timeMake('h', 0);
				expect(custom()).toBe(0);
				MockDate.set(`2006-08-08 12:13:14`);
				const now = Math.floor(new Date().getTime() / 1000) / 3600;

				const nowHours = Number.parseFloat(now.toFixed(2));
				custom.setNow();
				expect(custom()).toBe(nowHours);
				MockDate.reset();
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

						it(`should ${method.op} ${timeUnitLabel.full.plural} from time object using ${methodUnitLabel.full.plural}`, () => {
							const initial = 10;
							const opValue = 100;
							const custom = timeMake(method.unit, initial);
							expect(custom()).toBe(initial);
							expect(custom.units()).toBe(method.unit);

							let expectedResult: number;
							const converted = timeConvert(timeUnit, method.unit, opValue, 10);
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

							expect(custom()).toBe(expectedResult);
						});
					}
				});
			}
		});
	});
});
