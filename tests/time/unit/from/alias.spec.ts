import {timeUnitFromAlias} from '../../../../src/time/unit/from/alias';

describe('timeUnitFromAlias', () => {
	it('should return null when value is undefined', () => {
		expect(timeUnitFromAlias(undefined)).toBeNull();
	});

	it('should return null when value is not provided', () => {
		expect(timeUnitFromAlias()).toBeNull();
	});

	it('should return null when value is null', () => {
		expect(timeUnitFromAlias(null)).toBeNull();
	});

	it('should return null when value is a number', () => {
		expect(timeUnitFromAlias(42)).toBeNull();
	});

	it('should return null when value is an empty string', () => {
		expect(timeUnitFromAlias('')).toBeNull();
	});

	it('should return null for unknown alias', () => {
		expect(timeUnitFromAlias('asdf')).toBeNull();
	});

	it(`should resolve 'day' -> 'd'`, () => {
		expect(timeUnitFromAlias('day')).toBe('d');
	});

	it(`should resolve 'sec' -> 's'`, () => {
		expect(timeUnitFromAlias('sec')).toBe('s');
	});

	it(`should resolve 'minutes' -> 'm'`, () => {
		expect(timeUnitFromAlias('minutes')).toBe('m');
	});

	it(`should resolve 'hours' -> 'h'`, () => {
		expect(timeUnitFromAlias('hours')).toBe('h');
	});

	it(`should resolve 'weeks' -> 'w'`, () => {
		expect(timeUnitFromAlias('weeks')).toBe('w');
	});

	it(`should resolve 'months' -> 'mo'`, () => {
		expect(timeUnitFromAlias('months')).toBe('mo');
	});

	it(`should resolve 'years' -> 'y'`, () => {
		expect(timeUnitFromAlias('years')).toBe('y');
	});

	it(`should pass canonical 'd' through unchanged`, () => {
		expect(timeUnitFromAlias('d')).toBe('d');
	});

	it(`should pass canonical 'us' through unchanged`, () => {
		expect(timeUnitFromAlias('us')).toBe('us');
	});
});
