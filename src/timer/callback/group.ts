import type {TimerCallback} from '../callback';
import type {TimerCallbackSync} from './sync';
import {timerCallbackGroupIdNext} from './group/id';

export type TimerCallbackKind = 'once' | 'always';
export type TimerCallbackFn = TimerCallback | TimerCallbackSync;

/**
 * @category Timers
 */
export class TimerCallbackGroup {
	public readonly id: string;
	private readonly _once: TimerCallbackFn[];
	private readonly _always: TimerCallbackFn[];

	constructor(id?: string | null) {
		this.id = typeof id === 'string' && id.length > 0 ? id : timerCallbackGroupIdNext();
		this._once = [];
		this._always = [];
	}

	public reset(): void {
		this._once.length = 0;
		this._always.length = 0;
	}

	public onceCt(): number {
		return this._once.length;
	}

	public alwaysCt(): number {
		return this._always.length;
	}

	public on(kind: TimerCallbackKind, fn: TimerCallbackFn): boolean {
		if (typeof fn !== 'function') {
			return false;
		}

		const list = kind === 'once' ? this._once : this._always;
		list.push(fn);
		return true;
	}

	public once(fn: TimerCallbackFn): boolean {
		return this.on('once', fn);
	}

	public always(fn: TimerCallbackFn): boolean {
		return this.on('always', fn);
	}

	public remove(kind: TimerCallbackKind, fn: TimerCallbackFn): boolean {
		const list = kind === 'once' ? this._once : this._always;
		const i = list.indexOf(fn);
		if (i === -1) {
			return false;
		}

		list.splice(i, 1);
		return true;
	}

	public async invoke(fn: TimerCallbackFn, duration?: number | null): Promise<void> {
		const value = typeof duration === 'number' ? duration : 0;

		try {
			fn(value);
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error(`Callback group invoke error: ${e.message}`);
			}
		}
	}

	public async executeAll(duration?: number | null): Promise<void> {
		await this.executeOnce(duration);
		await this.executeAlways(duration);
	}

	public async executeOnce(duration?: number | null): Promise<void> {
		for (let i = this._once.length - 1; i >= 0; i--) {
			const item = this._once[i];
			await this.invoke(item, duration);

			// Listener was one-time use. Remove it after invoking it.
			this._once.splice(i, 1);
		}
	}

	public async executeAlways(duration?: number | null): Promise<void> {
		for (const item of this._always) {
			await this.invoke(item, duration);
		}
	}
}
