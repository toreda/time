import {timeNow} from '../src/time/now';

// Create time object set to the unix timestamp when
// `timeNow` is called. Does not update timestamp automatically.
const now = timeNow('s');

// Print current value (current time in seconds).
console.log(now());
