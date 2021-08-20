import {
	StrongBoolean,
	StrongDouble,
	StrongUInt,
	makeBoolean,
	makeDouble,
	makeUInt
} from '@toreda/strong-types';

import {Time} from '../time';
import {Timer} from '../timer';
import {timeMake} from '../time/make';
import {timeSince} from '../time/since';

export class TimerPassive implements Timer {
	public readonly running: StrongBoolean;
	public readonly interval: StrongDouble;
	public readonly lastTrigger: StrongDouble;
	public readonly triggerLimit: StrongUInt;
	public timeStart: Time;

	constructor() {
		this.running = makeBoolean(false);
		this.interval = makeDouble(0);
		this.lastTrigger = makeDouble(0);
		this.triggerLimit = makeUInt(0);
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

	public trigger(): void {}

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
