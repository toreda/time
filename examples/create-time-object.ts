import {timeMake} from '../src/time/make';

// Create new time object with native unit 'seconds'
// and current value 0.
const time = timeMake('s', 0);

// Print time object's value: 0
console.log(time());
