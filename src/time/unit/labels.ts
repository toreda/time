import type {TimeUnit} from '../unit';
import type {TimeUnitLabel} from './label';

/**
 * Labels for each time unit including singular and plurals.
 *
 * @category Time Units
 */
export const timeUnitLabels: Record<TimeUnit, TimeUnitLabel> = {
	m: {
		timeUnit: 'm',
		full: {
			singular: 'minute',
			plural: 'minutes'
		},
		short: {
			singular: 'min',
			plural: 'mins'
		}
	},
	h: {
		timeUnit: 'h',
		full: {
			singular: 'hour',
			plural: 'hours'
		},
		short: {
			singular: 'hr',
			plural: 'hrs'
		}
	},
	mo: {
		timeUnit: 'mo',
		full: {
			singular: 'month',
			plural: 'months'
		},
		short: {
			singular: 'mo',
			plural: 'mos'
		}
	},
	ms: {
		timeUnit: 'ms',
		full: {
			singular: 'millisecond',
			plural: 'milliseconds'
		},
		short: {
			singular: 'ms',
			plural: 'ms'
		}
	},
	d: {
		timeUnit: 'd',
		full: {
			singular: 'day',
			plural: 'days'
		},
		short: {
			singular: 'd',
			plural: 'd'
		}
	},
	w: {
		timeUnit: 'w',
		full: {
			singular: 'week',
			plural: 'weeks'
		},
		short: {
			singular: 'wk',
			plural: 'wks'
		}
	},
	us: {
		timeUnit: 'us',
		full: {
			singular: 'microsecond',
			plural: 'microseconds'
		},
		short: {
			singular: 'us',
			plural: 'us'
		}
	},
	s: {
		timeUnit: 'us',
		full: {
			singular: 'second',
			plural: 'seconds'
		},
		short: {
			singular: 'sec',
			plural: 'secs'
		}
	},
	y: {
		timeUnit: 'us',
		full: {
			singular: 'year',
			plural: 'years'
		},
		short: {
			singular: 'yr',
			plural: 'yrs'
		}
	}
};
