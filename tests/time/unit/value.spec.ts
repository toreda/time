import {timeUnitValue} from '../../../src/time/unit/value';

const EMPTY_STRING = '';
const canonicalUnits = ['us', 'ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y'] as const;
const aliases = ['day', 'sec', 'minute', 'hour', 'week', 'month', 'year', 'wk', 'wks', 'hr'];

describe('timeUnitValue', () => {
	describe('fallback behavior', () => {
		it(`should return fallback when no values are provided`, () => {
			expect(timeUnitValue('s')).toBe('s');
		});

		it(`should return fallback when values is a single undefined`, () => {
			expect(timeUnitValue('s', undefined)).toBe('s');
		});

		it(`should return fallback when values is a single null`, () => {
			expect(timeUnitValue('s', null)).toBe('s');
		});

		it(`should return fallback when values is an empty string`, () => {
			expect(timeUnitValue('s', EMPTY_STRING)).toBe('s');
		});

		it(`should return fallback when every value is invalid`, () => {
			expect(timeUnitValue('s', null, undefined, 'aaaa', 42)).toBe('s');
		});

		it(`should return fallback when every value is an alias`, () => {
			expect(timeUnitValue('s', ...aliases)).toBe('s');
		});

		it.each(canonicalUnits)(`should preserve fallback unit '%s' when no values match`, (unit) => {
			expect(timeUnitValue(unit, 'not-a-unit')).toBe(unit);
		});
	});

	describe('value resolution', () => {
		it.each(canonicalUnits)(`should return canonical unit '%s' when it is the only value`, (unit) => {
			expect(timeUnitValue('s', unit)).toBe(unit);
		});

		it(`should return the first valid value when multiple are provided`, () => {
			expect(timeUnitValue('s', 'h', 'm', 'd')).toBe('h');
		});

		it(`should skip null values and return the next valid value`, () => {
			expect(timeUnitValue('s', null, 'h')).toBe('h');
		});

		it(`should skip undefined values and return the next valid value`, () => {
			expect(timeUnitValue('s', undefined, 'h')).toBe('h');
		});

		it(`should skip invalid string values and return the next valid value`, () => {
			expect(timeUnitValue('s', 'not-a-unit', 'h')).toBe('h');
		});

		it(`should skip alias values and return the next canonical value`, () => {
			expect(timeUnitValue('s', 'day', 'h')).toBe('h');
		});

		it(`should skip non-string values and return the next valid value`, () => {
			expect(timeUnitValue('s', 42, true, {}, [], 'h')).toBe('h');
		});

		it(`should return fallback rather than the first invalid value`, () => {
			expect(timeUnitValue('m', 'invalid')).toBe('m');
		});

		it(`should return the valid value even when it appears last`, () => {
			expect(timeUnitValue('s', null, undefined, 'invalid', 42, 'y')).toBe('y');
		});
	});

	describe('non-string inputs', () => {
		it.each([
			['number', 42],
			['zero', 0],
			['true', true],
			['false', false],
			['object', {}],
			['array', []],
			['function', () => 's'],
			['NaN', NaN]
		])(`should reject %s value`, (_label, value) => {
			expect(timeUnitValue('s', value)).toBe('s');
		});
	});

	describe('aliases are not canonical', () => {
		it.each(aliases)(`should reject alias '%s'`, (alias) => {
			expect(timeUnitValue('s', alias)).toBe('s');
		});
	});

	describe('priority order', () => {
		it(`should not skip a valid earlier value to reach a later one`, () => {
			expect(timeUnitValue('s', 'm', 'h')).toBe('m');
		});

		it(`should return the first valid value across mixed valid and invalid entries`, () => {
			expect(timeUnitValue('s', 'invalid', null, 'd', 'h')).toBe('d');
		});

		it(`should preserve order with all canonical units in reverse`, () => {
			expect(timeUnitValue('s', 'y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms', 'us')).toBe('y');
		});
	});

	describe('does not mutate inputs', () => {
		it(`should not modify the values rest array contents`, () => {
			const inputs: unknown[] = ['invalid', 'h', null];
			const snapshot = [...inputs];
			timeUnitValue('s', ...inputs);
			expect(inputs).toEqual(snapshot);
		});
	});
});
