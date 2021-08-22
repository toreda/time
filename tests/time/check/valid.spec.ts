import {timeCheckValid} from '../../../src/time/check/valid';
import {timeMake} from '../../../src/time/make';

const EMPTY_STRING = '';

describe('timeCheckValid', () => {
	it(`should return false when object arg is undefined`, () => {
		expect(timeCheckValid(undefined as any)).toBe(false);
	});

	it(`should return false when object arg is not null`, () => {
		expect(timeCheckValid(null)).toBe(false);
	});

	it(`should return false when object arg has no type property`, () => {
		const o = {
			until: jest.fn()
		};

		expect(timeCheckValid(o)).toBe(false);
	});

	it(`should return false when o.type is not 'Time'`, () => {
		const o = {
			until: jest.fn(),
			type: 'tiiiime'
		};

		expect(timeCheckValid(o)).toBe(false);
	});

	it(`should return false when o.type is lowercase 'time'`, () => {
		const o = {
			until: jest.fn(),
			type: 'time'
		};

		expect(timeCheckValid(o)).toBe(false);
	});

	it(`should return false when o.type is an empty string`, () => {
		const o = {
			until: jest.fn(),
			type: EMPTY_STRING
		};

		expect(timeCheckValid(o)).toBe(false);
	});

	it(`should return true when o.type is 'Time'`, () => {
		const o = timeMake('s', 0);
		expect(o.type).toBe('Time');
		expect(timeCheckValid(o)).toBe(true);
	});
});
