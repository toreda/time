import {timeValueParse} from '../../../src/time/value/parse';

describe('timeValueParse', () => {
	describe('number input', () => {
		it(`should return a finite positive number unchanged`, () => {
			expect(timeValueParse(42, 's')).toBe(42);
		});

		it(`should return a finite negative number unchanged`, () => {
			expect(timeValueParse(-42, 's')).toBe(-42);
		});

		it(`should return zero unchanged`, () => {
			expect(timeValueParse(0, 's')).toBe(0);
		});

		it(`should return a fractional number unchanged`, () => {
			expect(timeValueParse(1.5, 's')).toBe(1.5);
		});

		it(`should return null for NaN`, () => {
			expect(timeValueParse(NaN, 's')).toBeNull();
		});

		it(`should return null for Infinity`, () => {
			expect(timeValueParse(Infinity, 's')).toBeNull();
		});

		it(`should return null for -Infinity`, () => {
			expect(timeValueParse(-Infinity, 's')).toBeNull();
		});

		it(`should return null for values above MAX_SAFE_INTEGER`, () => {
			expect(timeValueParse(Number.MAX_SAFE_INTEGER + 1, 's')).toBeNull();
		});

		it(`should return null for values below MIN_SAFE_INTEGER`, () => {
			expect(timeValueParse(Number.MIN_SAFE_INTEGER - 1, 's')).toBeNull();
		});
	});

	describe('non-string non-number input', () => {
		it.each([
			['null', null],
			['undefined', undefined],
			['boolean true', true],
			['boolean false', false],
			['object', {}],
			['array', []]
		])(`should return null for %s`, (_label, value) => {
			expect(timeValueParse(value as any, 's')).toBeNull();
		});
	});

	describe('empty and whitespace strings', () => {
		it.each(['', '   ', '\t', '\n', ' \t\n '])(`should return null for whitespace-only string %j`, (input) => {
			expect(timeValueParse(input, 's')).toBeNull();
		});
	});

	describe('pure numeric string', () => {
		it(`should parse positive integer string in target units`, () => {
			expect(timeValueParse('5', 'm')).toBe(5);
		});

		it(`should parse negative integer string`, () => {
			expect(timeValueParse('-5', 'm')).toBe(-5);
		});

		it(`should parse leading-plus integer string`, () => {
			expect(timeValueParse('+5', 'm')).toBe(5);
		});

		it(`should parse decimal string`, () => {
			expect(timeValueParse('1.5', 'h')).toBe(1.5);
		});

		it(`should parse negative decimal string`, () => {
			expect(timeValueParse('-1.5', 'h')).toBe(-1.5);
		});

		it(`should trim surrounding whitespace before parsing numeric string`, () => {
			expect(timeValueParse('  5  ', 'm')).toBe(5);
		});

		it(`should treat '2024' as a duration in target units, not a year`, () => {
			expect(timeValueParse('2024', 'y')).toBe(2024);
		});

		it(`should reject pure-numeric outside safe integer range`, () => {
			const tooBig = `${Number.MAX_SAFE_INTEGER}0`;
			expect(timeValueParse(tooBig, 's')).toBeNull();
		});
	});

	describe('simple suffix form', () => {
		it.each([
			['5y', 'y', 5],
			['5mo', 'mo', 5],
			['5w', 'w', 5],
			['5d', 'd', 5],
			['5h', 'h', 5],
			['5m', 'm', 5],
			['5s', 's', 5],
			['5ms', 'ms', 5],
			['5us', 'us', 5]
		] as const)(`should parse %s as 5 in target units when target matches`, (input, units, expected) => {
			expect(timeValueParse(input, units)).toBe(expected);
		});

		it(`should convert simple form across units (1h -> 60 minutes)`, () => {
			expect(timeValueParse('1h', 'm')).toBe(60);
		});

		it(`should convert simple form across units (1h -> 3600 seconds)`, () => {
			expect(timeValueParse('1h', 's')).toBe(3600);
		});

		it(`should parse decimal suffix form`, () => {
			expect(timeValueParse('1.5h', 'm')).toBe(90);
		});

		it(`should parse leading-minus simple form`, () => {
			expect(timeValueParse('-5m', 'm')).toBe(-5);
		});

		it(`should parse leading-plus simple form`, () => {
			expect(timeValueParse('+5m', 'm')).toBe(5);
		});

		it(`should reject suffix without a number`, () => {
			expect(timeValueParse('h', 'h')).toBeNull();
		});

		it(`should reject number followed by an unknown suffix`, () => {
			expect(timeValueParse('5xyz', 's')).toBeNull();
		});
	});

	describe('compound suffix form', () => {
		it(`should sum '1h30m' to 90 minutes`, () => {
			expect(timeValueParse('1h30m', 'm')).toBe(90);
		});

		it(`should sum '2d4h' to 52 hours`, () => {
			expect(timeValueParse('2d4h', 'h')).toBe(52);
		});

		it(`should sum '1h30m45s' to 5445 seconds`, () => {
			expect(timeValueParse('1h30m45s', 's')).toBe(5445);
		});

		it(`should accept fractional component in compound form`, () => {
			expect(timeValueParse('1.5h30m', 'm')).toBe(120);
		});

		it(`should apply leading-minus to the whole compound expression`, () => {
			expect(timeValueParse('-1h30m', 'm')).toBe(-90);
		});

		it(`should apply leading-plus to the whole compound expression`, () => {
			expect(timeValueParse('+1h30m', 'm')).toBe(90);
		});
	});

	describe('sign-only and overflow', () => {
		it(`should return null for sign-only input '-'`, () => {
			expect(timeValueParse('-', 's')).toBeNull();
		});

		it(`should return null for sign-only input '+'`, () => {
			expect(timeValueParse('+', 's')).toBeNull();
		});

		it(`should return null when a single component overflows during conversion`, () => {
			// 1e15 years to microseconds is far outside safe-integer range
			expect(timeValueParse('1000000000000000y', 'us')).toBeNull();
		});

		it(`should return null when summed components exceed safe range`, () => {
			// Each component fits but the sum to us blows past MAX_SAFE_INTEGER
			expect(timeValueParse('1000000y1000000mo', 'us')).toBeNull();
		});
	});

	describe('compound rejections', () => {
		it(`should reject components in ascending order ('30m1h')`, () => {
			expect(timeValueParse('30m1h', 'm')).toBeNull();
		});

		it(`should reject repeated unit ('1h1h')`, () => {
			expect(timeValueParse('1h1h', 'm')).toBeNull();
		});

		it(`should reject internal whitespace ('1h 30m')`, () => {
			expect(timeValueParse('1h 30m', 'm')).toBeNull();
		});

		it(`should reject per-component sign ('1h-30m')`, () => {
			expect(timeValueParse('1h-30m', 'm')).toBeNull();
		});

		it(`should reject per-component plus sign ('1h+30m')`, () => {
			expect(timeValueParse('1h+30m', 'm')).toBeNull();
		});

		it(`should reject equal-rank repeat ('1mo1mo')`, () => {
			expect(timeValueParse('1mo1mo', 'mo')).toBeNull();
		});

		it(`should reject same-rank components in different order`, () => {
			// w (rank 2) before mo (rank 1) - descending broken
			expect(timeValueParse('1w1mo', 'd')).toBeNull();
		});

		it(`should reject trailing garbage`, () => {
			expect(timeValueParse('1h30mx', 'm')).toBeNull();
		});

		it(`should reject leading garbage`, () => {
			expect(timeValueParse('x1h30m', 'm')).toBeNull();
		});

		it(`should reject ambiguous suffix that doesn't match any known unit ('5min')`, () => {
			expect(timeValueParse('5min', 'm')).toBeNull();
		});

		it(`should reject alias 'sec'`, () => {
			expect(timeValueParse('5sec', 's')).toBeNull();
		});

		it(`should reject alias 'hr'`, () => {
			expect(timeValueParse('5hr', 'h')).toBeNull();
		});
	});

	describe('date-like strings rejected (use timeValueParseDate)', () => {
		it.each([
			'2024-01-15',
			'2024/01/15',
			'2024-01-15T12:00:00Z',
			'12:00:00',
			'2024-01-15 12:00'
		])(`should return null for date-like string %j`, (input) => {
			expect(timeValueParse(input, 's')).toBeNull();
		});
	});

	describe('unit ordering across the full canonical set', () => {
		it(`should accept full canonical descending sequence`, () => {
			// 1y 1mo 1w 1d 1h 1m 1s 1ms 1us - all distinct, descending
			const result = timeValueParse('1y1mo1w1d1h1m1s1ms1us', 'us');
			expect(result).not.toBeNull();
			expect(typeof result).toBe('number');
		});

		it(`should reject any out-of-order pair across canonical units`, () => {
			expect(timeValueParse('1s1h', 's')).toBeNull();
			expect(timeValueParse('1ms1s', 'ms')).toBeNull();
			expect(timeValueParse('1d1y', 'd')).toBeNull();
		});
	});
});
