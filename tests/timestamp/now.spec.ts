import MockDate from 'mockdate';
import {unixTimestampNow} from '../../src/unix/timestamp/now';

describe('unixTimestampNow', () => {
	it(`should return the the current time in seconds when offset arg is not set`, () => {
		MockDate.set('02/01/1970');
		const now = unixTimestampNow();
		expect(Math.floor(now / 86400)).toBe(31);

		MockDate.reset();
	});

	it(`should return current time in seconds without adding offset when offset arg is null`, () => {
		MockDate.set('02/01/1970');
		const now = unixTimestampNow(null);
		expect(Math.floor(now / 86400)).toBe(31);

		MockDate.reset();
	});

	it(`should add offset when the offset arg is a positive number`, () => {
		MockDate.set('02/01/1970');
		const offset = 86400;
		const now = unixTimestampNow(offset);
		const result = Math.floor(now / 86400);
		expect(result).toBe(32);

		MockDate.reset();
	});

	it(`should subtract offset when the offset arg is a negative number`, () => {
		MockDate.set('02/01/1970');
		const offset = -86400;
		const now = unixTimestampNow(offset);
		const result = Math.floor(now / 86400);
		expect(result).toBe(30);

		MockDate.reset();
	});

	it(`should not use offset value when offset arg is a truthy non-number`, () => {
		MockDate.set('02/01/1970');
		const offset = 'aaaaa';
		const now = unixTimestampNow(offset as any);
		const result = Math.floor(now / 86400);
		expect(result).toBe(31);

		MockDate.reset();
	});
});
