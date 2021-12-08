
[![Toreda](https://content.toreda.com/logo/toreda-logo.png)](https://www.toreda.com)

# `@toreda/time`

![CI](https://github.com/toreda/time/workflows/CI/badge.svg?branch=master) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=toreda_time&metric=coverage)](https://sonarcloud.io/dashboard?id=toreda_time) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=toreda_time&metric=alert_status)](https://sonarcloud.io/dashboard?id=toreda_time)

Helpers for common time &amp; timer functionality.

&nbsp;

# Install
`@toreda/time` is available as an [NPM package](https://www.npmjs.com/package/@toreda/time).

&nbsp;

**Install with yarn:**
```bash
yarn add @toreda/time
```

**or Install with NPM:**
```bash
npm install @toreda/time
```

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
Copyright &copy; 2019 - 2021 Toreda, Inc. All Rights Reserved.

https://www.toreda.com
