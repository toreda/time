import {TimerActive} from '../../src/timer/active';
import {TimerEventId} from '../../src/timer/event/id';

const EVENT_IDS: TimerEventId[] = ['pause', 'reset', 'restart', 'start', 'stop', 'unpause', 'done'];
const EMPTY_STRING = '';

describe('TimerActive', () => {
	let instance: TimerActive;

	beforeAll(() => {
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
			expect(custom.handlersBound()).toBe(false);
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
		});

		describe('on', () => {
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
				instance.handlersBound(false);
				instance.bindHandlers();
				expect(instance.handlersBound()).toBe(true);
			});
		});
	});
});
