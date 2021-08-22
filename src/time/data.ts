import {StrongDouble, StrongType, makeDouble, makeStrong} from '@toreda/strong-types';

import {Time} from '../time';
import {TimeUnit} from './unit';
import {timeCheckType} from './check/type';
import {timeCheckValid} from './check/valid';
import {timeConvert} from './convert';
import {timeMake} from './make';

/**
 * Internal state data created and wrapped by Time instances.
 */
export class TimeData {
	public readonly units: StrongType<TimeUnit>;
	private readonly value: StrongDouble;

	constructor(units: TimeUnit, value: number) {
		this.units = makeStrong(units);
		this.value = makeDouble(0, value);
	}

	/**
	 * Get the current time value in instance's native time unit.
	 * @returns
	 */
	public get(): number {
		return this.value();
	}

	public set(caller: Time, input?: number | Time | null): Time {
		if (input === null || input === undefined) {
			return caller;
		}

		if (typeof input === 'number') {
			this.value(input);
			return caller;
		}

		if (!timeCheckValid(input)) {
			return caller;
		}

		const updated = timeConvert(input.units(), this.units(), input());
		this.value(updated);

		return caller;
	}

	public addNumber(caller: Time, input?: number | null): Time {
		if (typeof input !== 'number') {
			return caller;
		}

		const total = this.value() + input;
		this.set(caller, total);

		return caller;
	}

	public subNumber(caller: Time, value?: number | null): Time {
		if (typeof value !== 'number') {
			return caller;
		}

		return this.addNumber(caller, value * -1);
	}

	public subUnit(caller: Time, units: TimeUnit, value?: number | null, decimals?: number): Time {
		if (!units || typeof value !== 'number') {
			return caller;
		}

		const converted = timeConvert(units, this.units(), value, decimals);
		if (converted === null) {
			return caller;
		}

		return this.subNumber(caller, converted);
	}

	/**
	 * Convert value from provided unit type into object's native time units and
	 * add it to the current value.
	 * @param caller		Time instance calling this function to be returned by function.
	 * @param units			Time Unit of provided value.
	 * @param value			Value to be converted and added to current time.
	 * @param decimals		Number of decimals to include in final added value.
	 * @returns
	 */
	public addUnit(caller: Time, units: TimeUnit, value?: number | null, decimals?: number): Time {
		if (value === null || value === undefined) {
			return caller;
		}

		const converted = timeConvert(units, this.units(), value, decimals);
		if (converted === null) {
			return caller;
		}

		return this.addNumber(caller, converted);
	}

	public invert(caller: Time, posOnly?: boolean): Time {
		const value = this.get();
		// When posOnly flag is set only positive values
		// will be inverted.
		if (posOnly === true && value < 0) {
			return caller;
		}

		this.set(caller, value * -1);

		return caller;
	}

	public timeSinceTime(target: Time): Time | null {
		if (!timeCheckType(target)) {
			return null;
		}

		const since = timeConvert(target.units(), this.units(), target());
		if (since === null) {
			return null;
		}

		return this.timeSinceNumber(since);
	}

	public timeSinceNumber(target: number): Time | null {
		if (typeof target !== 'number') {
			return null;
		}

		if (target === 0) {
			return timeMake(this.units(), 0);
		}

		const result = this.value() - target;

		return timeMake(this.units(), result);
	}

	/**
	 * Get time object containing time left until target time. May return
	 * negative vamlue when target time is in the past. The returned time
	 * object's time left value uses the same time units as the calling instance.
	 * @param time
	 * @returns
	 */
	public timeUntilTime(time?: Time | null): Time | null {
		if (!timeCheckType(time)) {
			return null;
		}

		const target = timeConvert(time.units(), 's', time());
		if (target === null) {
			return null;
		}

		return this.timeUntilNumber(target);
	}

	/**
	 * Get time remaining until target unix timestamp.
	 * @param target
	 * @returns
	 */
	public timeUntilNumber(target?: number | null): Time | null {
		if (typeof target !== 'number') {
			return null;
		}

		if (target === 0) {
			return timeMake('s', 0);
		}

		const result = target - this.value();

		return timeMake(this.units(), result);
	}

	/**
	 * Reset internal state variables to their initial values.
	 * @param caller
	 * @returns
	 */
	public reset(caller: Time): Time {
		this.value.reset();

		return caller;
	}
}
