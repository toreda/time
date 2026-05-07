import {Defaults} from '../../src/defaults';
import {TimeUtils} from '../../src/time/utils';

const MOCK_FROM = 's';
const MOCK_TO = 'ms';

describe('TimeUtils', () => {
	describe('canConvert', () => {
		it(`should return false when value is undefined`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, undefined as any)).toBe(false);
		});

		it(`should return false when value is null`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, null as any)).toBe(false);
		});

		it(`should return false when value is a truthy non-number`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, 'aaaa' as any)).toBe(false);
		});

		it(`should return false when value is NaN`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, NaN)).toBe(false);
		});

		it(`should return false when value exceeds max safe int`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, Number.MAX_SAFE_INTEGER + 111)).toBe(false);
		});

		it(`should return false when value is smaller than min safe int`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, Number.MIN_SAFE_INTEGER - 100)).toBe(false);
		});

		it(`should return false when value is not finite`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, Number.POSITIVE_INFINITY)).toBe(false);
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, Number.NEGATIVE_INFINITY)).toBe(false);
		});

		it(`should return false when 'from' is not a supported unit`, () => {
			expect(TimeUtils.canConvert('zz' as any, MOCK_TO, 1)).toBe(false);
		});

		it(`should return false when 'to' is not a supported unit`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, 'zz' as any, 1)).toBe(false);
		});

		it(`should return true for a supported unit pair and a finite in-range value`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, 1)).toBe(true);
		});

		it(`should return true at Number.MAX_SAFE_INTEGER`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, Number.MAX_SAFE_INTEGER)).toBe(true);
		});

		it(`should return true at Number.MIN_SAFE_INTEGER`, () => {
			expect(TimeUtils.canConvert(MOCK_FROM, MOCK_TO, Number.MIN_SAFE_INTEGER)).toBe(true);
		});
	});

	describe('withinSafeRange', () => {
		it('should return true for 0', () => {
			expect(TimeUtils.withinSafeRange(0)).toBe(true);
		});

		it('should return true for a small positive integer', () => {
			expect(TimeUtils.withinSafeRange(1)).toBe(true);
		});

		it('should return true for a small negative integer', () => {
			expect(TimeUtils.withinSafeRange(-1)).toBe(true);
		});

		it('should return true for Number.MAX_SAFE_INTEGER', () => {
			expect(TimeUtils.withinSafeRange(Number.MAX_SAFE_INTEGER)).toBe(true);
		});

		it('should return true for Number.MIN_SAFE_INTEGER', () => {
			expect(TimeUtils.withinSafeRange(Number.MIN_SAFE_INTEGER)).toBe(true);
		});

		it('should return false for Number.MAX_SAFE_INTEGER + 1', () => {
			expect(TimeUtils.withinSafeRange(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
		});

		it('should return false for Number.MIN_SAFE_INTEGER - 1', () => {
			expect(TimeUtils.withinSafeRange(Number.MIN_SAFE_INTEGER - 1)).toBe(false);
		});

		it('should return false for Number.POSITIVE_INFINITY', () => {
			expect(TimeUtils.withinSafeRange(Number.POSITIVE_INFINITY)).toBe(false);
		});

		it('should return false for Number.NEGATIVE_INFINITY', () => {
			expect(TimeUtils.withinSafeRange(Number.NEGATIVE_INFINITY)).toBe(false);
		});

		it('should return false for NaN', () => {
			expect(TimeUtils.withinSafeRange(NaN)).toBe(false);
		});

		it('should return true for a fractional value within range', () => {
			expect(TimeUtils.withinSafeRange(3.14159)).toBe(true);
		});

		it('should return true for a negative fractional value within range', () => {
			expect(TimeUtils.withinSafeRange(-3.14159)).toBe(true);
		});
	});

	describe('resolveDecimals', () => {
		const DEFAULT = Defaults.Math.Precision.Base;

		it('should return the default when decimals is undefined', () => {
			expect(TimeUtils.resolveDecimals(undefined)).toBe(DEFAULT);
		});

		it('should return the default when decimals is not a number', () => {
			expect(TimeUtils.resolveDecimals('5' as unknown as number)).toBe(DEFAULT);
		});

		it('should return the default when decimals is NaN', () => {
			expect(TimeUtils.resolveDecimals(NaN)).toBe(DEFAULT);
		});

		it('should return the default when decimals is Infinity', () => {
			expect(TimeUtils.resolveDecimals(Number.POSITIVE_INFINITY)).toBe(DEFAULT);
		});

		it('should return the default when decimals is -Infinity', () => {
			expect(TimeUtils.resolveDecimals(Number.NEGATIVE_INFINITY)).toBe(DEFAULT);
		});

		it('should return the default when decimals is below 0', () => {
			expect(TimeUtils.resolveDecimals(-1)).toBe(DEFAULT);
		});

		it('should return the default when decimals is above 100', () => {
			expect(TimeUtils.resolveDecimals(101)).toBe(DEFAULT);
		});

		it('should return 0 when decimals is 0', () => {
			expect(TimeUtils.resolveDecimals(0)).toBe(0);
		});

		it('should return 100 when decimals is 100', () => {
			expect(TimeUtils.resolveDecimals(100)).toBe(100);
		});

		it('should return the integer value when decimals is a positive integer in range', () => {
			expect(TimeUtils.resolveDecimals(5)).toBe(5);
		});

		it('should floor a fractional decimals value', () => {
			expect(TimeUtils.resolveDecimals(3.7)).toBe(3);
		});

		it('should floor 0.999 to 0', () => {
			expect(TimeUtils.resolveDecimals(0.999)).toBe(0);
		});
	});

	describe('roundToDecimals', () => {
		it('should round to 0 decimal places', () => {
			expect(TimeUtils.roundToDecimals(1.5, 0)).toBe(2);
		});

		it('should round to 2 decimal places', () => {
			expect(TimeUtils.roundToDecimals(1.234, 2)).toBe(1.23);
		});

		it('should round to 4 decimal places', () => {
			expect(TimeUtils.roundToDecimals(3.14159265, 4)).toBe(3.1416);
		});

		it('should leave an integer unchanged when rounding to 0 decimals', () => {
			expect(TimeUtils.roundToDecimals(42, 0)).toBe(42);
		});

		it('should leave an integer unchanged when rounding to many decimals', () => {
			expect(TimeUtils.roundToDecimals(42, 10)).toBe(42);
		});

		it('should round 0 to 0', () => {
			expect(TimeUtils.roundToDecimals(0, 5)).toBe(0);
		});

		it('should round a negative number', () => {
			expect(TimeUtils.roundToDecimals(-1.234, 2)).toBe(-1.23);
		});

		it('should return 0 when a tiny value is rounded to too few decimals', () => {
			expect(TimeUtils.roundToDecimals(0.0001, 2)).toBe(0);
		});

		it('should preserve a tiny value when rounding to enough decimals', () => {
			expect(TimeUtils.roundToDecimals(0.0001, 4)).toBe(0.0001);
		});
	});
});
