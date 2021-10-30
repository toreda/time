import {TimeUnit} from '../unit';

/**
 * @category Time Units
 */
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
