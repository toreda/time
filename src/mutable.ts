/**
 * Internal helper providing a callable, mutable value with a `reset` method.
 * Replaces the small surface of `@toreda/strong-types` (`floatMake`,
 * `uIntMake`, etc.) actually used in this codebase.
 *
 * Usage:
 *   const interval = mutable(0);
 *   interval();         // read
 *   interval(5);        // write
 *   interval.reset();   // restore initial
 *
 * Not exported from the package root; intended for internal use only.
 */
export interface Mutable<T> {
	(value?: T | null): T;
	reset: () => void;
}

export function mutable<T>(initial: T): Mutable<T> {
	let current: T = initial;

	function fn(value?: T | null): T {
		if (value !== undefined && value !== null) {
			current = value;
		}
		return current;
	}

	(fn as Mutable<T>).reset = (): void => {
		current = initial;
	};

	return fn as Mutable<T>;
}
