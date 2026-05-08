import type {Mutable} from '../mutable';
import type {Time} from '../time';
import type {Timer} from '../timer';
import {mutable} from '../mutable';
import {timeMake} from '../time/make';
import {timeSince} from '../time/since';

/**
 * @category Timers
 */
export class TimerPassive implements Timer {
	public running: boolean;
	public readonly interval: Mutable<number>;
	public readonly lastTrigger: Mutable<number>;
	public readonly triggerLimit: Mutable<number>;
	public timeStart: Time;

	constructor() {
		this.running = false;
		this.interval = mutable(0);
		this.lastTrigger = mutable(0);
		this.triggerLimit = mutable(0);
		this.timeStart = timeMake('s', 0);
	}

	/**
	 * Start timer using the current time. No effect if timer is running.
	 * @returns		Whether timer started successfully.
	 */
	public start(): boolean {
		if (this.running) {
			return false;
		}

		this.timeStart.setNow();
		this.running = true;
		return true;
	}

	/**
	 * Stop current timer. No effect if timer is not running.
	 * @returns		Whether timer stopped succesfully.
	 */
	public stop(): boolean {
		if (!this.running) {
			return false;
		}

		this.running = false;
		return true;
	}

	public trigger(): void {
		// Todo
	}

	public onUpdate(): void {
		if (!this.running) {
			return;
		}

		const elapsed = timeSince(this.timeStart());
		if (elapsed === null) {
			return;
		}

		const seconds = elapsed.asSeconds();
		if (seconds === null) {
			return;
		}

		if (seconds < this.interval()) {
			return;
		}

		this.trigger();
	}

	public reset(): void {
		this.running = false;
	}
}
