import {Log} from '@toreda/log';
import type {Time} from '../time';
import type {TimeUnit} from './unit';
import {TimeUtils} from './utils';
import {timeCheckType} from './check/type';
import {timeConvert} from './convert';
import {timeMake} from './make';
import {timeUnitSupported} from './unit/supported';

const FALLBACK_UNIT: TimeUnit = 's';

function isSafeFiniteNumber(value: unknown): value is number {
	return typeof value === 'number' && isFinite(value) && TimeUtils.withinSafeRange(value);
}

/**
 * Internal state data created and wrapped by Time instances. All mutators
 * are silent no-ops on bad input: the failure is logged and `caller` is
 * returned unchanged.
 */
export class TimeData {
	private _units: TimeUnit;
	private value: number;
	private readonly initialUnits: TimeUnit;
	private readonly initialValue: number;
	public readonly log: Log;

	constructor(units: TimeUnit, value: number, log?: Log | null) {
		this.log = this.makeLog(log);

		const ctorLog = this.log.makeLog('constructor');

		let safeUnits: TimeUnit = units;
		if (!timeUnitSupported(units)) {
			ctorLog.error(`units arg is not a supported TimeUnit; falling back to '${FALLBACK_UNIT}'.`);
			safeUnits = FALLBACK_UNIT;
		}

		let safeValue = value;
		if (!isSafeFiniteNumber(value)) {
			ctorLog.error(`value arg is not a finite number in safe range; falling back to 0.`);
			safeValue = 0;
		}

		this._units = safeUnits;
		this.initialUnits = safeUnits;
		this.value = safeValue;
		this.initialValue = safeValue;
	}

	/**
	 * Get the instance's current native time unit.
	 */
	public units(): TimeUnit {
		return this._units;
	}

	private makeLog(log?: Log | null): Log {
		const classLog = log instanceof Log ? log : new Log();
		return classLog.makeLog('TimeData');
	}

	/**
	 * Convert the current value into the target time unit and update the
	 * instance's native time unit to match. Used by in-place conversion
	 * methods on the wrapping Time instance.
	 *
	 * @returns		`caller` for chaining. The conversion is a no-op when the
	 *				target is unsupported, the conversion fails, or `target`
	 *				already matches the current unit.
	 */
	public setUnits(caller: Time, target: TimeUnit): Time {
		const fnLog = this.log.makeLog('setUnits');

		if (!timeUnitSupported(target)) {
			fnLog.error(`target arg is not a supported TimeUnit.`);
			return caller;
		}

		if (target === this._units) {
			if (!isSafeFiniteNumber(this.value)) {
				fnLog.error(`current value is not a finite number in safe range; refusing no-op.`);
				return caller;
			}
			return caller;
		}

		const converted = timeConvert(this._units, target, this.value);
		if (converted === null) {
			fnLog.error(`bad timeConvert result for target unit.`);
			return caller;
		}

		this.value = converted;
		this._units = target;
		return caller;
	}

	/**
	 * Get the current time value in instance's native time unit.
	 */
	public get(): number {
		return this.value;
	}

	/**
	 * Replace the current value with `input`.
	 * @returns		`caller` for chaining. State is left unchanged when `input`
	 *				is missing, not a finite number in safe range, or a Time
	 *				instance whose conversion fails.
	 */
	public set(caller: Time, input?: number | Time | null): Time {
		const fnLog = this.log.makeLog('set');

		if (input === null || input === undefined) {
			fnLog.error(`input arg is missing.`);
			return caller;
		}

		if (typeof input === 'number') {
			if (!isSafeFiniteNumber(input)) {
				fnLog.error(`input number is not finite or is out of safe range.`);
				return caller;
			}

			this.value = input;
			return caller;
		}

		if (!timeCheckType(input)) {
			fnLog.error(`input arg is not a valid Time instance.`);
			return caller;
		}

		const updated = timeConvert(input.units(), this._units, input());
		if (updated === null) {
			fnLog.error(`bad timeConvert result for input.`);
			return caller;
		}
		this.value = updated;

		return caller;
	}

	/**
	 * Add number input to current value.
	 * @param caller		Time instance calling this method.
	 * @param input			number value to be added.
	 * @returns				`caller` for chaining. State is left unchanged when
	 *						`input` is not a finite number in safe range or the
	 *						resulting sum overflows the safe range.
	 */
	public addNumber(caller: Time, input?: number | null): Time {
		const fnLog = this.log.makeLog('addNumber');

		if (!isSafeFiniteNumber(input)) {
			fnLog.error(`input arg is not a finite number in safe range.`);
			return caller;
		}

		const total = this.value + input;
		if (!isSafeFiniteNumber(total)) {
			fnLog.error(`computed total is not finite or is out of safe range.`);
			return caller;
		}

		this.value = total;

		return caller;
	}

	/**
	 * Subtract number input from the current value.
	 * @param caller		Time instance calling this method.
	 * @param input			number value to be subtracted.
	 * @returns				`caller` for chaining. State is left unchanged when
	 *						`input` is not a finite number in safe range or the
	 *						resulting difference overflows the safe range.
	 */
	public subNumber(caller: Time, input?: number | null): Time {
		const fnLog = this.log.makeLog('subNumber');

		if (!isSafeFiniteNumber(input)) {
			fnLog.error(`input arg is not a finite number in safe range.`);
			return caller;
		}

		const total = this.value - input;
		if (!isSafeFiniteNumber(total)) {
			fnLog.error(`computed total is not finite or is out of safe range.`);
			return caller;
		}

		this.value = total;

		return caller;
	}

	/**
	 * Get numeric unit value from a Time or number input.
	 *
	 * @param convertTo		TimeUnit the result should be expressed in. Used only
	 *						when `input` is a Time instance; raw numbers pass through
	 *						unchanged.
	 * @param input			A Time instance (its value is converted from its native
	 *						unit into `convertTo`), a finite number in safe range
	 *						(returned as-is), or `null`/`undefined`.
	 * @returns				The unit value as a number, or `null` if `input` is
	 *						missing, a non-finite or out-of-range number, not a
	 *						valid Time instance, or fails conversion.
	 */
	public getUnitValue(convertTo: TimeUnit, input?: Time | number | null): number | null {
		if (input === null || input === undefined) {
			return null;
		}

		if (typeof input === 'number') {
			return isSafeFiniteNumber(input) ? input : null;
		}

		if (!timeCheckType(input)) {
			return null;
		}

		const converted = timeConvert(input.units(), convertTo, input());
		return converted;
	}

	/**
	 * Convert value from specified units into instance's native time units, then
	 * subtract it from the current value.
	 * @param caller		Time instance calling this method.
	 * @param units			TimeUnit of the provided value.
	 * @param value			number value to be converted and subtracted.
	 * @param decimals		Optional precision (decimals) for the conversion.
	 */
	public subUnit(caller: Time, units: TimeUnit, value?: number | null, decimals?: number): Time {
		const fnLog = this.log.makeLog('subUnit');

		if (!timeUnitSupported(units)) {
			fnLog.error(`units arg is not a supported TimeUnit.`);
			return caller;
		}

		if (!isSafeFiniteNumber(value)) {
			fnLog.error(`value arg is not a finite number in safe range.`);
			return caller;
		}

		const converted = timeConvert(units, this._units, value, decimals);
		if (converted === null) {
			fnLog.error(`bad timeConvert result for value.`);
			return caller;
		}

		return this.subNumber(caller, converted);
	}

	/**
	 * Convert value from provided unit type into instance's native time units and
	 * add it to the current value.
	 * @param caller		Time instance calling this function to be returned by function.
	 * @param units			TimeUnit of the provided value.
	 * @param value			Value to be converted and added to current time.
	 * @param decimals		Number of decimals to include in final added value.
	 */
	public addUnit(caller: Time, units: TimeUnit, value?: number | null, decimals?: number): Time {
		const fnLog = this.log.makeLog('addUnit');

		if (!timeUnitSupported(units)) {
			fnLog.error(`units arg is not a supported TimeUnit.`);
			return caller;
		}

		if (!isSafeFiniteNumber(value)) {
			fnLog.error(`value arg is not a finite number in safe range.`);
			return caller;
		}

		const converted = timeConvert(units, this._units, value, decimals);
		if (converted === null) {
			fnLog.error(`bad timeConvert result for value.`);
			return caller;
		}

		return this.addNumber(caller, converted);
	}

	/**
	 * Invert the current value's sign in place.
	 * @param caller		Time instance calling this method.
	 * @param positivesOnly	When true, only positive values are inverted.
	 *						Negative values are left unchanged.
	 */
	public invert(caller: Time, positivesOnly?: boolean): Time {
		// 0 has no meaningful inversion and `0 * -1 === -0`, which would
		// otherwise leak into stored state.
		if (this.value === 0) {
			return caller;
		}

		if (positivesOnly === true && this.value < 0) {
			return caller;
		}

		this.value = this.value * -1;
		return caller;
	}

	/**
	 * Get a Time object representing the elapsed time between the instance's
	 * current value and a target Time. Returns a negative value when the target
	 * is in the future. The returned Time uses the instance's native unit.
	 * @param target
	 */
	public timeSinceTime(target?: Time | null): Time | null {
		const fnLog = this.log.makeLog('timeSinceTime');

		if (!timeCheckType(target)) {
			fnLog.error(`target arg is not a valid Time instance.`);
			return null;
		}

		const since = timeConvert(target.units(), this._units, target());
		if (since === null) {
			fnLog.error(`bad timeConvert result for target.`);
			return null;
		}

		return this.timeSinceNumber(since);
	}

	public timeSinceNumber(target?: number | null): Time | null {
		const fnLog = this.log.makeLog('timeSinceNumber');

		if (!isSafeFiniteNumber(target)) {
			fnLog.error(`target arg is not a finite number in safe range.`);
			return null;
		}

		const result = this.value - target;
		if (!isSafeFiniteNumber(result)) {
			fnLog.error(`computed result is not finite or is out of safe range.`);
			return null;
		}

		return timeMake(this._units, result);
	}

	/**
	 * Get time object containing time left until target time. May return
	 * negative value when target time is in the past. The returned time
	 * object's time left value uses the same time units as the calling instance.
	 * @param time
	 */
	public timeUntilTime(time?: Time | null): Time | null {
		const fnLog = this.log.makeLog('timeUntilTime');

		if (!timeCheckType(time)) {
			fnLog.error(`time arg is not a valid Time instance.`);
			return null;
		}

		const target = timeConvert(time.units(), this._units, time());
		if (target === null) {
			fnLog.error(`bad timeConvert result for time arg.`);
			return null;
		}

		return this.timeUntilNumber(target);
	}

	/**
	 * Get time remaining until target unix timestamp.
	 * @param target
	 */
	public timeUntilNumber(target?: number | null): Time | null {
		const fnLog = this.log.makeLog(`timeUntilNumber`);

		if (!isSafeFiniteNumber(target)) {
			fnLog.error(`target arg is not a finite number in safe range.`);
			return null;
		}

		const result = target - this.value;
		if (!isSafeFiniteNumber(result)) {
			fnLog.error(`computed result is not finite or is out of safe range.`);
			return null;
		}

		return timeMake(this._units, result);
	}

	/**
	 * Reset internal state variables to their initial values.
	 * @param caller
	 */
	public reset(caller: Time): Time {
		this.value = this.initialValue;
		this._units = this.initialUnits;
		this.log.debug(`TimeData reset complete.`);

		return caller;
	}
}
