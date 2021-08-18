import {TimeUnit} from '../unit';

export interface TimeUnitLabel {
	timeUnit: TimeUnit;
	full: {
		singular: string;
		plural: string;
	};
	short: {
		singular: string;
		plural: string;
	};
}
