/**
 * Invoked asynchronously on timer events.
 *
 * @category Timers
 */
export type TimerCallback = (duration: number) => Promise<void>;
