

# `@toreda/time`

![Toreda](https://content.toreda.com/logo/toreda-logo.png)

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

**Create new Time object**
```typescript
import type {Time} from '@toreda/time';
import {timeMake} from '@toreda/time';

// Create time object in unit 'seconds' with value 0.
const time = timeMake('s', ,0);
```

## Timestamps

### Unix Timestamp

**Create unix timestamp**
```typescript
import {unixTimestampNow} from '@toreda/time';

// Returns current unix timestamp in seconds at time of call.
const now = unixTimestampNow();

```


&nbsp;


# Source Code
`@toreda/time` is an open source package provided under the MIT License. Download, clone, or check the complete project source [here on Github](https://www.npmjs.com/package/@toreda/time). We welcome bug reports, comments, and pull requests.


# License

[MIT](LICENSE) &copy; Toreda, Inc.
