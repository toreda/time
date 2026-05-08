import {timeValueParseDate} from '../../../src/time/value/parse-date';

describe('timeValueParseDate', () => {
	describe('number input (treated as already in target units)', () => {
		it(`should return a positive integer in seconds`, () => {
			expect(timeValueParseDate(1705276800, 's')).toBe(1705276800);
		});

		it(`should return a positive integer in milliseconds`, () => {
			expect(timeValueParseDate(1705276800000, 'ms')).toBe(1705276800000);
		});

		it(`should accept zero (epoch)`, () => {
			expect(timeValueParseDate(0, 'ms')).toBe(0);
		});

		it(`should reject negative numbers (pre-epoch)`, () => {
			expect(timeValueParseDate(-1, 's')).toBeNull();
		});

		it(`should reject NaN`, () => {
			expect(timeValueParseDate(NaN, 's')).toBeNull();
		});

		it(`should reject Infinity`, () => {
			expect(timeValueParseDate(Infinity, 's')).toBeNull();
		});

		it(`should reject -Infinity`, () => {
			expect(timeValueParseDate(-Infinity, 's')).toBeNull();
		});

		it(`should reject values above MAX_SAFE_INTEGER`, () => {
			expect(timeValueParseDate(Number.MAX_SAFE_INTEGER + 1, 's')).toBeNull();
		});
	});

	describe('non-string non-number input', () => {
		it.each([
			['null', null],
			['undefined', undefined],
			['boolean', true],
			['object', {}],
			['array', []]
		])(`should return null for %s`, (_label, value) => {
			expect(timeValueParseDate(value as any, 's')).toBeNull();
		});
	});

	describe('empty and whitespace strings', () => {
		it.each(['', '   ', '\t', '\n'])(`should return null for whitespace-only string %j`, (input) => {
			expect(timeValueParseDate(input, 's')).toBeNull();
		});
	});

	describe('ISO 8601 date strings', () => {
		it(`should parse '2024-01-15' to ms`, () => {
			const expected = Date.parse('2024-01-15');
			expect(timeValueParseDate('2024-01-15', 'ms')).toBe(expected);
		});

		it(`should parse '2024-01-15' converted to seconds`, () => {
			const ms = Date.parse('2024-01-15');
			expect(timeValueParseDate('2024-01-15', 's')).toBe(ms / 1000);
		});

		it(`should parse ISO with time and Z timezone`, () => {
			const expected = Date.parse('2024-01-15T12:00:00Z');
			expect(timeValueParseDate('2024-01-15T12:00:00Z', 'ms')).toBe(expected);
		});

		it(`should parse ISO with explicit offset`, () => {
			const expected = Date.parse('2024-01-15T12:00:00+05:00');
			expect(timeValueParseDate('2024-01-15T12:00:00+05:00', 'ms')).toBe(expected);
		});

		it(`should trim surrounding whitespace`, () => {
			const expected = Date.parse('2024-01-15');
			expect(timeValueParseDate('  2024-01-15  ', 'ms')).toBe(expected);
		});
	});

	describe('unparseable strings', () => {
		it.each([
			'not a date',
			'2024-99-99',
			'garbage',
			'xyz123'
		])(`should return null for unparseable string %j`, (input) => {
			expect(timeValueParseDate(input, 'ms')).toBeNull();
		});
	});

	describe('pre-epoch dates', () => {
		it(`should reject '1969-12-31' (negative timestamp)`, () => {
			expect(timeValueParseDate('1969-12-31', 'ms')).toBeNull();
		});

		it(`should reject '1900-01-01'`, () => {
			expect(timeValueParseDate('1900-01-01', 'ms')).toBeNull();
		});

		it(`should accept the epoch boundary '1970-01-01T00:00:00Z'`, () => {
			expect(timeValueParseDate('1970-01-01T00:00:00Z', 'ms')).toBe(0);
		});
	});

	describe('cross-unit conversion', () => {
		it(`should convert ms to seconds correctly`, () => {
			const ms = Date.parse('2024-01-15T00:00:00Z');
			expect(timeValueParseDate('2024-01-15T00:00:00Z', 's')).toBe(ms / 1000);
		});

		it(`should convert ms to minutes within library precision`, () => {
			const ms = Date.parse('2024-01-15T00:00:00Z');
			const result = timeValueParseDate('2024-01-15T00:00:00Z', 'm');
			expect(result).not.toBeNull();
			expect(result as number).toBeCloseTo(ms / 60000, 3);
		});
	});
});
