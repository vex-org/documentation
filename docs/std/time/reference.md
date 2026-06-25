# Project v0.0.0

## Overview

**Structs:** [`Location`](#Location) · [`ScanResult`](#ScanResult) · [`ScanResult64`](#ScanResult64) · [`Timer`](#Timer) · [`Ticker`](#Ticker) · [`DateParts`](#DateParts) · [`DateTimeParts`](#DateTimeParts) · [`Time`](#Time) · [`Duration`](#Duration)

**Enums:** [`Month`](#Month) · [`Weekday`](#Weekday)

**Functions:** [`UTC`](#UTC) · [`Local`](#Local) · [`fixedZone`](#fixedZone) · [`loadLocation`](#loadLocation) · [`EST`](#EST) · [`PST`](#PST) · [`CET`](#CET) · [`TRT`](#TRT) · [`JST`](#JST) · [`isDigit`](#isDigit) · [`scan_int_at`](#scan_int_at) · [`scan_number_at`](#scan_number_at) · [`scan_nanos_at`](#scan_nanos_at) · [`parts_to_ns`](#parts_to_ns) · [`parse`](#parse) · [`parse_rfc3339`](#parse_rfc3339) · [`parse_duration`](#parse_duration) · [`now`](#now) · [`sleep`](#sleep) · [`monotonicNow`](#monotonicNow) · [`sleepDuration`](#sleepDuration) · [`getLocalOffset`](#getLocalOffset) · [`since`](#since) · [`until`](#until) · [`truncate`](#truncate) · [`round`](#round) · [`unix`](#unix) · [`unix_seconds`](#unix_seconds) · [`unix_nanosecond`](#unix_nanosecond) · [`unix_milli`](#unix_milli) · [`unix_micro`](#unix_micro) · [`compare`](#compare) · [`before`](#before) · [`after`](#after) · [`equal`](#equal) · [`after`](#after) · [`weekday`](#weekday) · [`date`](#date) · [`clock`](#clock) · [`normalized_delay_ns`](#normalized_delay_ns) · [`newTimer`](#newTimer) · [`newTicker`](#newTicker) · [`afterDuration`](#afterDuration) · [`tz_pad2`](#tz_pad2) · [`tz_pad4`](#tz_pad4) · [`formatInLocation`](#formatInLocation) · [`toRFC3339InLocation`](#toRFC3339InLocation) · [`inLocation`](#inLocation) · [`isDST`](#isDST) · [`days_in_month`](#days_in_month) · [`ns_to_datetime`](#ns_to_datetime) · [`add`](#add) · [`sub`](#sub) · [`pad2`](#pad2) · [`pad4`](#pad4) · [`abs_date`](#abs_date) · [`is_leap`](#is_leap) · [`nsToDateTime`](#nsToDateTime) · [`fmt_int`](#fmt_int) · [`format_layout`](#format_layout) · [`utc`](#utc) · [`local`](#local) · [`fixed_zone`](#fixed_zone) · [`load_location`](#load_location) · [`seconds`](#seconds) · [`milliseconds`](#milliseconds) · [`microseconds`](#microseconds) · [`nanoseconds`](#nanoseconds) · [`minutes`](#minutes) · [`hours`](#hours)

**Constants:** [`NANOSECOND`](#NANOSECOND) · [`MICROSECOND`](#MICROSECOND) · [`MILLISECOND`](#MILLISECOND) · [`SECOND`](#SECOND) · [`MINUTE`](#MINUTE) · [`HOUR`](#HOUR) · [`DAY`](#DAY) · [`RFC3339`](#RFC3339)

## Constants

### <a id="NANOSECOND"></a>`NANOSECOND` `🔓 export`

&gt; 📄 `constants.vx` L33-33

```vex
export const NANOSECOND: i64=1;
```

**Returns:** `i64=1;`

---

### <a id="MICROSECOND"></a>`MICROSECOND` `🔓 export`

&gt; 📄 `constants.vx` L34-34

```vex
export const MICROSECOND: i64=1000 * NANOSECOND;
```

**Returns:** `i64=1000 * NANOSECOND;`

---

### <a id="MILLISECOND"></a>`MILLISECOND` `🔓 export`

&gt; 📄 `constants.vx` L35-35

```vex
export const MILLISECOND: i64=1000 * MICROSECOND;
```

**Returns:** `i64=1000 * MICROSECOND;`

---

### <a id="SECOND"></a>`SECOND` `🔓 export`

&gt; 📄 `constants.vx` L36-36

```vex
export const SECOND: i64=1000 * MILLISECOND;
```

**Returns:** `i64=1000 * MILLISECOND;`

---

### <a id="MINUTE"></a>`MINUTE` `🔓 export`

&gt; 📄 `constants.vx` L37-37

```vex
export const MINUTE: i64=60 * SECOND;
```

**Returns:** `i64=60 * SECOND;`

---

### <a id="HOUR"></a>`HOUR` `🔓 export`

&gt; 📄 `constants.vx` L38-38

```vex
export const HOUR: i64=60 * MINUTE;
```

**Returns:** `i64=60 * MINUTE;`

---

### <a id="DAY"></a>`DAY` `🔓 export`

&gt; 📄 `constants.vx` L39-39

```vex
export const DAY: i64=24 * HOUR;
```

**Returns:** `i64=24 * HOUR;`

---

### <a id="RFC3339"></a>`RFC3339` `🔓 export`

&gt; 📄 `constants.vx` L42-42

```vex
export const RFC3339: string="2006-01-02T15:04:05Z07:00";
```

**Returns:** `string="2006-01-02T15:04:05Z07:00";`

---

## Structs

### <a id="Location"></a>`Location` `🔓 export`

&gt; 📄 `location.vx` L13-23

```vex
export struct Location
```

**Implements:** `Display` & `Clone`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `string` | 🔒 private |  |
| `offsetSeconds` | `i64` | 🔒 private |  |
| `isDynamic` | `i32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Location.utc`[↗](#Location.utc) | `export fn Location.utc(): Location` |  |
| `Location.local`[↗](#Location.local) | `export fn Location.local(): Location` |  |
| `Location.fixedZone`[↗](#Location.fixedZone) | `export fn Location.fixedZone(name: string, offsetS` |  |
| `Location.load`[↗](#Location.load) | `export fn Location.load(name: string): Result&lt;Loca` |  |
| `offset`[↗](#Location.offset) | `export fn (self: &Location) offset(): i64` | Standard (base) offset in seconds. |
| `offsetAtUnix`[↗](#Location.offsetAtUnix) | `export fn (self: &Location) offsetAtUnix(unixSec: ` | Actual UTC offset at an arbitrary Unix timestamp. |
| `offsetAt`[↗](#Location.offsetAt) | `export fn (self: &Location) offsetAt(t: Time): i64` | Offset at a Time instant. |
| `offsetHours`[↗](#Location.offsetHours) | `export fn (self: &Location) offsetHours(): i32` | Offset in whole hours. |
| `clone`[↗](#Location.clone) | `export fn (self: &Location) clone(): Location` | Clone. |
| `toString`[↗](#Location.toString) | `export fn (self: &Location) toString(): string` | Display: "America/New_York (UTC-5)" |

---

### <a id="ScanResult"></a>`ScanResult` `🔓 export`

&gt; 📄 `parse.vx` L7-11

```vex
export struct ScanResult
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `value` | `i32` | 🔓 public |  |
| `count` | `i32` | 🔓 public |  |

---

### <a id="ScanResult64"></a>`ScanResult64` `🔓 export`

&gt; 📄 `parse.vx` L12-16

```vex
export struct ScanResult64
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `value` | `i64` | 🔓 public |  |
| `count` | `i32` | 🔓 public |  |

---

### <a id="Timer"></a>`Timer` `🔓 export`

&gt; 📄 `helpers.vx` L124-129

```vex
export struct Timer
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `deadline_ns` | `u64` | 🔓 public |  |
| `fired` | `bool` | 🔓 public |  |
| `active` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Timer.new`[↗](#Timer.new) | `export fn Timer.new(d: Duration): Timer` |  |
| `expired`[↗](#Timer.expired) | `export fn (self: &Timer) expired(): bool` |  |
| `poll`[↗](#Timer.poll) | `export fn (self: &Timer!) poll(): bool` |  |
| `reset`[↗](#Timer.reset) | `export fn (self: &Timer!) reset(d: Duration)` |  |
| `stop`[↗](#Timer.stop) | `export fn (self: &Timer!) stop()` |  |
| `wait`[↗](#Timer.wait) | `export fn (self: &Timer!) wait(): Time` |  |

---

### <a id="Ticker"></a>`Ticker` `🔓 export`

&gt; 📄 `helpers.vx` L210-215

```vex
export struct Ticker
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `interval_ns` | `u64` | 🔓 public |  |
| `last_tick_ns` | `u64` | 🔓 public |  |
| `active` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Ticker.new`[↗](#Ticker.new) | `export fn Ticker.new(d: Duration): Ticker` |  |
| `tick`[↗](#Ticker.tick) | `export fn (self: &Ticker!) tick(): bool` |  |
| `reset`[↗](#Ticker.reset) | `export fn (self: &Ticker!) reset(d: Duration)` |  |
| `stop`[↗](#Ticker.stop) | `export fn (self: &Ticker!) stop()` |  |

---

### <a id="DateParts"></a>`DateParts`

&gt; 📄 `time_type.vx` L27-32

```vex
struct DateParts
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `y` | `i32` | 🔒 readonly |  |
| `m` | `i32` | 🔒 readonly |  |
| `d` | `i32` | 🔒 readonly |  |

---

### <a id="DateTimeParts"></a>`DateTimeParts` `🔓 export`

&gt; 📄 `time_type.vx` L35-44

```vex
export struct DateTimeParts
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `y` | `i32` | 🔒 readonly |  |
| `mo` | `i32` | 🔒 readonly |  |
| `d` | `i32` | 🔒 readonly |  |
| `h` | `i32` | 🔒 readonly |  |
| `min` | `i32` | 🔒 readonly |  |
| `s` | `i32` | 🔒 readonly |  |
| `wd` | `i32` | 🔒 readonly |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `year`[↗](#DateTimeParts.year) | `export fn (self: &DateTimeParts) year(): i32` |  |
| `month`[↗](#DateTimeParts.month) | `export fn (self: &DateTimeParts) month(): i32` |  |
| `day`[↗](#DateTimeParts.day) | `export fn (self: &DateTimeParts) day(): i32` |  |
| `hour`[↗](#DateTimeParts.hour) | `export fn (self: &DateTimeParts) hour(): i32` |  |
| `minute`[↗](#DateTimeParts.minute) | `export fn (self: &DateTimeParts) minute(): i32` |  |
| `second`[↗](#DateTimeParts.second) | `export fn (self: &DateTimeParts) second(): i32` |  |
| `weekday`[↗](#DateTimeParts.weekday) | `export fn (self: &DateTimeParts) weekday(): i32` |  |

---

### <a id="Time"></a>`Time` `🔓 export`

&gt; 📄 `time_type.vx` L85-88

```vex
export struct Time
```

**Implements:** `Display` & `Clone`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ns` | `i64` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Time.now`[↗](#Time.now) | `export fn Time.now(): Time` |  |
| `Time.unix`[↗](#Time.unix) | `export fn Time.unix(sec: i64, nsec: i64): Time` |  |
| `clone`[↗](#Time.clone) | `export fn (self: &Time) clone(): Time` |  |
| `toString`[↗](#Time.toString) | `export fn (self: &Time) toString(): string` |  |
| `unix`[↗](#Time.unix) | `export fn (self: &Time) unix(): i64` |  |
| `unixNano`[↗](#Time.unixNano) | `export fn (self: &Time) unixNano(): i64` |  |
| `add`[↗](#Time.add) | `export fn (self: &Time) add(d: i64): Time` |  |
| `sub`[↗](#Time.sub) | `export fn (self: &Time) sub(t: Time): i64` |  |
| `year`[↗](#Time.year) | `export fn (self: &Time) year(): i64` |  |
| `month`[↗](#Time.month) | `export fn (self: &Time) month(): Month` |  |
| `day`[↗](#Time.day) | `export fn (self: &Time) day(): i64` |  |
| `hour`[↗](#Time.hour) | `export fn (self: &Time) hour(): i64` |  |
| `minute`[↗](#Time.minute) | `export fn (self: &Time) minute(): i64` |  |
| `second`[↗](#Time.second) | `export fn (self: &Time) second(): i64` |  |
| `weekday`[↗](#Time.weekday) | `export fn (self: &Time) weekday(): Weekday` |  |
| `addDate`[↗](#Time.addDate) | `export fn (self: &Time) addDate(years: i32, months` |  |
| `withOffset`[↗](#Time.withOffset) | `export fn (self: &Time) withOffset(offsetSec: i64)` |  |
| `formatWithOffset`[↗](#Time.formatWithOffset) | `export fn (self: &Time) formatWithOffset(layout: s` |  |
| `format`[↗](#Time.format) | `export fn (self: &Time) format(layout: str): strin` |  |
| `startOf`[↗](#Time.startOf) | `export fn (self: &Time) startOf(unit: str): Time` |  |
| `endOf`[↗](#Time.endOf) | `export fn (self: &Time) endOf(unit: str): Time` |  |

---

### <a id="Duration"></a>`Duration` `🔓 export`

&gt; 📄 `duration.vx` L4-7

```vex
export struct Duration
```

**Implements:** `Display` & `Clone`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ns` | `i64` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Duration.seconds`[↗](#Duration.seconds) | `export fn Duration.seconds(s: i64): Duration` |  |
| `Duration.milliseconds`[↗](#Duration.milliseconds) | `export fn Duration.milliseconds(ms: i64): Duration` |  |
| `Duration.microseconds`[↗](#Duration.microseconds) | `export fn Duration.microseconds(us: i64): Duration` |  |
| `Duration.nanoseconds`[↗](#Duration.nanoseconds) | `export fn Duration.nanoseconds(ns: i64): Duration` |  |
| `Duration.minutes`[↗](#Duration.minutes) | `export fn Duration.minutes(m: i64): Duration` |  |
| `Duration.hours`[↗](#Duration.hours) | `export fn Duration.hours(h: i64): Duration` |  |
| `asSeconds`[↗](#Duration.asSeconds) | `export fn (self: &Duration) asSeconds(): i64` |  |
| `asMillis`[↗](#Duration.asMillis) | `export fn (self: &Duration) asMillis(): i64` |  |
| `asMicros`[↗](#Duration.asMicros) | `export fn (self: &Duration) asMicros(): i64` |  |
| `asNanos`[↗](#Duration.asNanos) | `export fn (self: &Duration) asNanos(): i64` |  |
| `asMinutes`[↗](#Duration.asMinutes) | `export fn (self: &Duration) asMinutes(): i64` |  |
| `asHours`[↗](#Duration.asHours) | `export fn (self: &Duration) asHours(): i64` |  |
| `add`[↗](#Duration.add) | `export fn (self: &Duration) add(other: Duration): ` |  |
| `sub`[↗](#Duration.sub) | `export fn (self: &Duration) sub(other: Duration): ` |  |
| `mul`[↗](#Duration.mul) | `export fn (self: &Duration) mul(n: i64): Duration` |  |
| `div`[↗](#Duration.div) | `export fn (self: &Duration) div(n: i64): Duration` |  |
| `isZero`[↗](#Duration.isZero) | `export fn (self: &Duration) isZero(): bool` |  |
| `isNegative`[↗](#Duration.isNegative) | `export fn (self: &Duration) isNegative(): bool` |  |
| `abs`[↗](#Duration.abs) | `export fn (self: &Duration) abs(): Duration` |  |
| `clone`[↗](#Duration.clone) | `export fn (self: &Duration) clone(): Duration` |  |
| `neg`[↗](#Duration.neg) | `export fn (self: &Duration) neg(): Duration` |  |
| `cmp`[↗](#Duration.cmp) | `export fn (self: &Duration) cmp(other: &Duration):` |  |
| `toString`[↗](#Duration.toString) | `export fn (self: &Duration) toString(): string` |  |

---

## Enums

### <a id="Month"></a>`Month` `🔓 export`

&gt; 📄 `constants.vx` L5-18

```vex
export enum Month
```

**Variants:**

- `January`
- `February`
- `March`
- `April`
- `May`
- `June`
- `July`
- `August`
- `September`
- `October`
- `November`
- `December`

---

### <a id="Weekday"></a>`Weekday` `🔓 export`

&gt; 📄 `constants.vx` L20-28

```vex
export enum Weekday
```

**Variants:**

- `Sunday`
- `Monday`
- `Tuesday`
- `Wednesday`
- `Thursday`
- `Friday`
- `Saturday`

---

## Functions

### <a id="UTC"></a>`UTC` `🔓 export`

&gt; 📄 `location.vx` L62-64

```vex
export fn UTC(): Location
```

**Returns:** `Location`

---

### <a id="Local"></a>`Local` `🔓 export`

&gt; 📄 `location.vx` L66-69

```vex
export fn Local(): Location
```

**Returns:** `Location`

---

### <a id="fixedZone"></a>`fixedZone` `🔓 export`

&gt; 📄 `location.vx` L71-73

```vex
export fn fixedZone(name: string, offsetSeconds: i64): Location
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` |  |
| `offsetSeconds` | `i64` |  |

**Returns:** `Location`

---

### <a id="loadLocation"></a>`loadLocation` `🔓 export`

&gt; 📄 `location.vx` L82-98

```vex
export fn loadLocation(name: string): Result<Location, string>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` |  |

**Returns:** `Result&lt;Location, string&gt;`

---

### <a id="EST"></a>`EST` `🔓 export`

&gt; 📄 `location.vx` L160-160

```vex
export fn EST(): Location
```

**Returns:** `Location`

---

### <a id="PST"></a>`PST` `🔓 export`

&gt; 📄 `location.vx` L161-161

```vex
export fn PST(): Location
```

**Returns:** `Location`

---

### <a id="CET"></a>`CET` `🔓 export`

&gt; 📄 `location.vx` L162-162

```vex
export fn CET(): Location
```

**Returns:** `Location`

---

### <a id="TRT"></a>`TRT` `🔓 export`

&gt; 📄 `location.vx` L163-163

```vex
export fn TRT(): Location
```

**Returns:** `Location`

---

### <a id="JST"></a>`JST` `🔓 export`

&gt; 📄 `location.vx` L164-164

```vex
export fn JST(): Location
```

**Returns:** `Location`

---

### <a id="isDigit"></a>`isDigit`

&gt; 📄 `parse.vx` L18-20

```vex
fn isDigit(c: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `u8` |  |

**Returns:** `bool`

---

### <a id="scan_int_at"></a>`scan_int_at`

&gt; 📄 `parse.vx` L22-36

```vex
fn scan_int_at(s: str, pos: usize, digits: i32): ScanResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |
| `pos` | `usize` |  |
| `digits` | `i32` |  |

**Returns:** `ScanResult`

---

### <a id="scan_number_at"></a>`scan_number_at`

&gt; 📄 `parse.vx` L38-50

```vex
fn scan_number_at(s: str, pos: usize): ScanResult64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |
| `pos` | `usize` |  |

**Returns:** `ScanResult64`

---

### <a id="scan_nanos_at"></a>`scan_nanos_at`

&gt; 📄 `parse.vx` L52-66

```vex
fn scan_nanos_at(s: str, pos: usize): ScanResult64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |
| `pos` | `usize` |  |

**Returns:** `ScanResult64`

---

### <a id="parts_to_ns"></a>`parts_to_ns`

&gt; 📄 `parse.vx` L70-79

```vex
fn parts_to_ns(y: i32, m: i32, d: i32, h: i32, min: i32, s: i32, ns: i64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `y` | `i32` |  |
| `m` | `i32` |  |
| `d` | `i32` |  |
| `h` | `i32` |  |
| `min` | `i32` |  |
| `s` | `i32` |  |
| `ns` | `i64` |  |

**Returns:** `i64`

---

### <a id="parse"></a>`parse` `🔓 export`

&gt; 📄 `parse.vx` L81-130

```vex
export fn parse(layout: str, input: str): Result<Time, string>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `layout` | `str` |  |
| `input` | `str` |  |

**Returns:** `Result&lt;Time, string&gt;`

---

### <a id="parse_rfc3339"></a>`parse_rfc3339` `🔓 export`

&gt; 📄 `parse.vx` L132-166

```vex
export fn parse_rfc3339(input: str): Result<Time, string>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |

**Returns:** `Result&lt;Time, string&gt;`

---

### <a id="parse_duration"></a>`parse_duration` `🔓 export`

&gt; 📄 `parse.vx` L168-196

```vex
export fn parse_duration(input: str): Result<Duration, string>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |

**Returns:** `Result&lt;Duration, string&gt;`

---

### <a id="now"></a>`now` `🔓 export`

&gt; 📄 `helpers.vx` L12-14

```vex
export fn now(): Time
```

**Returns:** `Time`

---

### <a id="sleep"></a>`sleep` `🔓 export`

&gt; 📄 `helpers.vx` L17-21

```vex
export fn sleep(d: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `d` | `i64` |  |

---

### <a id="monotonicNow"></a>`monotonicNow` `🔓 export`

&gt; 📄 `helpers.vx` L24-27

```vex
export fn monotonicNow(): u64
```

**Returns:** `u64`

---

### <a id="sleepDuration"></a>`sleepDuration` `🔓 export`

&gt; 📄 `helpers.vx` L30-34

```vex
export fn sleepDuration(d: Duration)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `d` | `Duration` |  |

---

### <a id="getLocalOffset"></a>`getLocalOffset` `🔓 export`

&gt; 📄 `helpers.vx` L37-39

```vex
export fn getLocalOffset(): i64
```

**Returns:** `i64`

---

### <a id="since"></a>`since` `🔓 export`

&gt; 📄 `helpers.vx` L49-52

```vex
export fn since(t: Time): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `Duration`

---

### <a id="until"></a>`until` `🔓 export`

&gt; 📄 `helpers.vx` L55-58

```vex
export fn until(t: Time): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `Duration`

---

### <a id="truncate"></a>`truncate` `🔓 export`

&gt; 📄 `helpers.vx` L61-65

```vex
export fn truncate(t: Time, d: Duration): Time
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `d` | `Duration` |  |

**Returns:** `Time`

---

### <a id="round"></a>`round` `🔓 export`

&gt; 📄 `helpers.vx` L68-75

```vex
export fn round(t: Time, d: Duration): Time
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `d` | `Duration` |  |

**Returns:** `Time`

---

### <a id="unix"></a>`unix` `🔓 export`

&gt; 📄 `helpers.vx` L78-80

```vex
export fn unix(sec: i64, nsec: i64): Time
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `sec` | `i64` |  |
| `nsec` | `i64` |  |

**Returns:** `Time`

---

### <a id="unix_seconds"></a>`unix_seconds` `🔓 export`

&gt; 📄 `helpers.vx` L83-83

```vex
export fn unix_seconds(t: Time): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `i64`

---

### <a id="unix_nanosecond"></a>`unix_nanosecond` `🔓 export`

&gt; 📄 `helpers.vx` L84-84

```vex
export fn unix_nanosecond(t: Time): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `i64`

---

### <a id="unix_milli"></a>`unix_milli` `🔓 export`

&gt; 📄 `helpers.vx` L85-85

```vex
export fn unix_milli(t: Time): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `i64`

---

### <a id="unix_micro"></a>`unix_micro` `🔓 export`

&gt; 📄 `helpers.vx` L86-86

```vex
export fn unix_micro(t: Time): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `i64`

---

### <a id="compare"></a>`compare` `🔓 export`

&gt; 📄 `helpers.vx` L89-93

```vex
export fn compare(t1: Time, t2: Time): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t1` | `Time` |  |
| `t2` | `Time` |  |

**Returns:** `i32`

---

### <a id="before"></a>`before` `🔓 export`

&gt; 📄 `helpers.vx` L95-95

```vex
export fn before(t1: Time, t2: Time): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t1` | `Time` |  |
| `t2` | `Time` |  |

**Returns:** `bool`

---

### <a id="after"></a>`after` `🔓 export`

&gt; 📄 `helpers.vx` L96-96

```vex
export fn after(t1: Time, t2: Time): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t1` | `Time` |  |
| `t2` | `Time` |  |

**Returns:** `bool`

---

### <a id="equal"></a>`equal` `🔓 export`

&gt; 📄 `helpers.vx` L97-97

```vex
export fn equal(t1: Time, t2: Time): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t1` | `Time` |  |
| `t2` | `Time` |  |

**Returns:** `bool`

---

### <a id="after"></a>`after` `🔓 export`

&gt; 📄 `helpers.vx` L100-107

```vex
export fn after(d: Duration): Channel<Time>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `d` | `Duration` |  |

**Returns:** `Channel&lt;Time&gt;`

---

### <a id="weekday"></a>`weekday` `🔓 export`

&gt; 📄 `helpers.vx` L110-110

```vex
export fn weekday(t: Time): Weekday
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `Weekday`

---

### <a id="date"></a>`date` `🔓 export`

&gt; 📄 `helpers.vx` L112-114

```vex
export fn date(t: Time): (i32, Month, i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `(i32, Month, i32)`

---

### <a id="clock"></a>`clock` `🔓 export`

&gt; 📄 `helpers.vx` L116-118

```vex
export fn clock(t: Time): (i32, i32, i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `(i32, i32, i32)`

---

### <a id="normalized_delay_ns"></a>`normalized_delay_ns`

&gt; 📄 `helpers.vx` L131-136

```vex
fn normalized_delay_ns(d: Duration): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `d` | `Duration` |  |

**Returns:** `u64`

---

### <a id="newTimer"></a>`newTimer` `🔓 export`

&gt; 📄 `helpers.vx` L148-150

```vex
export fn newTimer(d: Duration): Timer
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `d` | `Duration` |  |

**Returns:** `Timer`

---

### <a id="newTicker"></a>`newTicker` `🔓 export`

&gt; 📄 `helpers.vx` L228-230

```vex
export fn newTicker(d: Duration): Ticker
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `d` | `Duration` |  |

**Returns:** `Ticker`

---

### <a id="afterDuration"></a>`afterDuration` `🔓 export`

&gt; 📄 `helpers.vx` L257-260

```vex
export fn afterDuration(d: Duration): Time
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `d` | `Duration` |  |

**Returns:** `Time`

---

### <a id="tz_pad2"></a>`tz_pad2`

&gt; 📄 `helpers.vx` L266-269

```vex
fn tz_pad2(n: i64): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `n` | `i64` |  |

**Returns:** `string`

---

### <a id="tz_pad4"></a>`tz_pad4`

&gt; 📄 `helpers.vx` L271-276

```vex
fn tz_pad4(n: i64): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `n` | `i64` |  |

**Returns:** `string`

---

### <a id="formatInLocation"></a>`formatInLocation` `🔓 export`

&gt; 📄 `helpers.vx` L280-283

```vex
export fn formatInLocation(t: Time, layout: str, loc: Location): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `layout` | `str` |  |
| `loc` | `Location` |  |

**Returns:** `string`

---

### <a id="toRFC3339InLocation"></a>`toRFC3339InLocation` `🔓 export`

&gt; 📄 `helpers.vx` L286-311

```vex
export fn toRFC3339InLocation(t: Time, loc: Location): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `loc` | `Location` |  |

**Returns:** `string`

---

### <a id="inLocation"></a>`inLocation` `🔓 export`

&gt; 📄 `helpers.vx` L315-318

```vex
export fn inLocation(t: Time, loc: Location): Time
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `loc` | `Location` |  |

**Returns:** `Time`

---

### <a id="isDST"></a>`isDST` `🔓 export`

&gt; 📄 `helpers.vx` L321-323

```vex
export fn isDST(t: Time, loc: Location): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `loc` | `Location` |  |

**Returns:** `bool`

---

### <a id="days_in_month"></a>`days_in_month` `🔓 export`

&gt; 📄 `time_type.vx` L13-21

```vex
export fn days_in_month(m: i32, year: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `m` | `i32` |  |
| `year` | `i32` |  |

**Returns:** `i32`

---

### <a id="ns_to_datetime"></a>`ns_to_datetime` `🔓 export`

&gt; 📄 `time_type.vx` L54-79

```vex
export fn ns_to_datetime(ns: i64): DateTimeParts
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ns` | `i64` |  |

**Returns:** `DateTimeParts`

---

### <a id="add"></a>`add` `🔓 export`

&gt; 📄 `time_type.vx` L149-151

```vex
export fn add(t: Time, d: Duration): Time
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `d` | `Duration` |  |

**Returns:** `Time`

---

### <a id="sub"></a>`sub` `🔓 export`

&gt; 📄 `time_type.vx` L153-155

```vex
export fn sub(t1: Time, t2: Time): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t1` | `Time` |  |
| `t2` | `Time` |  |

**Returns:** `Duration`

---

### <a id="pad2"></a>`pad2`

&gt; 📄 `time_type.vx` L248-251

```vex
fn pad2(n: i64): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `n` | `i64` |  |

**Returns:** `string`

---

### <a id="pad4"></a>`pad4`

&gt; 📄 `time_type.vx` L253-258

```vex
fn pad4(n: i64): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `n` | `i64` |  |

**Returns:** `string`

---

### <a id="abs_date"></a>`abs_date` `🔓 export`

&gt; 📄 `conversations.vx` L5-24

```vex
export fn abs_date(abs_sec: i64): DateParts
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `abs_sec` | `i64` |  |

**Returns:** `DateParts`

---

### <a id="is_leap"></a>`is_leap` `🔓 export`

&gt; 📄 `conversations.vx` L30-32

```vex
export fn is_leap(year: i32): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `year` | `i32` |  |

**Returns:** `bool`

---

### <a id="nsToDateTime"></a>`nsToDateTime` `🔓 export`

&gt; 📄 `conversations.vx` L36-69

```vex
export fn nsToDateTime(ns: i64): (i32, i32, i32, i32, i32, i32, i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ns` | `i64` |  |

**Returns:** `(i32, i32, i32, i32, i32, i32, i32)`

---

### <a id="fmt_int"></a>`fmt_int`

&gt; 📄 `format.vxc` L5-25

```vex
fn fmt_int(val: i32, width: i32): string
```

Pad integer with zeros to width

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `val` | `i32` |  |
| `width` | `i32` |  |

**Returns:** `string`

---

### <a id="format_layout"></a>`format_layout` `🔓 export`

&gt; 📄 `format.vxc` L29-107

```vex
export fn format_layout(y: i32, m: i32, d: i32, h: i32, min: i32, s: i32, ns: i64, layout: string): string
```

Token-based formatting (Day.js style)

Supported tokens: YYYY, MM, DD, HH, mm, ss, SSS, Z

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `y` | `i32` |  |
| `m` | `i32` |  |
| `d` | `i32` |  |
| `h` | `i32` |  |
| `min` | `i32` |  |
| `s` | `i32` |  |
| `ns` | `i64` |  |
| `layout` | `string` |  |

**Returns:** `string`

---

### <a id="utc"></a>`utc` `🔓 export`

&gt; 📄 `lib.vx` L6-6

```vex
export fn utc(): Location
```

**Returns:** `Location`

---

### <a id="local"></a>`local` `🔓 export`

&gt; 📄 `lib.vx` L7-7

```vex
export fn local(): Location
```

**Returns:** `Location`

---

### <a id="fixed_zone"></a>`fixed_zone` `🔓 export`

&gt; 📄 `lib.vx` L8-8

```vex
export fn fixed_zone(name: string, offset: i32): Location
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` |  |
| `offset` | `i32` |  |

**Returns:** `Location`

---

### <a id="load_location"></a>`load_location` `🔓 export`

&gt; 📄 `lib.vx` L9-9

```vex
export fn load_location(name: string): Result<Location, string>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` |  |

**Returns:** `Result&lt;Location, string&gt;`

---

### <a id="seconds"></a>`seconds` `🔓 export`

&gt; 📄 `duration.vx` L38-40

```vex
export fn seconds(s: i64): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `i64` |  |

**Returns:** `Duration`

---

### <a id="milliseconds"></a>`milliseconds` `🔓 export`

&gt; 📄 `duration.vx` L42-44

```vex
export fn milliseconds(ms: i64): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ms` | `i64` |  |

**Returns:** `Duration`

---

### <a id="microseconds"></a>`microseconds` `🔓 export`

&gt; 📄 `duration.vx` L46-48

```vex
export fn microseconds(us: i64): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `us` | `i64` |  |

**Returns:** `Duration`

---

### <a id="nanoseconds"></a>`nanoseconds` `🔓 export`

&gt; 📄 `duration.vx` L50-52

```vex
export fn nanoseconds(ns: i64): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ns` | `i64` |  |

**Returns:** `Duration`

---

### <a id="minutes"></a>`minutes` `🔓 export`

&gt; 📄 `duration.vx` L54-56

```vex
export fn minutes(m: i64): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `m` | `i64` |  |

**Returns:** `Duration`

---

### <a id="hours"></a>`hours` `🔓 export`

&gt; 📄 `duration.vx` L58-60

```vex
export fn hours(h: i64): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `h` | `i64` |  |

**Returns:** `Duration`

---

---

*Generated by vex-doc v2.0 • 2026-07-06*
