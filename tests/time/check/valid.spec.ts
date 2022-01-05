import {timeMake} from '../../../src/time/make';
import {timeValid} from '../../../src/time/valid';

const EMPTY_STRING = '';

describe('timeValid', () => {
	it(`should return false when object arg is undefined`, () => {
		expect(timeValid(undefined as any)).toBe(false);
	});

	it(`should return false when object arg is not null`, () => {
		expect(timeValid(null)).toBe(false);
	});

	it(`should return false when object arg has no type property`, () => {
		const o = {
			until: jest.fn()
		};

		expect(timeValid(o)).toBe(false);
	});

	it(`should return false when o.type is not 'Time'`, () => {
		const o = {
			until: jest.fn(),
			type: 'tiiiime'
		};

		expect(timeValid(o)).toBe(false);
	});

	it(`should return false when o.type is lowercase 'time'`, () => {
		const o = {
			until: jest.fn(),
			type: 'time'
		};

		expect(timeValid(o)).toBe(false);
	});

	it(`should return false when o.type is an empty string`, () => {
		const o = {
			until: jest.fn(),
			type: EMPTY_STRING
		};

		expect(timeValid(o)).toBe(false);
	});

	it(`should return true when o.type is 'Time'`, () => {
		const o = timeMake('s', 0);
		expect(o.type).toBe('Time');
		expect(timeValid(o)).toBe(true);
	});

	it(`should return false when o does not implement all required time methods`, () => {
		const o = timeMake('s', 0);
		o['addDays'] = undefined as any;

		expect(timeValid(o)).toBe(false);
	});
});
