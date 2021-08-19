/**
 * Values used throughout the package and condensed into one class to
 * provide standardized constant values, so that they are not redefined
 * in multiple classes.
 */
export enum TimeConstants {
	/**
	 * MICROSECONDS
	 */
	/** Conversion factor to convert microseconds to milliseconds. */
	MICROSECONDS_TO_MILLISECONDS = 0.001,
	/** Conversion factor to convert microseconds to seconds. */
	MICROSECONDS_TO_SECONDS = 1.0e-6,
	/** Conversion factor to convert  microseconds to minutes. */
	MICROSECONDS_TO_MINUTES = 60000000,
	/** Conversion factor to convert microseconds to hours. */
	MICROSECONDS_TO_HOURS = 3600000000,
	/** Conversion factor to convert microseconds to days. */
	MICROSECONDS_TO_DAYS = 86400000000,
	/** Conversion factor to convert microseconds to weeks. */
	MICROSECONDS_TO_WEEKS = 604800000000,
	/** Conversion factor to convert microseconds to months. */
	MICROSECONDS_TO_MONTHS = 2628000000000,
	/** Conversion factor to convert microseconds to years. */
	MICROSECONDS_TO_YEARS = 31536000000000,

	/**
	 * MILLISECONDS
	 */
	/** Conversion factor to convert milliseconds to microseconds. */
	MILLISECONDS_TO_MICROSECONDS = 1000,
	/** Conversion factor to convert milliseconds to seconds. */
	MILLISECONDS_TO_SECONDS = 0.001,
	/** Conversion factor to convert milliseconds to minutes. */
	MILLISECONDS_TO_MINUTES = 1.6666666666667e-5,
	/** Conversion factor to convert milliseconds to hours. */
	MILLISECONDS_TO_HOURS = 2.7777777777778e-7,
	/** Conversion factor to convert milliseconds to days. */
	MILLISECONDS_TO_DAYS = 1.1574074074074e-8,
	/** Conversion factor to convert milliseconds to weeks. */
	MILLISECONDS_TO_WEEKS = 1.6534391534392e-9,
	/** Conversion factor to convert milliseconds to months. */
	MILLISECONDS_TO_MONTHS = 3.8051750380518e-10,
	/** Conversion factor to convert milliseconds to years. */
	MILLISECONDS_TO_YEARS = 3.1709791983765e-11,

	/**
	 * SECONDS
	 */
	/** Conversion factor to convert seconds to minutes. */
	SECONDS_TO_MINUTES = 0.016666666666667,
	/** Conversion factor to convert seconds to hours. */
	SECONDS_TO_HOURS = 0.00027777777777778,
	/** Conversion factor to convert seconds to days. */
	SECONDS_TO_DAYS = 1.1574074074074e-5,
	/** Conversion factor to convert seconds to weeks. */
	SECONDS_TO_WEEKS = 1.6534391534392e-6,
	/** Conversion factor to convert seconds to months. */
	SECONDS_TO_MONTHS = 3.8051750380518e-7,
	/** Conversion factor to convert seconds to years. */
	SECONDS_TO_YEARS = 3.1709791983765e-8,
	/** Conversion factor to convert seconds to milliseconds. */
	SECONDS_TO_MILLISECONDS = 1000,
	/** Conversion factor to convert seconds to microseconds. */
	SECONDS_TO_MICROSECONDS = 1000000,

	/**
	 * MINUTES
	 */
	/** Conversion factor to convert minutes to hours. */
	MINUTES_TO_HOURS = 0.01666666666666,
	/** Conversion factor to convert minutes to days. */
	MINUTES_TO_DAYS = 0.00069444444444444,
	/** Conversion factor to convert minutes to weeks. */
	MINUTES_TO_WEEKS = 9.9206349206349e-5,
	/** Conversion factor to convert minutes to months. */
	MINUTES_TO_MONTHS = 2.2831050228311e-5,
	/** Conversion factor to convert minutes to years. */
	MINUTES_TO_YEARS = 1.9025875190259e-6,
	/** Conversion factor to convert minutes to seconds. */
	MINUTES_TO_SECONDS = 60,
	/** Conversion factor to convert minutes to microseconds. */
	MINUTES_TO_MICROSECONDS = 60000000,
	/** Conversion factor to convert minutes to milliseconds. */
	MINUTES_TO_MILLISECONDS = 60000,

	/**
	 * HOURS
	 */
	/** Conversion factor to convert hours to weeks. */
	HOURS_TO_WEEKS = 0.005952380952381,
	/** Conversion factor to convert hours to days. */
	HOURS_TO_DAYS = 0.041666666666667,
	/** Conversion factor to convert hours to months. */
	HOURS_TO_MONTHS = 0.0013698630136986,
	/** Conversion factor to convert hours to years. */
	HOURS_TO_YEARS = 0.00011415525114155,
	/** Conversion factor to convert hours to minutes. */
	HOURS_TO_MINUTES = 60,
	/** Conversion factor to convert hours to seconds. */
	HOURS_TO_SECONDS = 3600,
	/** Conversion factor to convert hours to decades. */
	HOURS_TO_DECADES = 1.1415525114155e-5,
	/** Conversion factor to convert hours to milliseconds. */
	HOURS_TO_MILLISECONDS = 3600000,
	/** Conversion factor to convert hours to microseconds. */
	HOURS_TO_MICROSECONDS = 3600000000,

	/**
	 * DAYS
	 */
	/** Conversion factor to convert days to months. */
	DAYS_TO_MONTHS = 0.032876712328767,
	/** Conversion factor to convert days to weeks. */
	DAYS_TO_WEEKS = 0.14285714285714,
	/** Conversion factor to convert days to years. */
	DAYS_TO_YEARS = 0.0027397260273973,
	/** Conversion factor to convert days to minutes. */
	DAYS_TO_MINUTES = 1440,
	/** Conversion factor to convert days to hours. */
	DAYS_TO_HOURS = 24,
	/** Conversion factor to convert days to seconds. */
	DAYS_TO_SECONDS = 86400,
	/** Conversion factor to convert days to milliseconds. */
	DAYS_TO_MILLISECONDS = 86400000,
	/** Conversion factor to convert days to microseconds. */
	DAYS_TO_MICROSECONDS = 86400000000,

	/**
	 * WEEKS
	 */
	/** Conversion factor to convert weeks to years. */
	WEEKS_TO_YEARS = 0.019178082191781,
	/** Conversion factor to convert weeks to months. */
	WEEKS_TO_MONTHS = 0.23013698630137,
	/** Conversion factor to convert weeks to days. */
	WEEKS_TO_DAYS = 7,
	/** Conversion factor to convert weeks to hours. */
	WEEKS_TO_HOURS = 168,
	/** Conversion factor to convert weeks to minutes. */
	WEEKS_TO_MINUTES = 10080,
	/** Conversion factor to convert weeks to seconds. */
	WEEKS_TO_SECONDS = 604800,
	/** Conversion factor to convert weeks to milliseconds. */
	WEEKS_TO_MILLISECONDS = 604800000,
	/** Conversion factor to convert weeks to microseconds. */
	WEEKS_TO_MICROSECONDS = 604800000000,

	/**
	 * MONTHS
	 */
	/** Conversion factor to convert months to years. */
	MONTHS_TO_YEARS = 12,
	/** Conversion factor to convert months to weeks. */
	MONTHS_TO_WEEKS = 4.3452380952381,
	/** Conversion factor to convert months to days. */
	MONTHS_TO_DAYS = 30.416666666667,
	/** Conversion factor to convert months to hours. */
	MONTHS_TO_HOURS = 730,
	/** Conversion factor to convert months to minutes. */
	MONTHS_TO_MINUTES = 43800,
	/** Conversion factor to convert months to seconds. */
	MONTHS_TO_SECONDS = 2628000,

	/**
	 * YEARS
	 */
	/** Conversion factor to convert months to decades. */
	YEARS_TO_DECADES = 10,
	/** Conversion factor to convert months to months */
	YEARS_TO_MONTHS = 12,
	/** Conversion factor to convert months to weeks*/
	YEARS_TO_WEEKS = 52.142857142857,
	/** Conversion factor to convert months to days */
	YEARS_TO_DAYS = 365,
	/** Conversion factor to convert months to hours */
	YEARS_TO_HOURS = 8760,
	/** Conversion factor to convert months to minutes */
	YEARS_TO_MINUTES = 525600,
	/** Conversion factor to convert months to seconds */
	YEARS_TO_SECONDS = 31536000,
	/** Conversion factor to convert months to milliseconds */
	YEARS_TO_MILLISECONDS = 31536000000,
	/** Conversion factor to convert months to microseconds */
	YEARS_TO_MICROSECONDS = 31536000000000,

	/**
	 * DECADES
	 */
	/** Conversion factor to convert decades to days. */
	DECADES_TO_DAYS = 3650,
	/** Conversion factor to convert decades to months. */
	DECADES_TO_MONTHS = 120,
	/** Conversion factor to convert decades to hours. */
	DECADES_TO_HOURS = 87600,
	/** Conversion factor to convert decades to minutes. */
	DECADES_TO_MINUTES = 5256000,
	/** Conversion factor to convert decades to seconds. */
	DECADES_TO_SECONDS = 315360000,
	/** Conversion factor to convert decades to milliseconds. */
	DECADES_TO_MILLISECONDS = 315360000000,
	/** Conversion factor to convert decades to microseconds.*/
	DECADES_TO_MICROSECONDS = 3.1536e14
}
