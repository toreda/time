import {timeFromDate} from '../../../src/time/from/date';

describe('timeFromDate', () => {
	it(`should create a Time from an ISO date string in default seconds`, () => {
		const expected = Date.parse('2024-01-15T00:00:00Z') / 1000;
		const instance = timeFromDate('2024-01-15T00:00:00Z');
		expect(instance.units()).toBe('s');
		expect(instance()).toBe(expected);
	});

	it(`should create a Time in milliseconds`, () => {
		const expected = Date.parse('2024-01-15T00:00:00Z');
		const instance = timeFromDate('2024-01-15T00:00:00Z', 'ms');
		expect(instance.units()).toBe('ms');
		expect(instance()).toBe(expected);
	});

	it(`should accept a numeric timestamp already in target units`, () => {
		const instance = timeFromDate(1705276800, 's');
		expect(instance()).toBe(1705276800);
	});

	it(`should fall back to 0 for an unparseable string`, () => {
		const instance = timeFromDate('garbage', 's');
		expect(instance()).toBe(0);
	});

	it(`should fall back to 0 for a pre-epoch date`, () => {
		const instance = timeFromDate('1969-01-01', 's');
		expect(instance()).toBe(0);
	});

	it(`should fall back to 0 for a negative number`, () => {
		const instance = timeFromDate(-1, 's');
		expect(instance()).toBe(0);
	});
});
