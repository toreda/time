import type {TimeUnit} from './time/unit';

/**
 * Properties required for all Time objects.
 *
 * @category Time
 */
export interface Time {
	type: 'Time' | string;

	(setTo?: Time | number | null): number;
	add: (value: Time | number, decimals?: number) => Time;
	sub: (value: Time | number, decimals?: number) => Time;
	setNow: () => Time;
	set: (value?: Time | number | null) => Time;
	reset: () => Time;
	units: () => TimeUnit;

	elapsed: (time: Time | number) => boolean;
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

	addYears: (value?: Time | number | null) => Time;
	addMonths: (value?: Time | number | null) => Time;
	addWeeks: (value?: Time | number | null) => Time;
	addDays: (value?: Time | number | null) => Time;
	addHours: (value?: Time | number | null) => Time;
	addMinutes: (value?: Time | number | null) => Time;
	addSeconds: (value?: Time | number | null) => Time;
	addMilliseconds: (value?: Time | number | null) => Time;
	addMicroseconds: (value?: Time | number | null) => Time;

	subYears: (value?: Time | number | null) => Time;
	subMonths: (value?: Time | number | null) => Time;
	subWeeks: (value?: Time | number | null) => Time;
	subDays: (value?: Time | number | null) => Time;
	subHours: (value?: Time | number | null) => Time;
	subMinutes: (value?: Time | number | null) => Time;
	subSeconds: (value?: Time | number | null) => Time;
	subMilliseconds: (value?: Time | number | null) => Time;
	subMicroseconds: (value?: Time | number | null) => Time;

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
