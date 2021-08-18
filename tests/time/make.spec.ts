import {Time} from '../../src/time';
import {timeMake} from '../../src/time/make';

const INTERFACE_METHODS = [
	{name: 'add', method: 'add'},
	{name: 'sub', method: 'sub'},
	{name: 'reset', method: 'reset'},
	{name: 'units', method: 'units'},
	{name: 'since', method: 'since'},
	{name: 'until', method: 'until'},
	{name: 'toMicroseconds', method: 'toMicroseconds'},
	{name: 'toSeconds', method: 'toSeconds'},
	{name: 'toMilliseconds', method: 'toMilliseconds'},
	{name: 'toMinutes', method: 'toMinutes'},
	{name: 'toHours', method: 'toHours'},
	{name: 'toDays', method: 'toDays'},
	{name: 'toWeeks', method: 'toWeeks'},
	{name: 'toMonths', method: 'toMonths'},
	{name: 'toYears', method: 'toYears'},
	{name: 'setNow', method: 'setNow'}
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

		describe('add', () => {
			it(`should add positive number value arg when current value is 0`, () => {
				instance(0);
				expect(instance()).toBe(0);

				const value = 319;
				instance.add(value);
				expect(instance()).toBe(value);
			});

			it(`should add negative number value arg when current value is 0`, () => {
				instance(0);
				expect(instance()).toBe(0);

				const value = -9912;
				instance.add(value);
				expect(instance()).toBe(value);
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

			it(`should add negative number value arg when current value is negative`, () => {
				const current = -20;
				instance(current);
				expect(instance()).toBe(current);

				const value = -20;

				const result = current + value;
				instance.add(value);
				expect(instance()).toBe(result);
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

			it(`should add positive number value arg when current value is negative`, () => {
				const current = -6617;
				instance(current);
				expect(instance()).toBe(current);

				const value = 333891;

				const result = current + value;
				instance.add(value);
				expect(instance()).toBe(result);
			});
		});
	});
});
