# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

[0.2.0] - 2026-05-08

### Added
* `TimeUtils` class exported from the package root, providing static helpers `canConvert`, `withinSafeRange`, `resolveDecimals`, and `roundToDecimals`.
* All time functions that accepted `value: number` & similar now also accept a wide range of `string` time values.
* `timeValueParse(value, units)` — parses duration values (numbers, numeric strings, simple suffix like `'5m'`, `'-1.5h'`, and compound suffix like `'1h30m'`, `'2d4h30m'`) into a number expressed in the target unit. Compound forms must use canonical units in descending order (`y > mo > w > d > h > m > s > ms > μs`) with no repeats and no whitespace; sign applies to the whole expression. Date-like strings are rejected — use `timeValueParseDate` instead.
* `timeValueParseDate(value, units)` — parses timestamp values via `Date.parse`. Numeric input is treated as already a timestamp in the target unit; pre-epoch results return `null`.
* `timeFromDate(input, units?, log?)` — factory that builds a `Time` from a date string or numeric timestamp. Defaults to `'s'`.
* `timeUnitValue(fallback, ...values)` — returns the first value that is a valid canonical `TimeUnit`, or `fallback` when none match.
* `elapsed` is now included in `timeMethods` and is required for an object to pass `timeValid`. Previously `elapsed` was declared on the `Time` interface but missing from the runtime methods list.
* All unit factory functions (`years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`, `microseconds`) now accept an optional `log?: LogLike` argument, matching `months` and `timeMake`.
* `initial` arguments on `timeMake` and the unit factories now accept `number | string`. String inputs are routed through `timeValueParse`; unparseable values fall back to `0` and are logged, matching the existing sanitize contract.

### Changed
* Optional `log` arguments in various helpers are now `LogLike` (from this package) instead of `@toreda/log` to allow any standard logger with `info`/`warn`/`error`/`debug`/`trace` to be used.
* `timeUntil` and `timeSince` now return `Time | null` (matching the `Time.until` / `Time.since` interface declarations), and accept an optional second `units` argument so callers can preserve sub-second precision. Previously both helpers always returned a non-null `Time` rounded to seconds, which silently dropped precision and could not signal invalid input.
* `Time.type` is now the literal `'Time'` instead of `'Time' | string`. The runtime check in `timeCheckType` was already enforcing this; the type now matches.
* `timeCheckMethods` now also requires that the candidate is itself callable (`Time` instances are callable). Object literals with all the right method properties but no call signature no longer pass `timeValid`.
* **Breaking**: `TimerActive` and `TimerPassive` boolean fields (`running`, `paused`, `limitDuration`) are now plain mutable booleans instead of `@toreda/strong-types` `Bool` wrappers. Read with `timer.running` (not `timer.running()`); write with `timer.running = true` (not `timer.running(true)`).
* **Breaking**: `TimerActive.lastIntervalEnd` and `TimerPassive.{interval, lastTrigger, triggerLimit}` are now backed by an internal callable `Mutable<number>` helper instead of `@toreda/strong-types` `Float` / `UInt`. The call-style read/write API (`timer.interval()`, `timer.interval(5)`) is preserved.

### Fixed
* `unixTimestampNow` now ignores non-finite `offset` values (`NaN`, `Infinity`, `-Infinity`) instead of returning a non-finite result.
* Duplicate `'asDays'` entry in `timeMethods` removed.

### Removed
* `@toreda/strong-types` is no longer a peer or dev dependency. The three internal usages (`TimerActive`, `TimerPassive`, `TimerCallbackGroup`) were replaced with plain TypeScript primitives or a small internal `Mutable<T>` helper. Reduces install size and removes a transitive `big.js` dependency.

### Deprecated
* Top-level `canConvert` export is deprecated in favor of `TimeUtils.canConvert`. The re-export is preserved for backwards compatibility and will be removed in a future major release.


[0.1.5] - 2022-04-11

### Maintenance
* Updated all packages to latest available.
* Removed `postcss` package from dependencies. It is not directly used in project but is used by dev packages.
* Ran `yarn upgrade` on project.

[0.2.0]: https://github.com/toreda/time/releases/compare/v0.1.5...v0.2.0 
[0.1.5]: https://github.com/toreda/time/releases/compare/v0.0.0...v0.1.5 
[unreleased]: https://github.com/toreda/time/compare/v0.2.0...HEAD
