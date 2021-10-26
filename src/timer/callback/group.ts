import {StrongArray, arrayMake, idMake} from '@toreda/strong-types';

import type {Id} from '@toreda/strong-types';
import {TimerCallback} from '../callback';
import {TimerCallbackSync} from './sync';

/**
 * @category Timers
 */
export class TimerCallbackGroup {
	public readonly id: Id;
	public readonly _once: StrongArray<TimerCallback | TimerCallbackSync>;
	public readonly _always: StrongArray<TimerCallback | TimerCallbackSync>;

	constructor(id: string) {
		this.id = idMake('timer', id);
		this._once = arrayMake([], []);
		this._always = arrayMake([], []);
	}

	public reset(): void {
		this._once.reset();
		this._once([]);
		this._always.reset();
		this._always([]);
	}

	public async execute(duration?: number | null): Promise<void> {
		await this.once(duration);
		await this.always(duration);
	}

	public async invoke(fn: TimerCallback | TimerCallbackSync, duration?: number | null): Promise<void> {
		const value = typeof duration === 'number' ? duration : 0;

		try {
			if (fn.constructor.name === 'AsyncFunction') {
				await fn(value);
			} else {
				fn(value);
			}
		} catch (e: unknown) {}
	}

	public async once(duration?: number | null): Promise<void> {
		const items = this._once();

		for (let i = items.length - 1; i >= 0; i--) {
			const item = items[i];
			await this.invoke(item, duration);

			// Listener was one-time use. Remove it after invoking it.
			items.splice(i, 1);
		}
	}

	public async always(duration?: number | null): Promise<void> {
		const items = this._always();
		if (!Array(items)) {
			return;
		}

		for (const item of items) {
			await this.invoke(item, duration);
		}
	}
}
