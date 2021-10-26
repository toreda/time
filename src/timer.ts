/**
 * @category Timers
 */
export interface Timer {
	start: () => boolean;
	stop: () => boolean;
	onUpdate?: () => void;
	reset: () => void;
}
