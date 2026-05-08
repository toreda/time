import {timeUnitAliases} from '../../../src/time/unit/aliases';

describe('timeUnitAliases', () => {
	it(`should map 'd' -> 'd'`, () => {
		expect(timeUnitAliases.get('d')).toBe('d');
	});

	it(`should map 'days' -> 'd'`, () => {
		expect(timeUnitAliases.get('days')).toBe('d');
	});

	it(`should map 'day' -> 'd'`, () => {
		expect(timeUnitAliases.get('day')).toBe('d');
	});

	it(`should map 's' -> 's'`, () => {
		expect(timeUnitAliases.get('s')).toBe('s');
	});

	it(`should map 'sec' -> 's'`, () => {
		expect(timeUnitAliases.get('sec')).toBe('s');
	});

	it(`should map 'secs' -> 's'`, () => {
		expect(timeUnitAliases.get('secs')).toBe('s');
	});

	it(`should map 'second' -> 's'`, () => {
		expect(timeUnitAliases.get('second')).toBe('s');
	});

	it(`should map 'seconds' -> 's'`, () => {
		expect(timeUnitAliases.get('seconds')).toBe('s');
	});

	it(`should map 'h' -> 'h'`, () => {
		expect(timeUnitAliases.get('h')).toBe('h');
	});

	it(`should map 'hr' -> 'h'`, () => {
		expect(timeUnitAliases.get('hr')).toBe('h');
	});

	it(`should map 'hrs' -> 'h'`, () => {
		expect(timeUnitAliases.get('hrs')).toBe('h');
	});

	it(`should map 'hour' -> 'h'`, () => {
		expect(timeUnitAliases.get('hour')).toBe('h');
	});

	it(`should map 'hours' -> 'h'`, () => {
		expect(timeUnitAliases.get('hours')).toBe('h');
	});

	it(`should map 'week' -> 'w'`, () => {
		expect(timeUnitAliases.get('week')).toBe('w');
	});

	it(`should map 'weeks' -> 'w'`, () => {
		expect(timeUnitAliases.get('weeks')).toBe('w');
	});

	it(`should map 'wk' -> 'w'`, () => {
		expect(timeUnitAliases.get('wk')).toBe('w');
	});

	it(`should map 'wks' -> 'w'`, () => {
		expect(timeUnitAliases.get('wks')).toBe('w');
	});

	it(`should map 'm' -> 'm'`, () => {
		expect(timeUnitAliases.get('m')).toBe('m');
	});

	it(`should map 'min' -> 'm'`, () => {
		expect(timeUnitAliases.get('min')).toBe('m');
	});

	it(`should map 'mins' -> 'm'`, () => {
		expect(timeUnitAliases.get('mins')).toBe('m');
	});

	it(`should map 'minutes' -> 'm'`, () => {
		expect(timeUnitAliases.get('minutes')).toBe('m');
	});

	it(`should map 'minute' -> 'm'`, () => {
		expect(timeUnitAliases.get('minute')).toBe('m');
	});

	it(`should map 'y' -> 'y'`, () => {
		expect(timeUnitAliases.get('y')).toBe('y');
	});

	it(`should map 'yr' -> 'y'`, () => {
		expect(timeUnitAliases.get('yr')).toBe('y');
	});

	it(`should map 'yrs' -> 'y'`, () => {
		expect(timeUnitAliases.get('yrs')).toBe('y');
	});

	it(`should map 'year' -> 'y'`, () => {
		expect(timeUnitAliases.get('year')).toBe('y');
	});

	it(`should map 'years' -> 'y'`, () => {
		expect(timeUnitAliases.get('years')).toBe('y');
	});

	it(`should map 'mo' -> 'mo'`, () => {
		expect(timeUnitAliases.get('mo')).toBe('mo');
	});

	it(`should map 'mos' -> 'mo'`, () => {
		expect(timeUnitAliases.get('mos')).toBe('mo');
	});

	it(`should map 'month' -> 'mo'`, () => {
		expect(timeUnitAliases.get('month')).toBe('mo');
	});

	it(`should map 'months' -> 'mo'`, () => {
		expect(timeUnitAliases.get('months')).toBe('mo');
	});

	it(`should return undefined for unknown alias`, () => {
		expect(timeUnitAliases.get('2222222')).toBeUndefined();
	});
});
