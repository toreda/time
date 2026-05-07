import {Defaults} from '../../src/defaults';
import {TimeUnits} from '../../src/time/utils';

const MOCK_FROM = 's';
const MOCK_TO = 'ms';

describe('TimeUnits', () => {
	describe('canConvert', () => {
		it(`should return false when value is undefined`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, undefined as any)).toBe(false);
		});

		it(`should return false when value is null`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, null as any)).toBe(false);
		});

		it(`should return false when value is a truthy non-number`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, 'aaaa' as any)).toBe(false);
		});

		it(`should return false when value is NaN`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, NaN)).toBe(false);
		});

		it(`should return false when value exceeds max safe int`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, Number.MAX_SAFE_INTEGER + 111)).toBe(false);
		});

		it(`should return false when value is smaller than min safe int`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, Number.MIN_SAFE_INTEGER - 100)).toBe(false);
		});

		it(`should return false when value is not finite`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, Number.POSITIVE_INFINITY)).toBe(false);
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, Number.NEGATIVE_INFINITY)).toBe(false);
		});

		it(`should return false when 'from' is not a supported unit`, () => {
			expect(TimeUnits.canConvert('zz' as any, MOCK_TO, 1)).toBe(false);
		});

		it(`should return false when 'to' is not a supported unit`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, 'zz' as any, 1)).toBe(false);
		});

		it(`should return true for a supported unit pair and a finite in-range value`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, 1)).toBe(true);
		});

		it(`should return true at Number.MAX_SAFE_INTEGER`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, Number.MAX_SAFE_INTEGER)).toBe(true);
		});

		it(`should return true at Number.MIN_SAFE_INTEGER`, () => {
			expect(TimeUnits.canConvert(MOCK_FROM, MOCK_TO, Number.MIN_SAFE_INTEGER)).toBe(true);
		});
	});

	describe('withinSafeRange', () => {
		it('should return true for 0', () => {
			expect(TimeUnits.withinSafeRange(0)).toBe(true);
		});

		it('should return true for a small positive integer', () => {
			expect(TimeUnits.withinSafeRange(1)).toBe(true);
		});

		it('should return true for a small negative integer', () => {
			expect(TimeUnits.withinSafeRange(-1)).toBe(true);
		});

		it('should return true for Number.MAX_SAFE_INTEGER', () => {
			expect(TimeUnits.withinSafeRange(Number.MAX_SAFE_INTEGER)).toBe(true);
		});

		it('should return true for Number.MIN_SAFE_INTEGER', () => {
			expect(TimeUnits.withinSafeRange(Number.MIN_SAFE_INTEGER)).toBe(true);
		});

		it('should return false for Number.MAX_SAFE_INTEGER + 1', () => {
			expect(TimeUnits.withinSafeRange(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
		});

		it('should return false for Number.MIN_SAFE_INTEGER - 1', () => {
			expect(TimeUnits.withinSafeRange(Number.MIN_SAFE_INTEGER - 1)).toBe(false);
		});

		it('should return false for Number.POSITIVE_INFINITY', () => {
			expect(TimeUnits.withinSafeRange(Number.POSITIVE_INFINITY)).toBe(false);
		});

		it('should return false for Number.NEGATIVE_INFINITY', () => {
			expect(TimeUnits.withinSafeRange(Number.NEGATIVE_INFINITY)).toBe(false);
		});

		it('should return false for NaN', () => {
			expect(TimeUnits.withinSafeRange(NaN)).toBe(false);
		});

		it('should return true for a fractional value within range', () => {
			expect(TimeUnits.withinSafeRange(3.14159)).toBe(true);
		});

		it('should return true for a negative fractional value within range', () => {
			expect(TimeUnits.withinSafeRange(-3.14159)).toBe(true);
		});
	});

	describe('resolveDecimals', () => {
		const DEFAULT = Defaults.Math.Precision.Base;

		it('should return the default when decimals is undefined', () => {
			expect(TimeUnits.resolveDecimals(undefined)).toBe(DEFAULT);
		});

		it('should return the default when decimals is not a number', () => {
			expect(TimeUnits.resolveDecimals('5' as unknown as number)).toBe(DEFAULT);
		});

		it('should return the default when decimals is NaN', () => {
			expect(TimeUnits.resolveDecimals(NaN)).toBe(DEFAULT);
		});

		it('should return the default when decimals is Infinity', () => {
			expect(TimeUnits.resolveDecimals(Number.POSITIVE_INFINITY)).toBe(DEFAULT);
		});

		it('should return the default when decimals is -Infinity', () => {
			expect(TimeUnits.resolveDecimals(Number.NEGATIVE_INFINITY)).toBe(DEFAULT);
		});

		it('should return the default when decimals is below 0', () => {
			expect(TimeUnits.resolveDecimals(-1)).toBe(DEFAULT);
		});

		it('should return the default when decimals is above 100', () => {
			expect(TimeUnits.resolveDecimals(101)).toBe(DEFAULT);
		});

		it('should return 0 when decimals is 0', () => {
			expect(TimeUnits.resolveDecimals(0)).toBe(0);
		});

		it('should return 100 when decimals is 100', () => {
			expect(TimeUnits.resolveDecimals(100)).toBe(100);
		});

		it('should return the integer value when decimals is a positive integer in range', () => {
			expect(TimeUnits.resolveDecimals(5)).toBe(5);
		});

		it('should floor a fractional decimals value', () => {
			expect(TimeUnits.resolveDecimals(3.7)).toBe(3);
		});

		it('should floor 0.999 to 0', () => {
			expect(TimeUnits.resolveDecimals(0.999)).toBe(0);
		});
	});

	describe('roundToDecimals', () => {
		it('should round to 0 decimal places', () => {
			expect(TimeUnits.roundToDecimals(1.5, 0)).toBe(2);
		});

		it('should round to 2 decimal places', () => {
			expect(TimeUnits.roundToDecimals(1.234, 2)).toBe(1.23);
		});

		it('should round to 4 decimal places', () => {
			expect(TimeUnits.roundToDecimals(3.14159265, 4)).toBe(3.1416);
		});

		it('should leave an integer unchanged when rounding to 0 decimals', () => {
			expect(TimeUnits.roundToDecimals(42, 0)).toBe(42);
		});

		it('should leave an integer unchanged when rounding to many decimals', () => {
			expect(TimeUnits.roundToDecimals(42, 10)).toBe(42);
		});

		it('should round 0 to 0', () => {
			expect(TimeUnits.roundToDecimals(0, 5)).toBe(0);
		});

		it('should round a negative number', () => {
			expect(TimeUnits.roundToDecimals(-1.234, 2)).toBe(-1.23);
		});

		it('should return 0 when a tiny value is rounded to too few decimals', () => {
			expect(TimeUnits.roundToDecimals(0.0001, 2)).toBe(0);
		});

		it('should preserve a tiny value when rounding to enough decimals', () => {
			expect(TimeUnits.roundToDecimals(0.0001, 4)).toBe(0.0001);
		});
	});
});
