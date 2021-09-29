import {Log} from '@toreda/log';
import {Float, StrongType, floatMake, typeMatch, strongMake} from '@toreda/strong-types';

import {Time} from '../time';
import {timeCheckType} from './check/type';
import {timeCheckValid} from './check/valid';
import {timeConvert} from './convert';
import {timeMake} from './make';
import {TimeUnit} from './unit';

/**
 * Internal state data created and wrapped by Time instances.
 */
export class TimeData {
	public readonly units: StrongType<TimeUnit>;
	private readonly value: Float;
	public readonly log: Log;

	constructor(units: TimeUnit, value: number, log?: Log) {
		this.units = strongMake(units);
		this.value = floatMake(0, value);
		this.log = this.makeLog(log);
	}

	private makeLog(log?: Log | null): Log {
		let classLog: Log;

		if (!log || !typeMatch(log, Log)) {
			classLog = new Log();
		} else {
			classLog = log;
		}

		return classLog.makeLog('TimeData');
	}

	/**
	 * Get the current time value in instance's native time unit.
	 * @returns
	 */
	public get(): number {
		return this.value();
	}

	public set(caller: Time, input?: number | Time | null): Time {
		const fnLog = this.log.makeLog('set');

		if (input === null || input === undefined) {
			fnLog.error(`input arg is missing.`);
			return caller;
		}

		if (typeof input === 'number') {
			this.value(input);
			return caller;
		}

		if (!timeCheckValid(input)) {
			fnLog.error(`time arg failed validity check.`);
			return caller;
		}

		const updated = timeConvert(input.units(), this.units(), input());
		this.value(updated);

		return caller;
	}

	/**
	 * Add number input to current value.
	 * @param caller		Time instance calling this method.
	 * @param input			number value to be added.
	 * @returns				Returns the Time instance which invoked the function
	 *						to support method chaining.
	 */
	public addNumber(caller: Time, input?: number | null): Time {
		if (typeof input !== 'number') {
			const fnLog = this.log.makeLog('addNumber');
			fnLog.error(`input arg is not a number.`);
			return caller;
		}

		const total = this.value() + input;
		this.set(caller, total);

		return caller;
	}

	/**
	 * Subtract number input from the current value.
	 * @param caller		Time instance calling this method.
	 * @param input			number value to be subtracted.
	 * @returns				Returns the Time instance which invoked the function
	 *						to support method chaining.
	 */
	public subNumber(caller: Time, input?: number | null): Time {
		if (typeof input !== 'number') {
			const fnLog = this.log.makeLog('subNumber');
			fnLog.error(`input arg is not a number.`);
			return caller;
		}

		return this.addNumber(caller, input * -1);
	}

	/**
	 * Convert value from specified units into object's native time units, then
	 * subtract it from the current value.
	 * @param caller		Time instance calling this method.
	 * @param input			number value to be added.
	 * @returns				Returns the Time instance which invoked the function
	 *						to support method chaining.
	 */
	public subUnit(caller: Time, units: TimeUnit, value?: number | null, decimals?: number): Time {
		const fnLog = this.log.makeLog('subUnit');

		if (!units) {
			fnLog.error(`units arg missing.`);
			return caller;
		}

		if (typeof value !== 'number') {
			fnLog.error(`units arg is not a number.`);
			return caller;
		}

		const converted = timeConvert(units, this.units(), value, decimals);
		if (converted === null) {
			fnLog.error(`bad timeConvert result for value.`);
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
		const fnLog = this.log.makeLog('addUnit');

		if (value === null || value === undefined) {
			fnLog.error(`value arg missing`);
			return caller;
		}

		const converted = timeConvert(units, this.units(), value, decimals);
		if (converted === null) {
			fnLog.error(`bad timeConvert result for value.`);
			return caller;
		}

		return this.addNumber(caller, converted);
	}

	/**
	 * Invert current value's sign.
	 * @param caller
	 * @param posOnly
	 * @returns
	 */
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
		const fnLog = this.log.makeLog('timeSinceTime');

		if (!timeCheckType(target)) {
			fnLog.error(`target arg did not pass time check type test. target is not a valid Time instance.`);
			return null;
		}

		const since = timeConvert(target.units(), this.units(), target());
		if (since === null) {
			fnLog.error(`bad timeConvert result for target.`);
			return null;
		}

		return this.timeSinceNumber(since);
	}

	public timeSinceNumber(target: number): Time | null {
		const fnLog = this.log.makeLog('timeSinceNumber');

		if (typeof target !== 'number') {
			fnLog.error(`target arg is not a number.`);
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
		const fnLog = this.log.makeLog('timeUntilTime');

		if (!timeCheckType(time)) {
			fnLog.error(`time arg did not pass type check and is not a valid Time instance.`);
			return null;
		}

		const target = timeConvert(time.units(), 's', time());
		if (target === null) {
			fnLog.error(`Bad timeConvertresult for time arg.`);
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
		const fnLog = this.log.makeLog(`timeUntilNumber`);

		if (typeof target !== 'number') {
			fnLog.error(`target arg is not a number.`);
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
		this.log.debug(`TimeData reset complete`);

		return caller;
	}
}
