import {TimerCallbackGroup} from '../../../src/timer/callback/group';

describe('TimerCallbackGroup', () => {
	let instance: TimerCallbackGroup;

	beforeEach(() => {
		instance = new TimerCallbackGroup('one');
	});

	describe('Constructor', () => {
		it(`should set the provided id`, () => {
			const custom = new TimerCallbackGroup('ctor');
			expect(custom.id).toBe('ctor');
		});

		it(`should generate an id when none is provided`, () => {
			const custom = new TimerCallbackGroup();
			expect(typeof custom.id).toBe('string');
			expect(custom.id.length).toBeGreaterThan(0);
		});

		it(`should initialize once count to 0`, () => {
			const custom = new TimerCallbackGroup('ctor');
			expect(custom.onceCt()).toBe(0);
		});

		it(`should initialize always count to 0`, () => {
			const custom = new TimerCallbackGroup('ctor');
			expect(custom.alwaysCt()).toBe(0);
		});
	});

	describe('Implementation', () => {
		describe('on', () => {
			it(`should register a 'once' listener`, () => {
				const fn = jest.fn();
				expect(instance.on('once', fn)).toBe(true);
				expect(instance.onceCt()).toBe(1);
				expect(instance.alwaysCt()).toBe(0);
			});

			it(`should register an 'always' listener`, () => {
				const fn = jest.fn();
				expect(instance.on('always', fn)).toBe(true);
				expect(instance.alwaysCt()).toBe(1);
				expect(instance.onceCt()).toBe(0);
			});

			it(`should return false when fn is not a function`, () => {
				expect(instance.on('once', null as any)).toBe(false);
				expect(instance.on('always', undefined as any)).toBe(false);
				expect(instance.onceCt()).toBe(0);
				expect(instance.alwaysCt()).toBe(0);
			});
		});

		describe('once', () => {
			it(`should delegate to on('once', fn)`, () => {
				const spy = jest.spyOn(instance, 'on');
				const fn = jest.fn();
				instance.once(fn);
				expect(spy).toHaveBeenCalledWith('once', fn);
				spy.mockRestore();
			});

			it(`should add to the once list`, () => {
				instance.once(jest.fn());
				expect(instance.onceCt()).toBe(1);
			});
		});

		describe('always', () => {
			it(`should delegate to on('always', fn)`, () => {
				const spy = jest.spyOn(instance, 'on');
				const fn = jest.fn();
				instance.always(fn);
				expect(spy).toHaveBeenCalledWith('always', fn);
				spy.mockRestore();
			});

			it(`should add to the always list`, () => {
				instance.always(jest.fn());
				expect(instance.alwaysCt()).toBe(1);
			});
		});

		describe('remove', () => {
			it(`should remove a registered 'once' listener and return true`, () => {
				const fn = jest.fn();
				instance.once(fn);
				expect(instance.onceCt()).toBe(1);
				expect(instance.remove('once', fn)).toBe(true);
				expect(instance.onceCt()).toBe(0);
			});

			it(`should remove a registered 'always' listener and return true`, () => {
				const fn = jest.fn();
				instance.always(fn);
				expect(instance.alwaysCt()).toBe(1);
				expect(instance.remove('always', fn)).toBe(true);
				expect(instance.alwaysCt()).toBe(0);
			});

			it(`should return false when fn is not registered in the given list`, () => {
				const fn = jest.fn();
				instance.always(fn);
				expect(instance.remove('once', fn)).toBe(false);
				expect(instance.alwaysCt()).toBe(1);
			});

			it(`should not affect the other list`, () => {
				const onceFn = jest.fn();
				const alwaysFn = jest.fn();
				instance.once(onceFn);
				instance.always(alwaysFn);
				instance.remove('once', onceFn);
				expect(instance.onceCt()).toBe(0);
				expect(instance.alwaysCt()).toBe(1);
			});
		});

		describe('reset', () => {
			it(`should not change 'id'`, () => {
				const id = instance.id;
				instance.reset();
				expect(instance.id).toBe(id);
			});

			it(`should clear all 'always' listeners`, () => {
				instance.always(jest.fn());
				instance.always(jest.fn());
				expect(instance.alwaysCt()).toBe(2);
				instance.reset();
				expect(instance.alwaysCt()).toBe(0);
			});

			it(`should clear all 'once' listeners`, () => {
				instance.once(jest.fn());
				instance.once(jest.fn());
				expect(instance.onceCt()).toBe(2);
				instance.reset();
				expect(instance.onceCt()).toBe(0);
			});
		});

		describe('invoke', () => {
			it(`should invoke the provided callback with the duration arg`, async () => {
				const duration = 41140;
				const fn = jest.fn();

				await instance.invoke(fn, duration);
				expect(fn).toHaveBeenCalledTimes(1);
				expect(fn).toHaveBeenCalledWith(duration);
			});

			it(`should invoke the callback with duration 0 when duration arg is null`, async () => {
				const fn = jest.fn();

				await instance.invoke(fn, null);

				expect(fn).toHaveBeenCalledTimes(1);
				expect(fn).toHaveBeenLastCalledWith(0);
			});

			it(`should invoke the callback with duration 0 when duration arg is undefined`, async () => {
				const fn = jest.fn();

				await instance.invoke(fn);

				expect(fn).toHaveBeenCalledTimes(1);
				expect(fn).toHaveBeenLastCalledWith(0);
			});

			it(`should invoke an async callback with the duration arg`, async () => {
				const innerFn = jest.fn();
				const fn = async (duration?: number | null) => {
					innerFn(duration);
				};

				await instance.invoke(fn, null);

				expect(innerFn).toHaveBeenCalledTimes(1);
				expect(innerFn).toHaveBeenLastCalledWith(0);
			});

			it(`should swallow errors thrown by the callback`, async () => {
				const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
				const fn = () => {
					throw new Error('boom');
				};

				await expect(instance.invoke(fn, 0)).resolves.toBeUndefined();
				expect(errSpy).toHaveBeenCalledTimes(1);
				errSpy.mockRestore();
			});
		});

		describe('executeOnce', () => {
			it(`should invoke each registered 'once' listener exactly once`, async () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance.once(fn1);
				instance.once(fn2);

				await instance.executeOnce(0);

				expect(fn1).toHaveBeenCalledTimes(1);
				expect(fn2).toHaveBeenCalledTimes(1);
			});

			it(`should remove all 'once' listeners after executing`, async () => {
				instance.once(jest.fn());
				instance.once(jest.fn());

				await instance.executeOnce(0);

				expect(instance.onceCt()).toBe(0);
			});

			it(`should pass the duration arg to listeners`, async () => {
				const fn = jest.fn();
				instance.once(fn);
				const duration = 555;

				await instance.executeOnce(duration);

				expect(fn).toHaveBeenCalledWith(duration);
			});
		});

		describe('executeAlways', () => {
			it(`should invoke each registered 'always' listener`, async () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance.always(fn1);
				instance.always(fn2);

				await instance.executeAlways(0);

				expect(fn1).toHaveBeenCalledTimes(1);
				expect(fn2).toHaveBeenCalledTimes(1);
			});

			it(`should not remove 'always' listeners after executing`, async () => {
				instance.always(jest.fn());
				instance.always(jest.fn());

				await instance.executeAlways(0);

				expect(instance.alwaysCt()).toBe(2);
			});

			it(`should pass the duration arg to listeners`, async () => {
				const fn = jest.fn();
				instance.always(fn);
				const duration = 777;

				await instance.executeAlways(duration);

				expect(fn).toHaveBeenCalledWith(duration);
			});
		});

		describe('executeAll', () => {
			it(`should invoke 'executeOnce'`, async () => {
				const spy = jest.spyOn(instance, 'executeOnce');
				await instance.executeAll(0);
				expect(spy).toHaveBeenCalledTimes(1);
				spy.mockRestore();
			});

			it(`should pass 'duration' arg to 'executeOnce'`, async () => {
				const spy = jest.spyOn(instance, 'executeOnce');
				const duration = 331.1;
				await instance.executeAll(duration);
				expect(spy).toHaveBeenLastCalledWith(duration);
				spy.mockRestore();
			});

			it(`should invoke 'executeAlways'`, async () => {
				const spy = jest.spyOn(instance, 'executeAlways');
				await instance.executeAll(0);
				expect(spy).toHaveBeenCalledTimes(1);
				spy.mockRestore();
			});

			it(`should pass 'duration' arg to 'executeAlways'`, async () => {
				const spy = jest.spyOn(instance, 'executeAlways');
				const duration = 2421.1;
				await instance.executeAll(duration);
				expect(spy).toHaveBeenLastCalledWith(duration);
				spy.mockRestore();
			});
		});
	});
});
