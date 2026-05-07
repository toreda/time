import type {Id} from '@toreda/strong-types';
import {idMake} from '@toreda/strong-types';

import type {TimerCallback} from '../callback';
import type {TimerCallbackSync} from './sync';

/**
 * @category Timers
 */
export class TimerCallbackGroup {
	public readonly id: Id;
	private readonly _once: (TimerCallback | TimerCallbackSync)[];
	private readonly _always: (TimerCallback | TimerCallbackSync)[];

	constructor(id: string) {
		this.id = idMake('timer', id);
		this._once = [];
		this._always = [];
	}

	public reset(): void {
		this._once.length = 0;
		this._always.length = 0;
	}

	public async execute(duration?: number | null): Promise<void> {
		await this.once(duration);
		await this.always(duration);
	}

	public async invoke(fn: TimerCallback | TimerCallbackSync, duration?: number | null): Promise<void> {
		const value = typeof duration === 'number' ? duration : 0;

		try {
			fn(value);
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error(`Callback group invoke error: ${e.message}`);
			}
		}
	}

	public async once(duration?: number | null): Promise<void> {
		for (let i = this._once.length - 1; i >= 0; i--) {
			const item = this._once[i];
			await this.invoke(item, duration);

			// Listener was one-time use. Remove it after invoking it.
			this._once.splice(i, 1);
		}
	}

	public async always(duration?: number | null): Promise<void> {
		for (const item of this._always) {
			await this.invoke(item, duration);
		}
	}
}
