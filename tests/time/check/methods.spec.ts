import {Time} from '../../../src/time';
import {timeCheckMethods} from '../../../src/time/check/methods';
import {timeMake} from '../../../src/time/make';
import {timeMethods} from '../../../src/time/methods';

describe('timeCheckMethods', () => {

	let mockTime: Time;

	beforeAll(() => {
		mockTime = timeMake('s', 0);
	});

	beforeEach(() => {
		for (const timeMethod of timeMethods) {
			mockTime[timeMethod] = jest.fn();
		}
	});

	it(`should return false when o arg is not provided`, () => {
		expect(timeCheckMethods()).toBe(false);
	});

	it(`should return false when o arg is undefined`, () => {
		expect(timeCheckMethods(undefined)).toBe(false);
	});

	it(`should return false when o arg is null`, () => {
		expect(timeCheckMethods(null)).toBe(false);
	});

	for (const timeMethod of timeMethods) {
		it(`should return false when o.${timeMethod} is undefined`, () => {
			mockTime[timeMethod] = undefined;
			expect(timeCheckMethods(mockTime)).toBe(false);
		});

		it(`should return false when o.${timeMethod} is null`, () => {
			mockTime[timeMethod] = null;
			expect(timeCheckMethods(mockTime)).toBe(false);
		});

		it(`should return false when o.${timeMethod} is not a function`, () => {
			mockTime[timeMethod] = 'aaaaa';
			expect(timeCheckMethods(mockTime)).toBe(false);
		});
	}

	it(`should return true when all expected methods are present`, () => {
		expect(timeCheckMethods(mockTime)).toBe(true);
	});
});
