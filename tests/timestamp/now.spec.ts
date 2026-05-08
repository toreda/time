import MockDate from 'mockdate';
import {unixTimestampNow} from '../../src/unix/timestamp/now';

const FIXED_DATE = '02/01/1970';
const SECONDS_PER_DAY = 86400;
const EXPECTED_DAYS = 31;

describe('unixTimestampNow', () => {
	beforeEach(() => {
		MockDate.set(FIXED_DATE);
	});

	afterEach(() => {
		MockDate.reset();
	});

	describe('without offset', () => {
		it(`should return the current time in seconds when offset arg is not set`, () => {
			const now = unixTimestampNow();
			expect(Math.floor(now / SECONDS_PER_DAY)).toBe(EXPECTED_DAYS);
		});

		it(`should return current time in seconds without adding offset when offset arg is null`, () => {
			const now = unixTimestampNow(null);
			expect(Math.floor(now / SECONDS_PER_DAY)).toBe(EXPECTED_DAYS);
		});

		it(`should return current time in seconds when offset arg is undefined`, () => {
			const now = unixTimestampNow(undefined);
			expect(Math.floor(now / SECONDS_PER_DAY)).toBe(EXPECTED_DAYS);
		});
	});

	describe('with finite numeric offset', () => {
		it(`should add offset when the offset arg is a positive number`, () => {
			const now = unixTimestampNow(SECONDS_PER_DAY);
			expect(Math.floor(now / SECONDS_PER_DAY)).toBe(EXPECTED_DAYS + 1);
		});

		it(`should subtract offset when the offset arg is a negative number`, () => {
			const now = unixTimestampNow(-SECONDS_PER_DAY);
			expect(Math.floor(now / SECONDS_PER_DAY)).toBe(EXPECTED_DAYS - 1);
		});

		it(`should treat 0 as a no-op offset`, () => {
			const baseline = unixTimestampNow();
			expect(unixTimestampNow(0)).toBe(baseline);
		});

		it(`should add fractional offset as-is`, () => {
			const baseline = unixTimestampNow();
			expect(unixTimestampNow(0.5)).toBe(baseline + 0.5);
		});
	});

	describe('with non-finite numeric offset', () => {
		it(`should ignore NaN offset`, () => {
			const baseline = unixTimestampNow();
			expect(unixTimestampNow(NaN)).toBe(baseline);
		});

		it(`should ignore Infinity offset`, () => {
			const baseline = unixTimestampNow();
			expect(unixTimestampNow(Infinity)).toBe(baseline);
		});

		it(`should ignore -Infinity offset`, () => {
			const baseline = unixTimestampNow();
			expect(unixTimestampNow(-Infinity)).toBe(baseline);
		});
	});

	describe('with non-numeric offset', () => {
		it(`should ignore string offset`, () => {
			const result = unixTimestampNow('aaaaa' as any);
			expect(Math.floor(result / SECONDS_PER_DAY)).toBe(EXPECTED_DAYS);
		});

		it(`should ignore boolean offset`, () => {
			const baseline = unixTimestampNow();
			expect(unixTimestampNow(true as any)).toBe(baseline);
			expect(unixTimestampNow(false as any)).toBe(baseline);
		});

		it(`should ignore object offset`, () => {
			const baseline = unixTimestampNow();
			expect(unixTimestampNow({} as any)).toBe(baseline);
		});

		it(`should ignore array offset`, () => {
			const baseline = unixTimestampNow();
			expect(unixTimestampNow([] as any)).toBe(baseline);
		});
	});

	describe('return type', () => {
		it(`should always return a finite number`, () => {
			expect(Number.isFinite(unixTimestampNow())).toBe(true);
			expect(Number.isFinite(unixTimestampNow(NaN))).toBe(true);
			expect(Number.isFinite(unixTimestampNow(Infinity))).toBe(true);
			expect(Number.isFinite(unixTimestampNow(42))).toBe(true);
		});

		it(`should return integer seconds when offset is omitted`, () => {
			const result = unixTimestampNow();
			expect(Number.isInteger(result)).toBe(true);
		});
	});
});
