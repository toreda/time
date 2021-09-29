import {Bool, Float, UInt, boolMake, floatMake, uIntMake} from '@toreda/strong-types';

import {Time} from '../time';
import {timeMake} from '../time/make';
import {timeSince} from '../time/since';
import {Timer} from '../timer';

export class TimerPassive implements Timer {
	public readonly running: Bool;
	public readonly interval: Float;
	public readonly lastTrigger: Float;
	public readonly triggerLimit: UInt;
	public timeStart: Time;

	constructor() {
		this.running = boolMake(false);
		this.interval = floatMake(0);
		this.lastTrigger = floatMake(0);
		this.triggerLimit = uIntMake(0);
		this.timeStart = timeMake('s', 0);
	}

	/**
	 * Start timer using the current time. No effect if timer is running.
	 * @returns		Whether timer started successfully.
	 */
	public start(): boolean {
		if (this.running()) {
			return false;
		}

		this.timeStart.setNow();
		return this.running(true);
	}

	/**
	 * Stop current timer. No effect if timer is not running.
	 * @returns		Whether timer stopped succesfully.
	 */
	public stop(): boolean {
		if (!this.running()) {
			return false;
		}

		return this.running(false);
	}

	public trigger(): void {
		// Todo
	}

	public onUpdate(): void {
		// do nothing
		if (!this.running()) {
			return;
		}

		const elapsed = timeSince(this.timeStart());

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
		this.running.reset();
	}
}
