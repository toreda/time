import {Time} from '../time';
import {TimeData} from './data';
import {TimeUnit} from './unit';
import {timeConvert} from './convert';
import {timeNow} from './now';

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
			add: (value: Time | number): Time => {
				if (typeof value === 'number') {
					return data.addNumber(this, value);
				}

				return data.addUnit(this, value);
			},
			sub: (value: Time | number): Time => {
				if (typeof value === 'number') {
					return data.subNumber(this, value);
				}

				return data.subUnit(this, value);
			},
			reset: (): Time => {
				return data.reset(this);
			},
			set: (value: number): Time => {
				return data.set(this, value);
			},
			setNow: (): Time => {
				const now = timeNow();
				data.set(this, now);

				return this;
			},
			units: (): TimeUnit => {
				return data.units();
			},
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
			toMicroseconds: (): number | null => {
				return timeConvert(data.units(), 'μs', data.get());
			},
			toMilliseconds: () => {
				return timeConvert(data.units(), 'ms', data.get());
			},
			toSeconds: () => {
				return timeConvert(data.units(), 's', data.get());
			},
			toMinutes: () => {
				return timeConvert(data.units(), 'm', data.get());
			},
			toHours: () => {
				return timeConvert(data.units(), 'h', data.get());
			},
			toDays: () => {
				return timeConvert(data.units(), 'd', data.get());
			},
			toWeeks: () => {
				return timeConvert(data.units(), 'w', data.get());
			},
			toMonths: () => {
				return timeConvert(data.units(), 'mo', data.get());
			},
			toYears: () => {
				return timeConvert(data.units(), 'y', data.get());
			}
		}
	);
}
