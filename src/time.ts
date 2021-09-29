import {TimeUnit} from './time/unit';

export interface Time {
	type: 'Time' | string;

	(setTo?: number | Time): number;
	add: (value: Time | number, decimals?: number) => Time;
	sub: (value: Time | number, decimals?: number) => Time;
	setNow: () => Time;
	set: (value: number) => Time;
	reset: () => Time;
	units: () => TimeUnit;

	since: (time: Time | number) => Time | null;
	until: (time: Time | number) => Time | null;

	asDays: () => number | null;
	asHours: () => number | null;
	asMicroseconds: () => number | null;
	asMilliseconds: () => number | null;
	asMinutes: () => number | null;
	asMonths: () => number | null;
	asSeconds: () => number | null;
	asWeeks: () => number | null;
	asYears: () => number | null;

	addYears: (value?: number | null) => Time;
	addMonths: (value?: number | null) => Time;
	addWeeks: (value?: number | null) => Time;
	addDays: (value?: number | null) => Time;
	addHours: (value?: number | null) => Time;
	addMinutes: (value?: number | null) => Time;
	addSeconds: (value?: number | null) => Time;
	addMilliseconds: (value?: number | null) => Time;
	addMicroseconds: (value?: number | null) => Time;

	subYears: (value?: number | null) => Time;
	subMonths: (value?: number | null) => Time;
	subWeeks: (value?: number | null) => Time;
	subDays: (value?: number | null) => Time;
	subHours: (value?: number | null) => Time;
	subMinutes: (value?: number | null) => Time;
	subSeconds: (value?: number | null) => Time;
	subMilliseconds: (value?: number | null) => Time;
	subMicroseconds: (value?: number | null) => Time;

	toYears: () => Time;
	toMonths: () => Time;
	toWeeks: () => Time;
	toDays: () => Time;
	toHours: () => Time;
	toMinutes: () => Time;
	toSeconds: () => Time;
	toMilliseconds: () => Time;
	toMicroseconds: () => Time;
}
