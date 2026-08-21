import {timeUnitSupported} from '../../../src/time/unit/supported';

const EMPTY_STRING = '';
const canonicalUnits = ['us', 'ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y'];
const aliases = ['day', 'sec', 'minute', 'hour', 'week', 'month', 'year', 'wk', 'wks', 'hr'];

describe('timeUnitSupported', () => {
	it('should return false when unit arg is not provided', () => {
		expect(timeUnitSupported()).toBe(false);
	});

	it('should return false when unit arg is undefined', () => {
		expect(timeUnitSupported(undefined)).toBe(false);
	});

	it('should return false when unit arg is null', () => {
		expect(timeUnitSupported(null)).toBe(false);
	});

	it(`should return false when unit arg is an empty string`, () => {
		expect(timeUnitSupported(EMPTY_STRING)).toBe(false);
	});

	it(`should return false when unit arg is an unsupported string`, () => {
		expect(timeUnitSupported('aaaa')).toBe(false);
	});

	it(`should return false when unit arg is a number`, () => {
		expect(timeUnitSupported(42)).toBe(false);
	});

	it.each(canonicalUnits)(`should return true for canonical unit '%s'`, (unit) => {
		expect(timeUnitSupported(unit)).toBe(true);
	});

	it.each(aliases)(`should return false for alias '%s' (use timeUnitFromAlias)`, (alias) => {
		expect(timeUnitSupported(alias)).toBe(false);
	});
});
