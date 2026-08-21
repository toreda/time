const COUNTER_KEY = Symbol.for('@toreda/time/timerCallbackGroupIdCounter');

type GlobalWithCounter = typeof globalThis & {[COUNTER_KEY]?: number};

/**
 * Returns the next auto-incrementing TimerCallbackGroup id. The counter is
 * stored on `globalThis` under a registered Symbol so every module that
 * imports this helper - even across duplicated copies of the package - shares
 * the same sequence.
 *
 * @category Timers
 */
export function timerCallbackGroupIdNext(): string {
	const g = globalThis as GlobalWithCounter;
	const next = (g[COUNTER_KEY] ?? 0) + 1;
	g[COUNTER_KEY] = next;
	return `timer_${next}`;
}
