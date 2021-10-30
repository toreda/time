import {TimerActive} from '../../src/timer/active';
import {TimerCallback} from '../../src/timer/callback';
import {TimerEventId} from '../../src/timer/event/id';
import {timeMake} from '../../src/time/make';

const EVENT_IDS: TimerEventId[] = ['pause', 'reset', 'restart', 'start', 'stop', 'unpause', 'done'];
const EMPTY_STRING = '';

describe('TimerActive', () => {
	let instance: TimerActive;
	let sampleCallback: TimerCallback;

	beforeAll(() => {
		sampleCallback = jest.fn();
		instance = new TimerActive();
	});

	beforeEach(() => {
		instance.reset();
	});

	describe('Constructor', () => {
		let custom: TimerActive;

		beforeAll(() => {
			custom = new TimerActive();
		});

		it(`should initialize running to false`, () => {
			expect(custom.running()).toBe(false);
		});

		it(`should initialize handlersBound to false`, () => {
			expect(custom._handlersBound()).toBe(false);
		});

		it(`should initialize lastIntervalEnd to 0`, () => {
			expect(custom.lastIntervalEnd()).toBe(0);
		});
	});

	describe('Implementation', () => {
		describe('start', () => {
			it(`should set running true when timer is not running`, async () => {
				instance.running(false);
				await instance.start();
				expect(instance.running()).toBe(true);
			});

			it(`should return true when start can be executed`, async () => {
				instance.running(false);
				const result = await instance.start();
				expect(result).toBe(true);
			});

			it(`should not set running true when timer is already running`, async () => {
				instance.running(true);
				await instance.start();
				expect(instance.running()).toBe(true);
			});

			it(`should return false when timer is already running`, async () => {
				instance.running(true);
				const result = await instance.start();
				expect(result).toBe(false);
			});

			it(`should not bind handlers when timer is already running`, async () => {
				instance.running(true);
				const spy = jest.spyOn(instance, 'bindHandlers');
				await instance.start();

				expect(spy).not.toHaveBeenCalled();
				spy.mockRestore();
			});
		});

		describe('once', () => {
			it(`should execute callback once`, async () => {
				const fn = jest.fn();
				instance.once('restart', fn);
				expect(fn).not.toHaveBeenCalled();
				await instance.executeCallbacks('restart');
				expect(fn).toHaveBeenCalledTimes(1);
				await instance.executeCallbacks('restart');
				await instance.executeCallbacks('restart');
				expect(fn).toHaveBeenCalledTimes(1);
			});

			for (const eventId of EVENT_IDS) {
				it(`should invoke registered ${eventId} one-time callback only once when ${eventId} event fires`, async () => {
					const fn = jest.fn();
					instance.once(eventId, fn);
					expect(fn).not.toHaveBeenCalled();
					await instance.executeCallbacks(eventId);
					await instance.executeCallbacks(eventId);
					await instance.executeCallbacks(eventId);

					expect(fn).toHaveBeenCalledTimes(1);
				});
			}

			it(`should return false when fn arg is undefined`, () => {
				expect(instance.once('done', undefined as any)).toBe(false);
			});

			it(`should return false when fn arg is null`, () => {
				expect(instance.once('done', null as any)).toBe(false);
			});

			it(`should return false when fn arg is not a function`, () => {
				expect(instance.once('done', 'aaaaa' as any)).toBe(false);
			});

			it(`should return false when id is undefined`, () => {
				expect(instance.once(undefined as any, sampleCallback)).toBe(false);
			});

			it(`should return false when id is null`, () => {
				expect(instance.once(null as any, sampleCallback)).toBe(false);
			});

			it(`should return false when id is an unsupported eventId`, () => {
				expect(instance.once('aaaaaaa' as any, sampleCallback)).toBe(false);
			});

			it(`should return false when id is an empty string`, () => {
				expect(instance.once(EMPTY_STRING as any, sampleCallback)).toBe(false);
			});
		});

		describe('on', () => {
			it(`should return false when id is undefined`, () => {
				expect(instance.on(undefined as any, sampleCallback)).toBe(false);
			});

			it(`should return false when id is null`, () => {
				expect(instance.on(null as any, sampleCallback)).toBe(false);
			});

			it(`should return false when id is an unsupported eventId`, () => {
				expect(instance.on('aaaaaaa' as any, sampleCallback)).toBe(false);
			});

			it(`should return false when id is an empty string`, () => {
				expect(instance.on(EMPTY_STRING as any, sampleCallback)).toBe(false);
			});

			it(`should return false when fn arg is null`, () => {
				expect(instance.on('pause', null as any)).toBe(false);
			});

			it(`should return false when fn arg is undefined`, () => {
				expect(instance.on('pause', undefined as any)).toBe(false);
			});

			it(`should return false when fn arg is a truthy, non-function value`, () => {
				expect(instance.on('pause', 'A14917414' as any)).toBe(false);
			});

			it(`should return true when fn arg is a function and event id is valid`, () => {
				const fn = jest.fn();
				expect(instance.on('pause', fn)).toBe(true);
			});

			it(`should add listener fn when fn arg is a function and event id is valid`, () => {
				const fn1 = () => {
					1 + 1;
				};
				expect(instance.listeners.pause._always().length).toBe(0);
				expect(instance.on('pause', fn1)).toBe(true);
				expect(instance.listeners.pause._always().length).toBe(1);
			});

			it(`should return false when fn arg is undefined`, () => {
				expect(instance.on('done', undefined as any)).toBe(false);
			});

			it(`should return false when fn arg is null`, () => {
				expect(instance.on('done', null as any)).toBe(false);
			});

			it(`should return false when fn arg is not a function`, () => {
				expect(instance.on('done', 'aaaaa' as any)).toBe(false);
			});
		});

		describe('getListenerGroup', () => {
			it(`should return null when id is undefined`, () => {
				expect(instance.getListenerGroup(undefined as any)).toBeNull();
			});

			it(`should return null when id is null`, () => {
				expect(instance.getListenerGroup(null as any)).toBeNull();
			});

			it(`should return null when event id is an empty string`, () => {
				expect(instance.getListenerGroup(EMPTY_STRING as any)).toBeNull();
			});

			it(`should return null when event id is an arbitrary string`, () => {
				expect(instance.getListenerGroup('A8614186' as any)).toBeNull();
			});

			for (const eventId of EVENT_IDS) {
				it(`should return listener group for supported event ID '${eventId}'`, () => {
					const result = instance.getListenerGroup(eventId);
					expect(result).not.toBeNull();
					expect(result).toHaveProperty('_once');
					expect(result).toHaveProperty('_always');
					expect(result!._always.typeId).toBe('Array');
					expect(result!._once.typeId).toBe('Array');
				});
			}
		});

		describe('setTimeLimit', () => {
			it(`should return true when value is a number`, () => {
				const value = 1315613;
				expect(instance.setTimeLimit(value)).toBe(true);
			});

			it(`should return false when value is undefined`, () => {
				expect(instance.setTimeLimit(undefined as any)).toBe(false);
			});

			it(`should return false when value is null`, () => {
				expect(instance.setTimeLimit(null as any)).toBe(false);
			});

			it(`should return false when value is not a number or Time object`, () => {
				expect(instance.setTimeLimit('aaaaaa' as any)).toBe(false);
			});

			it(`should return set timeLimit value when value is a number`, () => {
				instance.timeLimit(0);
				expect(instance.timeLimit()).toBe(0);
				const value = 46818614;
				expect(instance.setTimeLimit(value)).toBe(true);
				expect(instance.timeLimit()).toBe(value);
			});

			it(`should return set timeLimit value when value is a Time object`, () => {
				instance.timeLimit(0);
				expect(instance.timeLimit()).toBe(0);
				const value = timeMake('s', 771791);
				expect(instance.setTimeLimit(value)).toBe(true);
				expect(instance.timeLimit()).toBe(value());
			});
		});

		describe('stop', () => {
			it(`should set running false when timer is running`, async () => {
				instance.running(true);
				await instance.stop();
				expect(instance.running()).toBe(false);
			});

			it(`should return true when stop executes`, async () => {
				instance.running(true);
				const result = await instance.stop();
				expect(result).toBe(true);
			});

			it(`should not change running true when timer is not running`, async () => {
				instance.running(false);
				await instance.stop();
				expect(instance.running()).toBe(false);
			});

			it(`should execute stop callbacks`, async () => {
				const fn = jest.fn();
			});
		});

		describe('bindHandlers', () => {
			it(`should set handlersBound flag when it is not already set`, () => {
				instance._handlersBound(false);
				instance.bindHandlers();
				expect(instance._handlersBound()).toBe(true);
			});
		});

		describe('pause', () => {
			it(`should call pause callbacks`, async () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance.on('pause', fn1);
				instance.on('pause', fn2);
				instance.running(true);
				instance.paused(false);

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
				await instance.pause();

				expect(fn1).toHaveBeenCalledTimes(1);
				expect(fn2).toHaveBeenCalledTimes(1);
			});

			it(`should not call pause callbacks when timer is not running`, async () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance.on('pause', fn1);
				instance.on('pause', fn2);
				instance.running(false);
				instance.paused(false);

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
				await instance.pause();

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
			});

			it(`should not call pause callbacks when timer is already paused`, async () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance.on('pause', fn1);
				instance.on('pause', fn2);
				instance.running(true);
				instance.paused(true);

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
				await instance.pause();

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
			});
		});

		describe('unpause', () => {
			it(`should call unpause callbacks`, async () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance.on('unpause', fn1);
				instance.on('unpause', fn2);
				instance.running(true);
				instance.paused(true);

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
				await instance.unpause();

				expect(fn1).toHaveBeenCalledTimes(1);
				expect(fn2).toHaveBeenCalledTimes(1);
			});

			it(`should not call unpause callbacks when timer is not running`, async () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance.on('unpause', fn1);
				instance.on('unpause', fn2);
				instance.running(false);
				instance.paused(false);

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
				await instance.unpause();

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
			});

			it(`should not call unpause callbacks when timer is not paused`, async () => {
				const fn1 = jest.fn();
				const fn2 = jest.fn();
				instance.on('unpause', fn1);
				instance.on('unpause', fn2);
				instance.running(true);
				instance.paused(false);

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
				await instance.unpause();

				expect(fn1).not.toHaveBeenCalled();
				expect(fn2).not.toHaveBeenCalled();
			});
		});

		describe('onUpdate', () => {
			let stopSpy: jest.SpyInstance;
			beforeAll(() => {
				stopSpy = jest.spyOn(instance, 'stop');
			});

			beforeEach(() => {
				stopSpy.mockClear();
			});

			afterAll(() => {
				stopSpy.mockRestore();
			});

			it(`should not call stop when timer is not running`, () => {
				expect(stopSpy).not.toHaveBeenCalled();
				instance.running(false);
				instance.limitDuration(true);
				instance.timeLimit(10);
				instance.timeStart.setNow().subHours(3);
				instance.onUpdate();
				expect(stopSpy).not.toHaveBeenCalled();
			});

			/**
			it(`should stop timer when the max duration has elapsed`, () => {
				expect(stopSpy).not.toHaveBeenCalled();
				const start = timeNowOffset(-1000);
				instance.timeStart(start);
				instance.timeStart.subHours(10);
				instance.limitDuration(true);
				instance.timeLimit(seconds(1));

				instance.running(true);
				instance.onUpdate();
				expect(stopSpy).toHaveBeenCalledTimes(1);
			});
			**/
		});

		describe('reset', () => {
			it(`should reset running to false`, () => {
				instance.running(true);
				instance.reset();
				expect(instance.running()).toBe(false);
			});

			it(`should reset paused to false`, () => {
				instance.paused(true);
				instance.reset();
				expect(instance.paused()).toBe(false);
			});

			it(`should reset limitDuration to its fallback value`, () => {});
		});
	});
});
