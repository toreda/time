import {StrongDouble, StrongType, makeDouble, makeStrong} from '@toreda/strong-types';

import {Time} from '../time';
import {TimeUnit} from './unit';
import {timeConvert} from './convert';
import {timeMake} from './make';

export class TimeData {
	public readonly units: StrongType<TimeUnit>;
	public readonly value: StrongDouble;

	constructor(units: TimeUnit, value: number) {
		this.units = makeStrong(units);
		this.value = makeDouble(0, value);
	}

	public subUnit(caller: Time, input: Time): Time {
		if (!input) {
			return caller;
		}

		const sub = timeConvert(input.units(), this.units(), input());
		if (sub === null) {
			return caller;
		}

		const updated = this.value() - sub;
		this.value(updated);
		return caller;
	}

	public subNumber(caller: Time, value: number): Time {
		if (typeof value !== 'number') {
			return caller;
		}

		const total = this.value() - value;
		this.value(total);

		return caller;
	}

	public addNumber(caller: Time, value: number): Time {
		if (typeof value !== 'number') {
			return caller;
		}

		const total = this.value() + value;
		this.value(total);

		return caller;
	}

	public addUnit(caller: Time, input: Time): Time {
		if (!input) {
			return caller;
		}

		const add = timeConvert(input.units(), this.units(), input());
		if (add === null) {
			return caller;
		}

		const updated = this.value() + add;
		this.value(updated);
		return caller;
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
	public timeUntilNumber(target: number): Time | null {
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
		this.units.reset();
		return caller;
	}
}
