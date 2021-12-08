import {TimerCallbackGroup} from '../../../src/timer/callback/group';
import {isAsyncFunction} from 'node:util/types';

const EMPTY_ARRAY = [];

describe('TimerCallbackGroup', () => {
	let instance: TimerCallbackGroup;

	beforeAll(() => {
		instance = new TimerCallbackGroup('one');
	});

	describe('Constructor', () => {
		let custom: TimerCallbackGroup;
		beforeAll(() => {
			custom = new TimerCallbackGroup('ctor');
		});

		it(`should define _once and initialize with an empty array`, () => {
			expect(custom._once).toBeDefined();
			expect(custom._once()).toStrictEqual(EMPTY_ARRAY);
		});

		it(`should define _always and initialize with an empty array`, () => {
			expect(custom._always).toBeDefined();
			expect(custom._always()).toStrictEqual(EMPTY_ARRAY);
		});
	});

	describe('Implementation', () => {
		describe('reset', () => {
			it(`should not change 'Id'`, () => {
				const id = '14971@9714';
				instance.id(id);
				instance.reset();
				expect(instance.id()).toBe(id);
			});

			it(`should reset 'always' and remove all listeners`, () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance._always().push(fn1);
				instance._always().push(fn2);
				expect(instance._always().length).toBe(2);
				instance.reset();
				expect(instance._always().length).toBe(0);
				const after = instance._always.getNull();
				expect(after).toStrictEqual(EMPTY_ARRAY);
			});

			it(`should reset 'once' and remove all listeners`, () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance._once().push(fn1);
				instance._once().push(fn2);
				expect(instance._once().length).toBe(2);
				instance.reset();
				expect(instance._once().length).toBe(0);
				const after = instance._once.getNull();
				expect(after).toStrictEqual(EMPTY_ARRAY);
			});
		});

		describe('invoke', () => {
			it(`should invoke provided non-async callback and pass along number duration arg`, async () => {
				const duration = 41140;
				const fn = jest.fn();
				expect(isAsyncFunction(fn)).toBe(false);

				await instance.invoke(fn, duration);
				expect(fn).toHaveBeenCalledTimes(1);
				expect(fn).toHaveBeenCalledWith(duration);
			});

			it(`should invoke non-async callback with duration 0 when duration arg is null`, async () => {
				const fn = jest.fn();

				await instance.invoke(fn, null as any);

				expect(isAsyncFunction(fn)).toBe(false);
				expect(fn).toHaveBeenCalledTimes(1);
				expect(fn).toHaveBeenLastCalledWith(0);
			});

			it(`should invoke provided async callback`, async () => {
				const duration = 41411;
				const fn = jest.fn();

				await instance.invoke(fn, duration);
				expect(fn).toHaveBeenCalledTimes(1);
				expect(fn).toHaveBeenLastCalledWith(duration);
			});

			it(`should invoke async callback with duration 0 when duration arg is null`, async () => {
				const innerFn = jest.fn();
				const fn1 = async (duration?: number | null) => {
					innerFn(duration);
				};

				await instance.invoke(fn1, null as any);

				expect(innerFn).toHaveBeenCalledTimes(1);
				expect(innerFn).toHaveBeenLastCalledWith(0);
			});
		});

		describe('execute', () => {
			it(`should invoke 'once' listeners`, async () => {
				const spy = jest.spyOn(instance, 'once');
				expect(spy).not.toHaveBeenCalled();
				await instance.execute(0);
				expect(spy).toHaveBeenCalledTimes(1);
				spy.mockRestore();
			});

			it(`should pass 'duration' arg to 'once' listeners`, async () => {
				const spy = jest.spyOn(instance, 'once');
				expect(spy).not.toHaveBeenCalled();
				const duration = 331.1;
				await instance.execute(duration);
				expect(spy).toHaveBeenLastCalledWith(duration);
				spy.mockRestore();
			});
			it(`should invoke 'always' listeners`, async () => {
				const spy = jest.spyOn(instance, 'always');
				expect(spy).not.toHaveBeenCalled();
				await instance.execute(0);
				expect(spy).toHaveBeenCalledTimes(1);
				spy.mockRestore();
			});

			it(`should pass 'duration' arg to 'always' listeners`, async () => {
				const spy = jest.spyOn(instance, 'always');
				expect(spy).not.toHaveBeenCalled();
				const duration = 2421.1;
				await instance.execute(duration);
				expect(spy).toHaveBeenLastCalledWith(duration);
				spy.mockRestore();
			});
		});
	});
});
