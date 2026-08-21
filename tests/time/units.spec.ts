import {timeUnits} from '../../src/time/units';

describe('timeUnits', () => {
	const canonical = ['us', 'ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y'] as const;

	it('should be a Set instance', () => {
		expect(timeUnits).toBeInstanceOf(Set);
	});

	it.each(canonical)(`should contain canonical unit '%s'`, (unit) => {
		expect(timeUnits.has(unit)).toBe(true);
	});

	it('should contain exactly the canonical units', () => {
		expect(timeUnits.size).toBe(canonical.length);
	});

	it(`should not contain alias 'day'`, () => {
		expect(timeUnits.has('day' as never)).toBe(false);
	});

	it(`should not contain alias 'sec'`, () => {
		expect(timeUnits.has('sec' as never)).toBe(false);
	});

	it(`should not contain a random string`, () => {
		expect(timeUnits.has('2222222' as never)).toBe(false);
	});
});
