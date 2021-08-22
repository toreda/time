import {timeCheckType} from '../../../src/time/check/type';
import {timeMake} from '../../../src/time/make';

const EMPTY_ARRAY = [];
const MOCK_OBJECT_NO_TYPE = {
	aaa: 10381038,
	turtle: 'box',
	children: [{something: 'here'}]
};

const MOCK_OBJECT_BAD_TYPE = {
	a97141: 'aaaaaa',
	bbb941: 141976141,
	children: ['aa90714917a'],
	type: 'NotTime'
};
const EMPTY_OBJECT = [];
const MOCK_TIME_BAD_CASING = {
	type: 'time'
};

const MOCK_TIME = timeMake('s', 0);

describe('timeCheckType', () => {
	it(`should return false when o arg is undefined`, () => {
		expect(timeCheckType(undefined)).toBe(false);
	});

	it(`should return false when o arg is null`, () => {
		expect(timeCheckType(null)).toBe(false);
	});

	it(`should return false when o arg is a number`, () => {
		expect(timeCheckType(11241)).toBe(false);
	});

	it(`should return false when o arg is a string`, () => {
		expect(timeCheckType('stormwind brie')).toBe(false);
	});

	it(`should return false when o arg is an empty object`, () => {
		expect(timeCheckType(EMPTY_OBJECT)).toBe(false);
	});

	it(`should return false when o arg is an empty array`, () => {
		expect(timeCheckType(EMPTY_OBJECT)).toBe(false);
	});

	it(`should return false when o arg is a boolean (true)`, () => {
		expect(timeCheckType(true)).toBe(false);
	});

	it(`should return false when o arg is a boolean (false)`, () => {
		expect(timeCheckType(false)).toBe(false);
	});

	it(`should return false when o arg is an object with no type property`, () => {
		expect(timeCheckType(MOCK_OBJECT_NO_TYPE)).toBe(false);
	});

	it(`should return false when type is not 'Time'`, () => {
		expect(timeCheckType(MOCK_OBJECT_BAD_TYPE)).toBe(false);
	});

	it(`should return false when type is 'time'`, () => {
		expect(timeCheckType(MOCK_TIME_BAD_CASING)).toBe(false);
	});

	it(`should return true when type is 'Time'`, () => {
		expect(timeCheckType(MOCK_TIME)).toBe(true);
	});
});
