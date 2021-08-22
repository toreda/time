import {Time} from '../time';
import {TimeData} from './data';
import {TimeUnit} from './unit';
import {timeCheckType} from './check/type';
import {timeConvert} from './convert';
import {timeNow} from './now';

/**
 * Create a new Time instance with the provided unit type and initial value. Wraps an
 * internal data instance only available in factory function closure.
 * @param units
 * @param initial
 * @returns
 */
export function timeMake(units: TimeUnit, initial: number): Time {
	const data = new TimeData(units, initial);

	return Object.assign(
		(setTo?: number | Time): number => {
			if (typeof setTo === 'number' || typeof setTo === 'function') {
				data.set(this, setTo);
			}

			return data.get();
		},
		{
			/**
			 * Add provided time value to instance's current time value. Value
			 * is expected to be in seconds when it is a number.
			 * Time object values are automatically converted to the instance
			 * unit type before subtracting. number values are added as seconds.
			 * @param value
			 * @returns
			 */
			add: (time: Time | number, decimals?: number): Time => {
				if (typeof time === 'number') {
					return data.addNumber(this, time);
				}

				if (!timeCheckType(time)) {
					return this;
				}

				return data.addUnit(this, time.units(), time(), decimals);
			},
			/**
			 * Subtract provided time value from instance's current time value.
			 * Time object values are automatically converted to the instance
			 * unit type before subtracting. number values are subtracted as
			 * seconds.
			 * @param value
			 * @returns
			 */
			sub: (time: Time | number, decimals?: number): Time => {
				if (typeof time === 'number') {
					return data.addNumber(this, time * -1);
				}

				if (!timeCheckType(time)) {
					return this;
				}
				// Invert value to subtract it.
				const value = time() * -1;
				return data.addUnit(this, time.units(), value, decimals);
			},
			/**
			 * Reset time value to it's starting state, but does
			 * not change the instance unit type, even if it's been
			 * changed since instantiation.
			 * @returns
			 */
			reset: (): Time => {
				return data.reset(this);
			},
			/**
			 * Reeplace existing time value with the provided time.
			 * @param time 		Unix timestamp or new time value in seconds.
			 * @returns
			 */
			set: (value: number): Time => {
				return data.set(this, value);
			},
			/**
			 * Replace instance time value with the current time according
			 * to the local system clock.
			 * @returns
			 */
			setNow: (): Time => {
				return data.set(this, timeNow());
			},
			/**
			 * Current unit type as a TimeUnit.
			 * @returns
			 */
			units: (): TimeUnit => {
				return data.units();
			},
			/**
			 * Time elapsed since target time. When time arg is a Time object
			 * it will be converted to the instance's unit type. When time arg is
			 * a number it should be in seconds.
			 * @param time
			 * @returns
			 */
			since: (time: Time | number): Time | null => {
				if (typeof time === 'number') {
					return data.timeSinceNumber(time);
				}

				return data.timeSinceTime(time);
			},
			until: (time: Time | number): Time | null => {
				if (typeof time === 'number') {
					return data.timeUntilNumber(time);
				}

				return data.timeUntilTime(time);
			},
			/**
			 * Copy and convert current time value from the instance unit type
			 * to microseconds, returning the converted copy. The Instance's
			 * current unit type and current time value are not changed.
			 * @returns
			 */
			asMicroseconds: (): number | null => {
				return timeConvert(data.units(), 'μs', data.get());
			},
			/**
			 * Copy and convert current time value from the instance unit type
			 * to milliseconds, returning the converted copy. The Instance's
			 * current unit type and current time value are not changed.
			 * @returns
			 */
			asMilliseconds: () => {
				return timeConvert(data.units(), 'ms', data.get());
			},
			/**
			 * Copy and convert current time value from the instance unit type
			 * to seconds, returning the converted copy. The Instance's
			 * current unit type and current time value are not changed.
			 * @returns
			 */
			asSeconds: () => {
				return timeConvert(data.units(), 's', data.get());
			},
			/**
			 * Copy and convert current time value from the instance unit type
			 * to minutes, returning the converted copy. The Instance's
			 * current unit type and current time value are not changed.
			 * @returns
			 */
			asMinutes: () => {
				return timeConvert(data.units(), 'm', data.get());
			},
			/**
			 * Copy and convert current time value from the instance unit type
			 * to hours, returning the converted copy. The Instance's
			 * current unit type and current time value are not changed.
			 * @returns
			 */
			asHours: () => {
				return timeConvert(data.units(), 'h', data.get());
			},
			/**
			 * Copy and convert current time value from the instance unit type
			 * to days, returning the converted copy. The Instance's
			 * current unit type and current time value are not changed.
			 * @returns
			 */
			asDays: () => {
				return timeConvert(data.units(), 'd', data.get());
			},
			/**
			 * Copy and convert current time value from the instance unit type
			 * to weeks, returning the converted copy. The Instance's
			 * current unit type and current time value are not changed.
			 * @returns
			 */
			asWeeks: () => {
				return timeConvert(data.units(), 'w', data.get());
			},
			/**
			 * Copy and convert current time value from the instance unit type
			 * to months, returning the converted copy. The Instance's
			 * current unit type and current time value are not changed.
			 * @returns
			 */
			asMonths: () => {
				return timeConvert(data.units(), 'mo', data.get());
			},
			/**
			 * Copy and convert current time value from the instance unit type
			 * to years, returning the converted copy. The Instance's
			 * current unit type and current time value are not changed.
			 * @returns
			 */
			asYears: () => {
				return timeConvert(data.units(), 'y', data.get());
			},
			/**
			 * Converts provided vlaue in microseconds to instance's unit type
			 * and add it to the current time value.
			 * @param value		Number of microseconds to add.
			 * @returns
			 */
			addMicroseconds(value?: number | null): Time {
				return data.addUnit(this, 'μs', value, 10);
			},
			/**
			 * Converts provided value from milliseconds to instance's unit type
			 * and add it to the current time value.
			 * @param value		Number of milliseconds to add.
			 * @returns
			 */
			addMilliseconds(value?: number | null): Time {
				return data.addUnit(this, 'ms', value, 10);
			},
			/**
			 * Converts provided value from seconds to instance's unit type
			 * and adds it to the current time value.
			 * @param value		Number of milliseconds to add.
			 * @returns
			 */
			addSeconds(value?: number | null): Time {
				return data.addUnit(this, 's', value, 10);
			},
			/**
			 * Converts provided value from minutes to instance's unit type
			 * and adds it to the current time value.
			 * @param value		Number of minutes to add.
			 * @returns
			 */
			addMinutes(value?: number | null): Time {
				return data.addUnit(this, 'm', value, 10);
			},
			/**
			 * Converts provided value from hours to instance's unit type
			 * and adds it to the current time value.
			 * @param value		Number of hours to add.
			 * @returns
			 */
			addHours(value?: number | null): Time {
				return data.addUnit(this, 'h', value, 10);
			},
			/**
			 * Converts provided value from days to instance's unit type
			 * and adds it to the current time value.
			 * @param value		Number of days to add.
			 * @returns
			 */
			addDays(value?: number | null): Time {
				return data.addUnit(this, 'd', value, 4);
			},
			/**
			 * Converts provided value from weeks to instance's unit type
			 * and adds it to the current time value.
			 * @param value		Number of weeks to add.
			 * @returns
			 */
			addWeeks(value?: number | null): Time {
				return data.addUnit(this, 'w', value, 4);
			},
			/**
			 * Converts provided value from months to instance's unit type
			 * and adds it to the current time value.
			 * @param value		Number of months to add.
			 * @returns
			 */
			addMonths(value?: number | null): Time {
				return data.addUnit(this, 'mo', value, 4);
			},
			/**
			 * Converts provided value from years to instance's unit type
			 * and adds it to the current time value.
			 * @param value		Number of years to add.
			 * @returns
			 */
			addYears(value?: number | null): Time {
				return data.addUnit(this, 'y', value, 4);
			},
			/**
			 * Converts provided value from microseconds to instance's unit type
			 * and subtracts it from the current time value.
			 * @param value		Number of microseconds to substract.
			 * @returns
			 */
			subMicroseconds(value?: number | null): Time {
				return data.subUnit(this, 'μs', value, 10);
			},
			/**
			 * Converts provided value from milliseconds to instance's unit type
			 * and subtracts it from the current time value.
			 * @param value		Number of milliseconds to substract.
			 * @returns
			 */
			subMilliseconds(value?: number | null): Time {
				return data.subUnit(this, 'ms', value, 10);
			},
			/**
			 * Converts provided value from seconds to instance's unit type
			 * and subtracts it from the current time value.
			 * @param value		Number of seconds to substract.
			 * @returns
			 */
			subSeconds(value?: number | null): Time {
				return data.subUnit(this, 's', value, 10);
			},
			/**
			 * Converts provided value from minutes to instance's unit type
			 * and subtracts it from the current time value.
			 * @param value		Number of minutes to substract.
			 * @returns
			 */
			subMinutes(value?: number | null): Time {
				return data.subUnit(this, 'm', value, 8);
			},
			/**
			 * Converts provided value from hours to instance's unit type
			 * and subtracts it from the current time value.
			 * @param value		Number of hours to substract.
			 * @returns
			 */
			subHours(value?: number | null): Time {
				return data.subUnit(this, 'h', value, 4);
			},
			/**
			 * Converts provided value from days to instance's unit type
			 * and subtracts it from the current time value.
			 * @param value		Number of days to substract.
			 * @returns
			 */
			subDays(value?: number | null): Time {
				return data.subUnit(this, 'd', value, 4);
			},
			/**
			 * Converts provided value from weeks to instance's unit type
			 * and subtracts it from the current time value.
			 * @param value		Number of weeks to substract.
			 * @returns
			 */
			subWeeks(value?: number | null): Time {
				return data.subUnit(this, 'w', value, 4);
			},
			/**
			 * Converts provided value from months to instance's unit type
			 * and subtracts it from the current time value.
			 * @param value		Number of months to substract.
			 * @returns
			 */
			subMonths(value?: number | null): Time {
				return data.subUnit(this, 'mo', value, 4);
			},
			/**
			 * Converts provided value from years to instance's unit type
			 * and subtracts it from the current time value.
			 * @param value		Number of years to substract.
			 * @returns		Time Instance
			 */
			subYears(value?: number | null): Time {
				return data.subUnit(this, 'y', value, 4);
			},
			/**
			 * Converts current time value to years.
			 * @returns		Time Instance
			 */
			toYears(): Time {
				const value = timeConvert(data.units(), 'y', data.get());
				data.units('y');

				return data.set(this, value);
			},
			/**
			 * Convert current time value to months.
			 * @returns		Time Instance
			 */
			toMonths(): Time {
				const value = timeConvert(data.units(), 'mo', data.get());
				data.units('mo');

				return data.set(this, value);
			},
			/**
			 * Convert current time value to weeks.
			 * @returns		Time instance
			 */
			toWeeks(): Time {
				const value = timeConvert(data.units(), 'w', data.get());
				data.units('w');

				return data.set(this, value);
			},
			/**
			 * Convert current time value to days.
			 * @returns		Time instance
			 */
			toDays(): Time {
				const value = timeConvert(data.units(), 'd', data.get());
				data.units('d');

				return data.set(this, value);
			},
			/**
			 * Convert current time value to hours.
			 * @returns 	Time instance
			 */
			toHours(): Time {
				const value = timeConvert(data.units(), 'h', data.get());
				data.units('h');

				return data.set(this, value);
			},
			/**
			 * Convert current time value to minutes.
			 * @returns		Time instance
			 */
			toMinutes(): Time {
				const value = timeConvert(data.units(), 'm', data.get());
				data.units('m');

				return data.set(this, value);
			},
			/**
			 * Convert current time value to seconds.
			 * @returns		Time instance
			 */
			toSeconds(): Time {
				const value = timeConvert(data.units(), 's', data.get());
				data.units('s');

				return data.set(this, value);
			},
			/**
			 * Convert current time value to milliseconds.
			 * @returns
			 */
			toMilliseconds(): Time {
				const value = timeConvert(data.units(), 'ms', data.get());
				data.units('ms');

				return data.set(this, value);
			},
			/**
			 * Convert current time value to microseconds.
			 * @returns
			 */
			toMicroseconds(): Time {
				const value = timeConvert(data.units(), 'μs', data.get());
				data.units('μs');

				return data.set(this, value);
			},
			type: 'Time'
		}
	);
}
