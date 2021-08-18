import {Time} from '../time';
import {TimeData} from './data';
import {TimeUnit} from './unit';
import {timeConvert} from './convert';

export function timeMake(units: TimeUnit, initial: number): Time {
	const data = new TimeData(units, initial);

	return Object.assign(
		(setTo?: number): number => {
			if (typeof setTo === 'number') {
				return data.value(setTo);
			}

			return data.value();
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

				return data.addUnit(this, value);
			},
			reset: (): Time => {
				return data.reset(this);
			},
			setNow: (): Time => {
				const now = Math.floor(Date.now() / 1000);
				const nowValue = timeConvert(data.units(), 's', now);

				if (nowValue !== null) {
					data.value(nowValue);
				}
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
				return timeConvert(data.units(), 'μs', data.value());
			},
			toMilliseconds: () => {
				return timeConvert(data.units(), 'ms', data.value());
			},
			toSeconds: () => {
				return timeConvert(data.units(), 's', data.value());
			},
			toMinutes: () => {
				return timeConvert(data.units(), 'm', data.value());
			},
			toHours: () => {
				return timeConvert(data.units(), 'h', data.value());
			},
			toDays: () => {
				return timeConvert(data.units(), 'd', data.value());
			},
			toWeeks: () => {
				return timeConvert(data.units(), 'w', data.value());
			},
			toMonths: () => {
				return timeConvert(data.units(), 'mo', data.value());
			},
			toYears: () => {
				return timeConvert(data.units(), 'y', data.value());
			}
		}
	);
}
