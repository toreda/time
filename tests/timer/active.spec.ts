import {TimerActive} from '../../src/timer/active';

describe('TimerActive', () => {
	let instance: TimerActive;

	beforeAll(() => {
		instance = new TimerActive();
	});

	beforeEach(() => {
		instance.lastIntervalEnd.reset();
		instance.running.reset();
		instance.handlersBound.reset();
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
			it(`should set running true when timer is not running`, () => {
				instance.running(false);
				instance.start();
				expect(instance.running()).toBe(true);
			});

			it(`should return true when start can be executed`, () => {
				instance.running(false);
				expect(instance.start()).toBe(true);
			});

			it(`should not set running true when timer is already running`, () => {
				instance.running(true);
				instance.start();
				expect(instance.running()).toBe(true);
			});

			it(`should return false when timer is already running`, () => {
				instance.running(true);
				expect(instance.start()).toBe(false);
			});

			it(`should not bind handlers when timer is already running`, () => {
				instance.running(true);
				const spy = jest.spyOn(instance, 'bindHandlers');
				instance.start();
				expect(spy).not.toHaveBeenCalled();
				spy.mockRestore();
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
