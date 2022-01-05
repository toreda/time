
[![Toreda](https://content.toreda.com/logo/toreda-logo.png)](https://www.toreda.com)

[![CI](https://img.shields.io/github/workflow/status/toreda/time/CI?style=for-the-badge)](https://github.com/toreda/time/actions) [![Coverage](https://img.shields.io/sonar/coverage/toreda_time?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)](https://sonarcloud.io/project/activity?graph=coverage&id=toreda_time) [![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/toreda_time?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)](https://sonarcloud.io/dashboard?id=toreda_time)

[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/toreda/time/master?style=for-the-badge)](https://github.com/toreda/time/releases/latest) [![GitHub Release Date](https://img.shields.io/github/release-date/toreda/time?style=for-the-badge)](https://github.com/toreda/time/releases/latest) [![GitHub issues](https://img.shields.io/github/issues/toreda/time?style=for-the-badge)](https://github.com/toreda/time/issues)

 [![license](https://img.shields.io/github/license/toreda/time?style=for-the-badge)](https://github.com/toreda/time/blob/master/LICENSE)

&nbsp;
# `@toreda/time`
Fast &amp; easy time math and time unit conversions.

&nbsp;

## Use Cases
* **Time since date**
  * Get seconds or any other time unit since `date`, `datetime`, `timestamp`, or `unix timestamp`.
* **Time until date**
  * Get seconds or other time unit until `date`, `datetime`, `timestamp`, or `unix timestamp`.
* **Now**
  * Get current timestamp (now) in seconds or other time unit.
* **Now (with offset)`**
  * Get current timestamp (now) with an offset in the past or future.
* **DateTime Parsing**
  * Parse strings as `DateTime` strings.
  * Convert to any other time unit.
* **Unix Timestamps**
  * Parse `Unix Timstamps` (seconds) &amp; convert to other time units.
  * Convert `DateTime` strings to `Unix Timestamp`.

&nbsp;

## Highlights
* **TypeScript Native**
  * All types included with package.
  * No separate `@types` package eliminates sync issues between types and the library.
* **Minimalist**
  * Small set of library functions for time calculations.
  * Get what you need without extra bloat.
* **Lightweight**
  * **`253 kB`** unpacked.
* **Modern Alternative**
  * Modern replacement for the excellent [`moment.js`](https://momentjs.com/docs/#/-project-status/) (no longer maintained).
* **Tree-Shaking**
  * Package optimizations helps modern bundlers drop unused code.

&nbsp;

# Install

## `npmjs.org`

## NPM Package
`@toreda/time` is available as an [NPM package](https://www.npmjs.com/package/@toreda/time).
### Yarn Install (preferred)
```bash
yarn add @toreda/time
```

### NPM Install
```bash
npm install @toreda/time
```

&nbsp;
# Source Code
`@toreda/time` source files can be downloaded directly from the public [Github repo](https://github.com/toreda/time).
## Branches
* `master` branch
  * Latest release &amp; stable code.
  * Use for production builds.
* `develop` branch
  * All completed but unreleased features pending release.
  * Generally stable, but not guaranteed.
  * Not suitable for production builds.

## Git Clone (ssh)
```bash
git@github.com:toreda/time.git
```

## Git Clone (https)
```bash
https://github.com/toreda/time.git
```

## Download Zip (https)
Download the current master branch as a zip file
```https://github.com/toreda/time/archive/refs/heads/master.zip```

&nbsp;

# Usage

## Time Objects

**Create Time object**
```typescript
import type {Time} from '@toreda/time';
import {timeMake} from '@toreda/time';

// Create time object in unit 'seconds' with value 0.
const time = timeMake('s', ,0);
```

**Set Time**
```typescript
// Set time using a Unix Timestamp (in seconds)
time.set(1635577204);

// Set using ISO-8601 string
time.set('2021-10-30T06:13:33+00:00');
```

**Set current time (now)**
```typescript
// Set Time to current time.
time.setNow();
```

## Timestamps

### Unix Timestamp

**Create unix timestamp**
```typescript
import {unixTimestampNow} from '@toreda/time';

// Returns current unix timestamp in seconds at time of call.
const now = unixTimestampNow();

```

**Set current time using Unix Timestamp**
```typescript
import type {Time} from '@toreda/time';
import {timeMake, unixTimestampNow} from '@toreda/time';
const now = unixTimestampNow();

const time = timeMake('s');
time.set(now);
```

## Validation
**Check if string is a valid & supported time unit**
```typescript
import {timeUnitSupported} from '@toreda/time';

// Outputs: 'supported: true'
console.info('supported: ' + timeUnitSupported('s'));

// Outputs: 'supported: true'
console.info('supported: ' + timeUnitSupported('w'));

// Outputs: 'supported: false'
console.info('supported: ' + timeUnitSupported());

// Outputs: 'supported: false'
console.info('supported: ' + timeUnitSupported({}));

// Outputs: 'supported: false'
console.info('supported: ' + timeUnitSupported('???'));
```

**Check if object is a Time object**
```typescript
import {timeValid, timeNow} from '@toreda/time';
const now = timeNow();

// Outputs `is valid: true`
console.log('is valid: ' + timeValid(time));

// Outputs `is valid: false`
console.log('is valid: ' + timeValid({}));

// Outputs `is valid: false`
console.log('is valid: ' + timeValid(null));

// Outputs `is valid: false`
console.log('is valid: ' + timeValid(undefined));

```

&nbsp;

# Source Code
`@toreda/time` is an open source package provided under the MIT License. Download, clone, or check the complete project source [here on Github](https://www.npmjs.com/package/@toreda/time). We welcome bug reports, comments, and pull requests.


&nbsp;

# Legal

## License
[MIT](LICENSE) &copy; Toreda, Inc.


## Copyright
Copyright &copy; 2019 - 2022 Toreda, Inc. All Rights Reserved.


## Website
Toreda's company website can be found at [toreda.com](https://www.toreda.com)
