import {timeUnitSupported} from '../../../src/time/unit/supported';

const EMPTY_STRING = '';
const supportedUnits = [{unit: 'w', label: 'week', inputs: ['w', 'wk', 'wks', 'week', 'weeks']}];

describe('timeUnitSupported', () => {
	it('should return false when unit arg is not provided', () => {
		expect(timeUnitSupported()).toBe(false);
	});

	it('should return false when unit arg is undefined', () => {
		expect(timeUnitSupported(undefined)).toBe(false);
	});

	it('should return false when unit arg is null', () => {
		expect(timeUnitSupported(null as any)).toBe(false);
	});

	it(`should return false when unit arg is an empty string`, () => {
		expect(timeUnitSupported(EMPTY_STRING as any)).toBe(false);
	});

	it(`should return false when unit arg is an unsupported time unit`, () => {
		expect(timeUnitSupported('aaaa' as any)).toBe(false);
	});

	for (const unit of supportedUnits) {
		for (const input of unit.inputs) {
			it(`should support ${unit.label} alias '${input}'`, () => {
				expect(timeUnitSupported(input as any)).toBe(true);
			});
		}
	}
});
