import {Defaults} from '../defaults';
import type {TimeUnit} from './unit';
import {timeUnitSupported} from './unit/supported';

const MIN_DECIMALS = 0;
const MAX_DECIMALS = 100;

export class TimeUtils {
	public static withinSafeRange(n: number): boolean {
		return n >= Number.MIN_SAFE_INTEGER && n <= Number.MAX_SAFE_INTEGER;
	}

	/**
	 * Check whether timeConvert can convert between the provided units.
	 * @param from
	 * @param to
	 * @param value
	 * @returns
	 */
	public static canConvert(from: TimeUnit, to: TimeUnit, value?: number | null): value is number {
		if (!timeUnitSupported(from) || !timeUnitSupported(to)) {
			return false;
		}

		if (typeof value !== 'number' || !isFinite(value)) {
			return false;
		}

		return TimeUtils.withinSafeRange(value);
	}

	public static resolveDecimals(decimals?: number): number {
		if (typeof decimals !== 'number' || !isFinite(decimals)) {
			return Defaults.Math.Precision.Base;
		}

		if (decimals < MIN_DECIMALS || decimals > MAX_DECIMALS) {
			return Defaults.Math.Precision.Base;
		}

		return Math.floor(decimals);
	}

	public static roundToDecimals(value: number, decimals: number): number {
		const factor = Math.pow(10, decimals);
		return Math.round(value * factor) / factor;
	}
}
