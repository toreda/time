import {StrongBoolean, StrongDouble, makeBoolean, makeDouble} from '@toreda/strong-types';

import {timeNow} from '../time/now';

/**
 * Active timer with internal timing clock. Takes a callback to invoke
 * every timer trigger.
 */
export class TimerActive {
	public readonly lastIntervalEnd: StrongDouble;
	public readonly running: StrongBoolean;
	public readonly handlersBound: StrongBoolean;

	constructor() {
		this.lastIntervalEnd = makeDouble(0);
		this.running = makeBoolean(false);
		this.handlersBound = makeBoolean(false);
	}

	public bindHandlers(): void {
		if (this.handlersBound()) {
			return;
		}

		// Mark handlers as bound.
		this.handlersBound(true);

		this.onUpdate = this.onUpdate.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.reset = this.reset.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
	}

	/**
	 * Start the timer.
	 * @returns
	 */
	public start(): boolean {
		// Timer is already running.
		if (this.running()) {
			return false;
		}

		this.bindHandlers();

		return this.running(true);
	}

	public stop(): boolean {
		// Time isn't running. Nothing to stop!
		if (!this.running()) {
			return false;
		}

		return this.running(false);
	}

	public reset(): void {
		this.stop();
		this.lastIntervalEnd.reset();
	}

	public onUpdate(): void {
		const now = timeNow();
	}
}
