import type {Bool, Float} from '@toreda/strong-types';
import {boolMake, floatMake} from '@toreda/strong-types';

import {Defaults} from '../defaults';
import type {Time} from '../time';
import {Timer} from '../timer';
import {TimerCallback} from './callback';
import {TimerCallbackGroup} from './callback/group';
import {TimerCallbackSync} from './callback/sync';
import type {TimerEventId} from './event/id';
import type {TimerOptions} from './options';
import {timeMake} from '../time/make';
import {timeNow} from '../time/now';

/**
 * Active timer with internal timing clock. Takes a callback to invoke
 * every timer trigger.
 *
 * @category Timers
 */
export class TimerActive {
	private _timerHandle: unknown;
	private readonly _checkIntervalMs: Time;
	public readonly _handlersBound: Bool;
	public readonly lastIntervalEnd: Float;
	public readonly limitDuration: Bool;
	public readonly listeners: Record<TimerEventId, TimerCallbackGroup>;
	public readonly paused: Bool;
	public readonly running: Bool;
	public readonly timeLimit: Time;
	public readonly timeStart: Time;
	public readonly timeStop: Time;

	constructor(options?: TimerOptions) {
		this.lastIntervalEnd = floatMake(0);
		this.running = boolMake(false);
		this._handlersBound = boolMake(false);

		const limitDuration = typeof options?.limitDuration === 'boolean' ? options?.limitDuration : false;
		this.limitDuration = boolMake(limitDuration);
		this._checkIntervalMs = timeMake('ms', Defaults.Timer.CheckIntervalMs);
		this.timeStart = timeMake('s', 0);
		this.timeStop = timeMake('s', 0);
		const timeLimit = typeof options?.timeLimit === 'number' ? options?.timeLimit : 0;
		this.timeLimit = timeMake('s', timeLimit);
		this.paused = boolMake(false);

		this.listeners = {
			start: new TimerCallbackGroup('start'),
			stop: new TimerCallbackGroup('stop'),
			pause: new TimerCallbackGroup('pause'),
			unpause: new TimerCallbackGroup('unpause'),
			done: new TimerCallbackGroup('done'),
			restart: new TimerCallbackGroup('restart'),
			reset: new TimerCallbackGroup('reset')
		};
	}

	public getListenerGroup(id: TimerEventId): TimerCallbackGroup | null {
		if (typeof id !== 'string') {
			return null;
		}

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

		group._always().push(fn);
		return true;
	}

	public once(id: TimerEventId, fn: Timer | TimerCallbackSync): boolean {
		if (typeof fn !== 'function') {
			return false;
		}

		const group = this.getListenerGroup(id);
		if (!group) {
			return false;
		}

		group._once().push(fn);
		return true;
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

	public bindHandlers(): void {
		if (this._handlersBound()) {
			return;
		}

		// Mark handlers as bound.
		this._handlersBound(true);

		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.reset = this.reset.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
	}

	public async unpause(): Promise<boolean> {
		if (!this.running() || !this.paused()) {
			return false;
		}

		await this.executeCallbacks('unpause');
		this.paused(false);
		return true;
	}

	public async pause(): Promise<boolean> {
		if (!this.running() || this.paused()) {
			return false;
		}

		await this.executeCallbacks('pause');
		return this.paused(true);
	}

	/**
	 * Start the timer.
	 * @returns
	 */
	public async start(): Promise<boolean> {
		// Timer is already running.
		if (this.running()) {
			return false;
		}

		this.bindHandlers();
		this.timeStart.setNow();
		this._timerHandle = setTimeout(this.onUpdate, Defaults.Timer.CheckIntervalMs);
		await this.executeCallbacks('start');

		return this.running(true);
	}

	public async done(): Promise<boolean> {
		if (!this.running()) {
			return false;
		}

		await this.executeCallbacks('done');
		return this.stop();
	}

	public async stop(): Promise<boolean> {
		// Time isn't running. Nothing to stop!
		if (!this.running()) {
			return false;
		}

		clearInterval(this._timerHandle as number);
		this.timeStop.setNow();
		const timeSince = this.timeStart.since(this.timeStop());
		const value = timeSince ? timeSince() : 0;
		this.listeners.stop.always(value);

		this.running(false);

		return true;
	}

	public async executeCallbacks(eventId: TimerEventId): Promise<void> {
		const group = this.listeners[eventId];
		if (!group) {
			return;
		}
		const now = timeNow();
		const timeSince = now.since(now());
		const duration = timeSince ? timeSince() : 0;

		await group.execute(duration);
	}

	public reset(): void {
		this.stop();

		this.lastIntervalEnd.reset();
		this.listeners.done.reset();
		this.listeners.pause.reset();
		this.listeners.reset.reset();
		this.listeners.restart.reset();
		this.listeners.start.reset();
		this.listeners.stop.reset();
		this.listeners.unpause.reset();
		this.running(false);
		this.paused(false);
		this.limitDuration.reset();
	}

	public onUpdate(): void {
		if (!this.running()) {
			return;
		}

		const now = timeNow();

		// Fixed duration timers should stop when reaching their time limit.
		if (this.limitDuration()) {
			const duration = this.timeStart.since(now);
			if (duration && duration() >= this.timeLimit()) {
				this.done();
				return;
			}
		}
	}
}
