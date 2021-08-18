import {timeUnits} from '../../src/time/units';

describe('timeUnits', () => {
	it(`should return 'd' for 'd'`, () => {
		expect(timeUnits.get('d')).toBe('d');
	});

	it(`should map 'days' -> 'd'`, () => {
		expect(timeUnits.get('days')).toBe('d');
	});

	it(`should map 'day' -> 'd'`, () => {
		expect(timeUnits.get('day')).toBe('d');
	});

	it(`should map 's' -> 's'`, () => {
		expect(timeUnits.get('s')).toBe('s');
	});

	it(`should map 'secs' -> 's'`, () => {
		expect(timeUnits.get('sec')).toBe('s');
	});

	it(`should map 'sec' -> 's'`, () => {
		expect(timeUnits.get('sec')).toBe('s');
	});

	it(`should map 'second' -> 's'`, () => {
		expect(timeUnits.get('second')).toBe('s');
	});

	it(`should map 'seconds' -> 's'`, () => {
		expect(timeUnits.get('seconds')).toBe('s');
	});

	it(`should map 'h' -> 'h'`, () => {
		expect(timeUnits.get('h')).toBe('h');
	});

	it(`should map 'hr' -> 'h'`, () => {
		expect(timeUnits.get('hr')).toBe('h');
	});

	it(`should map 'hrs' -> 'h'`, () => {
		expect(timeUnits.get('hrs')).toBe('h');
	});

	it(`should map 'hour' -> 'h'`, () => {
		expect(timeUnits.get('hour')).toBe('h');
	});

	it(`should map 'hours' -> 'h'`, () => {
		expect(timeUnits.get('hours')).toBe('h');
	});

	it(`should map 'week' -> 'w'`, () => {
		expect(timeUnits.get('week')).toBe('w');
	});

	it(`should map 'weeks' -> 'w'`, () => {
		expect(timeUnits.get('weeks')).toBe('w');
	});

	it(`should map 'wk' -> 'w'`, () => {
		expect(timeUnits.get('wk')).toBe('w');
	});

	it(`should map 'wks' -> 'w'`, () => {
		expect(timeUnits.get('wks')).toBe('w');
	});

	it(`should map 'm' -> 'm'`, () => {
		expect(timeUnits.get('m')).toBe('m');
	});

	it(`should map 'min' -> 'm'`, () => {
		expect(timeUnits.get('min')).toBe('m');
	});

	it(`should map 'mins' -> 'm'`, () => {
		expect(timeUnits.get('mins')).toBe('m');
	});

	it(`should map 'minutes' -> 'm'`, () => {
		expect(timeUnits.get('minutes')).toBe('m');
	});

	it(`should map 'minute' -> 'm'`, () => {
		expect(timeUnits.get('minute')).toBe('m');
	});

	it(`should map 'y' -> 'y'`, () => {
		expect(timeUnits.get('y')).toBe('y');
	});

	it(`should map 'yr' -> 'y'`, () => {
		expect(timeUnits.get('yr')).toBe('y');
	});

	it(`should map 'yrs' -> 'y'`, () => {
		expect(timeUnits.get('yrs')).toBe('y');
	});

	it(`should map 'year' -> 'y'`, () => {
		expect(timeUnits.get('year')).toBe('y');
	});

	it(`should map 'years' -> 'y'`, () => {
		expect(timeUnits.get('years')).toBe('y');
	});

	it(`should map 'mo' -> 'mo'`, () => {
		expect(timeUnits.get('mo')).toBe('mo');
	});

	it(`should map 'mos' -> 'mo'`, () => {
		expect(timeUnits.get('mos')).toBe('mo');
	});

	it(`should map 'month' -> 'mo'`, () => {
		expect(timeUnits.get('month')).toBe('mo');
	});

	it(`should map 'months' -> 'mo'`, () => {
		expect(timeUnits.get('months')).toBe('mo');
	});

	it(`should map random string '2222222' -> nothing`, () => {
		expect(timeUnits.get('2222222')).toBeUndefined();
	});
});
