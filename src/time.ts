import {TimeUnit} from './time/unit';

export interface Time {
	(setTo?: number): number;
	add: (value: Time | number) => Time;
	sub: (value: Time | number) => Time;
	setNow: () => Time;
	reset: () => Time;
	units: () => TimeUnit;
	since: (time: Time | number) => Time | null;
	until: (time: Time | number) => Time | null;
	toDays: () => number | null;
	toHours: () => number | null;
	toMicroseconds: () => number | null;
	toMilliseconds: () => number | null;
	toMinutes: () => number | null;
	toMonths: () => number | null;
	toSeconds: () => number | null;
	toWeeks: () => number | null;
	toYears: () => number | null;
}
