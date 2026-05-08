import type {Mutable} from '../mutable';
import type {Time} from '../time';
import {TimerCallback} from './callback';
import {TimerCallbackGroup} from './callback/group';
import {TimerCallbackSync} from './callback/sync';
import type {TimerEventId} from './event/id';
import type {TimerOptions} from './options';
import {mutable} from '../mutable';
import {timeMake} from '../time/make';
import {timeNow} from '../time/now';

/**
 * Active timer driven by external ticker calls to `onUpdate`.
 *
 * @category Timers
 */
export class TimerActive {
	public readonly lastIntervalEnd: Mutable<number>;
	public limitDuration: boolean;
	public readonly listeners: Record<TimerEventId, TimerCallbackGroup>;
	public paused: boolean;
	public running: boolean;
	public readonly timeLimit: Time;
	public readonly timeStart: Time;
	public readonly timeStop: Time;

	constructor(options?: TimerOptions) {
		this.lastIntervalEnd = mutable(0);
		this.running = false;

		this.limitDuration = typeof options?.limitDuration === 'boolean' ? options.limitDuration : false;
		this.timeStart = timeMake('s', 0);
		this.timeStop = timeMake('s', 0);
		const timeLimit = typeof options?.timeLimit === 'number' ? options.timeLimit : 0;
		this.timeLimit = timeMake('s', timeLimit);
		this.paused = false;

		this.listeners = {
			start: new TimerCallbackGroup('start'),
			stop: new TimerCallbackGroup('stop'),
			pause: new TimerCallbackGroup('pause'),
			unpause: new TimerCallbackGroup('unpause'),
			done: new TimerCallbackGroup('done'),
			restart: new TimerCallbackGroup('restart'),
			reset: new TimerCallbackGroup('reset')
		};

		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
	}

	public getListenerGroup(id: TimerEventId): TimerCallbackGroup | null {
		const group = this.listeners[id];
		if (!group) {
			return null;
		}

		return group;
	}

	public on(id: TimerEventId, fn: TimerCallback | TimerCallbackSync): boolean {
		if (typeof fn !== 'function') {
			return false;
		}

		const group = this.getListenerGroup(id);
		if (!group) {
			return false;
		}

		return group.always(fn);
	}

	public once(id: TimerEventId, fn: TimerCallback | TimerCallbackSync): boolean {
		if (typeof fn !== 'function') {
			return false;
		}

		const group = this.getListenerGroup(id);
		if (!group) {
			return false;
		}

		return group.once(fn);
	}

	public setTimeLimit(value: number | Time): boolean {
		if (value === undefined || value === null) {
			return false;
		}

		if (typeof value === 'number') {
			this.timeLimit.set(value);
			return true;
		}

		if (value.type === 'Time') {
			this.timeLimit.set(value.asSeconds());
			return true;
		}

		return false;
	}

	public async unpause(): Promise<boolean> {
		if (!this.running || !this.paused) {
			return false;
		}

		await this.executeCallbacks('unpause');
		this.paused = false;
		return true;
	}

	public async pause(): Promise<boolean> {
		if (!this.running || this.paused) {
			return false;
		}

		await this.executeCallbacks('pause');
		this.paused = true;
		return true;
	}

	/**
	 * Start the timer.
	 */
	public async start(): Promise<boolean> {
		if (this.running) {
			return false;
		}

		this.timeStart.setNow();
		await this.executeCallbacks('start');

		this.running = true;
		return true;
	}

	public async done(): Promise<boolean> {
		if (!this.running) {
			return false;
		}

		await this.executeCallbacks('done');
		return this.stop();
	}

	public async stop(): Promise<boolean> {
		if (!this.running) {
			return false;
		}

		this.timeStop.setNow();
		await this.executeCallbacks('stop');

		this.running = false;

		return true;
	}

	public async executeCallbacks(eventId: TimerEventId): Promise<void> {
		const group = this.listeners[eventId];
		if (!group) {
			return;
		}

		const elapsed = this.timeStart.since(timeNow());
		const duration = elapsed ? elapsed() : 0;

		await group.executeAll(duration);
	}

	public onUpdate(): void {
		if (!this.running) {
			return;
		}

		const now = timeNow();

		if (this.limitDuration) {
			const duration = this.timeStart.since(now);
			if (duration && duration() >= this.timeLimit()) {
				this.done();
				return;
			}
		}
	}
}
