import {TimerActive} from '../src/timer/active';

const timer = new TimerActive({
	limitDuration: true,
	timeLimit: 5
});

async function startListener(): Promise<void> {
	console.info('Timer started');
}

async function doneListener(): Promise<void> {
	console.info('async listener');
}

function doneListenerSync(): void {
	console.info('sync listener');
}

timer.once('start', startListener);
timer.on('done', doneListenerSync);
timer.on('done', doneListener);

timer.start();
