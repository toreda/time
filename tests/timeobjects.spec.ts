import {days} from '../src/days';
import {hours} from '../src/hours';
import {microseconds} from '../src/microseconds';
import {milliseconds} from '../src/milliseconds';
import {minutes} from '../src/minutes';
import {months} from '../src/months';
import {seconds} from '../src/seconds';
import {weeks} from '../src/weeks';
import {years} from '../src/years';

describe('Time Object functions', () => {
	describe('minutes', () => {
		it(`should make time object with unit type 'm'`, () => {
			const o = minutes(0);
			expect(o.units()).toBe('m');
		});

		it(`should initialize value to 0 when initial arg is 0`, () => {
			const o = minutes(0);
			expect(o()).toBe(0);
		});

		it(`should initialize value to 1 when initial arg is 1`, () => {
			const o = minutes(1);
			expect(o()).toBe(1);
		});

		it(`should initialize value to 1 when initial arg is -1`, () => {
			const o = minutes(-1);
			expect(o()).toBe(-1);
		});
	});

	describe('hours', () => {
		it(`should make time object with unit type 'h'`, () => {
			const o = hours(0);
			expect(o.units()).toBe('h');
		});

		it(`should initialize value to 0 when initial arg is 0`, () => {
			const o = hours(0);
			expect(o()).toBe(0);
		});

		it(`should initialize value to 1 when initial arg is 1`, () => {
			const o = hours(1);
			expect(o()).toBe(1);
		});

		it(`should initialize value to 1 when initial arg is -1`, () => {
			const o = hours(-1);
			expect(o()).toBe(-1);
		});
	});

	describe('days', () => {
		it(`should make time object with unit type 'd'`, () => {
			const o = days(0);
			expect(o.units()).toBe('d');
		});

		it(`should initialize value to 0 when initial arg is 0`, () => {
			const o = days(0);
			expect(o()).toBe(0);
		});

		it(`should initialize value to 1 when initial arg is 1`, () => {
			const o = days(1);
			expect(o()).toBe(1);
		});

		it(`should initialize value to 1 when initial arg is -1`, () => {
			const o = days(-1);
			expect(o()).toBe(-1);
		});
	});

	describe('years', () => {
		it(`should make time object with unit type 'y'`, () => {
			const o = years(0);
			expect(o.units()).toBe('y');
		});

		it(`should initialize value to 0 when initial arg is 0`, () => {
			const o = years(0);
			expect(o()).toBe(0);
		});

		it(`should initialize value to 1 when initial arg is 1`, () => {
			const o = years(1);
			expect(o()).toBe(1);
		});

		it(`should initialize value to 1 when initial arg is -1`, () => {
			const o = years(-1);
			expect(o()).toBe(-1);
		});
	});

	describe('months', () => {
		it(`should make time object with unit type 'd'`, () => {
			const o = months(0);
			expect(o.units()).toBe('mo');
		});

		it(`should initialize value to 0 when initial arg is 0`, () => {
			const o = months(0);
			expect(o()).toBe(0);
		});

		it(`should initialize value to 1 when initial arg is 1`, () => {
			const o = months(1);
			expect(o()).toBe(1);
		});

		it(`should initialize value to 1 when initial arg is -1`, () => {
			const o = months(-1);
			expect(o()).toBe(-1);
		});
	});

	describe('weeks', () => {
		it(`should make time object with unit type 'w'`, () => {
			const o = weeks(0);
			expect(o.units()).toBe('w');
		});

		it(`should initialize value to 0 when initial arg is 0`, () => {
			const o = weeks(0);
			expect(o()).toBe(0);
		});

		it(`should initialize value to 1 when initial arg is 1`, () => {
			const o = weeks(1);
			expect(o()).toBe(1);
		});

		it(`should initialize value to 1 when initial arg is -1`, () => {
			const o = weeks(-1);
			expect(o()).toBe(-1);
		});
	});

	describe('seconds', () => {
		it(`should make time object with unit type 's'`, () => {
			const o = seconds(0);
			expect(o.units()).toBe('s');
		});

		it(`should initialize value to 0 when initial arg is 0`, () => {
			const o = seconds(0);
			expect(o()).toBe(0);
		});

		it(`should initialize value to 1 when initial arg is 1`, () => {
			const o = seconds(1);
			expect(o()).toBe(1);
		});

		it(`should initialize value to 1 when initial arg is -1`, () => {
			const o = seconds(-1);
			expect(o()).toBe(-1);
		});
	});

	describe('milliseconds', () => {
		it(`should make time object with unit type 'ms'`, () => {
			const o = milliseconds(0);
			expect(o.units()).toBe('ms');
		});

		it(`should initialize value to 0 when initial arg is 0`, () => {
			const o = milliseconds(0);
			expect(o()).toBe(0);
		});

		it(`should initialize value to 1 when initial arg is 1`, () => {
			const o = milliseconds(1);
			expect(o()).toBe(1);
		});

		it(`should initialize value to 1 when initial arg is -1`, () => {
			const o = milliseconds(-1);
			expect(o()).toBe(-1);
		});
	});

	describe('microseconds', () => {
		it(`should make time object with unit type 'μs'`, () => {
			const o = microseconds(0);
			expect(o.units()).toBe('μs');
		});

		it(`should initialize value to 0 when initial arg is 0`, () => {
			const o = microseconds(0);
			expect(o()).toBe(0);
		});

		it(`should initialize value to 1 when initial arg is 1`, () => {
			const o = microseconds(1);
			expect(o()).toBe(1);
		});

		it(`should initialize value to 1 when initial arg is -1`, () => {
			const o = microseconds(-1);
			expect(o()).toBe(-1);
		});
	});
});
