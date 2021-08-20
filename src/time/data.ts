import {StrongDouble, StrongType, makeDouble, makeStrong} from '@toreda/strong-types';
import {Time} from '../time';
import {timeConvert} from './convert';
import {timeMake} from './make';
import {TimeUnit} from './unit';

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

	public set(caller: Time, time: number | Time): Time {
		if (!time && time !== 0) {
			return caller;
		}

		if (typeof time === 'number') {
			this.value(time);
			return caller;
		}

		const units = time.units();
		const value = time();

		const updated = timeConvert(units, this.units(), value);
		this.value(updated);

		return caller;
	}

	public addNumber(caller: Time, value?: number | null): Time {
		if (typeof value !== 'number') {
			return caller;
		}

		const total = this.value() + value;
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
		if (!units || typeof value !== 'number') {
			return caller;
		}

		const converted = timeConvert(units, this.units(), value, decimals);
		if (converted === null) {
			return caller;
		}

		return this.addNumber(caller, converted);
	}

	public timeSinceTime(target: Time): Time | null {
		if (!target) {
			return null;
		}

		const seconds = timeConvert(target.units(), 's', target());
		if (seconds === null) {
			return null;
		}

		return this.timeSinceNumber(seconds);
	}

	public timeSinceNumber(target: number): Time | null {
		if (typeof target !== 'number') {
			return null;
		}

		if (target === 0) {
			return timeMake(this.units(), 0);
		}

		const curr = timeConvert(this.units(), 's', this.value());
		if (curr === null) {
			return null;
		}

		const secondsSince = curr - target;
		const result = timeConvert('s', this.units(), secondsSince);
		if (result === null) {
			return null;
		}

		return timeMake(this.units(), result);
	}

	/**
	 * Get time object containing time left until target time. May return
	 * negative vamlue when target time is in the past. The returned time
	 * object's time left value uses the same time units as the calling instance.
	 * @param targetTime
	 * @returns
	 */
	public timeUntilTime(targetTime: Time): Time | null {
		if (!targetTime) {
			return null;
		}

		const target = timeConvert(targetTime.units(), 's', targetTime());
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

		const curr = timeConvert(this.units(), 's', this.value());
		if (curr === null) {
			return null;
		}

		const dt = target - curr;

		const result = timeConvert('s', this.units(), dt);

		if (result === null) {
			return null;
		}

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
