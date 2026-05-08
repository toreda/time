import type {TimeUnit} from '../../unit';
import {timeUnitAliases} from '../aliases';

/**
 * Resolve a loose alias string (e.g. `'day'`, `'sec'`, `'minutes'`) to
 * its canonical `TimeUnit` value. Intended for user-facing functions
 * that accept alias input; returns `null` when the value is not a
 * recognized alias or canonical unit.
 *
 * @param value		Candidate alias or canonical unit string.
 * @returns			Canonical `TimeUnit` when recognized, otherwise `null`.
 *
 * @category Time Units
 */
export function timeUnitFromAlias(value?: unknown): TimeUnit | null {
	if (typeof value !== 'string') {
		return null;
	}

	return timeUnitAliases.get(value) ?? null;
}
