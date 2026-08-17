# Project v0.0.0

## Overview

**Structs:** [`Location`](#Location) · [`timespec`](#timespec) · [`tm`](#tm) · [`ScanResult`](#ScanResult) · [`ScanResult64`](#ScanResult64) · [`Instant`](#Instant) · [`Timer`](#Timer) · [`Ticker`](#Ticker) · [`DateTimeParts`](#DateTimeParts) · [`Time`](#Time) · [`timespec`](#timespec) · [`tm`](#tm) · [`DateParts`](#DateParts) · [`Duration`](#Duration) · [`FILETIME`](#FILETIME) · [`SYSTEMTIME`](#SYSTEMTIME) · [`TIME_ZONE_INFORMATION`](#TIME_ZONE_INFORMATION)

**Enums:** [`Month`](#Month) · [`Weekday`](#Weekday)

**Functions:** [`UTC`](#UTC) · [`Local`](#Local) · [`fixedZone`](#fixedZone) · [`loadLocation`](#loadLocation) · [`EST`](#EST) · [`PST`](#PST) · [`CET`](#CET) · [`TRT`](#TRT) · [`JST`](#JST) · [`vex_time_current_ns`](#vex_time_current_ns) · [`vex_nanosleep`](#vex_nanosleep) · [`vex_monotonic_ns`](#vex_monotonic_ns) · [`vex_tz_offset_at_shim`](#vex_tz_offset_at_shim) · [`vex_tz_exists_shim`](#vex_tz_exists_shim) · [`vex_get_local_offset`](#vex_get_local_offset) · [`isDigit`](#isDigit) · [`scan_int_at`](#scan_int_at) · [`scan_nanos_at`](#scan_nanos_at) · [`daysFromCivil`](#daysFromCivil) · [`validDateTime`](#validDateTime) · [`partsToNs`](#partsToNs) · [`parse`](#parse) · [`parse_rfc3339`](#parse_rfc3339) · [`parse_duration`](#parse_duration) · [`signedDurationBetween`](#signedDurationBetween) · [`now`](#now) · [`sleep`](#sleep) · [`sleep`](#sleep) · [`getLocalOffset`](#getLocalOffset) · [`since`](#since) · [`until`](#until) · [`truncate`](#truncate) · [`round`](#round) · [`unix`](#unix) · [`unix_seconds`](#unix_seconds) · [`unix_nanosecond`](#unix_nanosecond) · [`unix_milli`](#unix_milli) · [`unix_micro`](#unix_micro) · [`compare`](#compare) · [`before`](#before) · [`after`](#after) · [`equal`](#equal) · [`after`](#after) · [`weekday`](#weekday) · [`date`](#date) · [`clock`](#clock) · [`newTimer`](#newTimer) · [`newTicker`](#newTicker) · [`afterDuration`](#afterDuration) · [`tz_pad2`](#tz_pad2) · [`tz_pad4`](#tz_pad4) · [`formatInLocation`](#formatInLocation) · [`toRFC3339InLocation`](#toRFC3339InLocation) · [`inLocation`](#inLocation) · [`isDST`](#isDST) · [`days_in_month`](#days_in_month) · [`ns_to_datetime`](#ns_to_datetime) · [`floor_div`](#floor_div) · [`add`](#add) · [`sub`](#sub) · [`write_padded_int`](#write_padded_int) · [`vex_time_current_ns`](#vex_time_current_ns) · [`vex_nanosleep`](#vex_nanosleep) · [`vex_monotonic_ns`](#vex_monotonic_ns) · [`vex_tz_offset_at_shim`](#vex_tz_offset_at_shim) · [`vex_tz_exists_shim`](#vex_tz_exists_shim) · [`vex_get_local_offset`](#vex_get_local_offset) · [`fmt_int`](#fmt_int) · [`format_layout`](#format_layout) · [`utc`](#utc) · [`local`](#local) · [`fixed_zone`](#fixed_zone) · [`load_location`](#load_location) · [`abs_date`](#abs_date) · [`is_leap`](#is_leap) · [`nsToDateTime`](#nsToDateTime) · [`magnitude`](#magnitude) · [`seconds`](#seconds) · [`milliseconds`](#milliseconds) · [`microseconds`](#microseconds) · [`nanoseconds`](#nanoseconds) · [`minutes`](#minutes) · [`hours`](#hours) · [`vex_time_current_ns`](#vex_time_current_ns) · [`sleepMilliseconds`](#sleepMilliseconds) · [`vex_nanosleep`](#vex_nanosleep) · [`vex_monotonic_ns`](#vex_monotonic_ns) · [`vex_tz_offset_at_shim`](#vex_tz_offset_at_shim) · [`vex_tz_exists_shim`](#vex_tz_exists_shim) · [`vex_get_local_offset`](#vex_get_local_offset)

**Constants:** [`NANOSECOND`](#NANOSECOND) · [`MICROSECOND`](#MICROSECOND) · [`MILLISECOND`](#MILLISECOND) · [`SECOND`](#SECOND) · [`MINUTE`](#MINUTE) · [`HOUR`](#HOUR) · [`DAY`](#DAY) · [`RFC3339`](#RFC3339)

## Constants

### <a id="NANOSECOND"></a>`NANOSECOND` `🔓 export`

> 📄 `constants.vx` L33-33

```vex
export const NANOSECOND: i64=1;
```

**Returns:** `i64=1;`

---

### <a id="MICROSECOND"></a>`MICROSECOND` `🔓 export`

> 📄 `constants.vx` L34-34

```vex
export const MICROSECOND: i64=1000 * NANOSECOND;
```

**Returns:** `i64=1000 * NANOSECOND;`

---

### <a id="MILLISECOND"></a>`MILLISECOND` `🔓 export`

> 📄 `constants.vx` L35-35

```vex
export const MILLISECOND: i64=1000 * MICROSECOND;
```

**Returns:** `i64=1000 * MICROSECOND;`

---

### <a id="SECOND"></a>`SECOND` `🔓 export`

> 📄 `constants.vx` L36-36

```vex
export const SECOND: i64=1000 * MILLISECOND;
```

**Returns:** `i64=1000 * MILLISECOND;`

---

### <a id="MINUTE"></a>`MINUTE` `🔓 export`

> 📄 `constants.vx` L37-37

```vex
export const MINUTE: i64=60 * SECOND;
```

**Returns:** `i64=60 * SECOND;`

---

### <a id="HOUR"></a>`HOUR` `🔓 export`

> 📄 `constants.vx` L38-38

```vex
export const HOUR: i64=60 * MINUTE;
```

**Returns:** `i64=60 * MINUTE;`

---

### <a id="DAY"></a>`DAY` `🔓 export`

> 📄 `constants.vx` L39-39

```vex
export const DAY: i64=24 * HOUR;
```

**Returns:** `i64=24 * HOUR;`

---

### <a id="RFC3339"></a>`RFC3339` `🔓 export`

> 📄 `constants.vx` L42-42

```vex
export const RFC3339: string="2006-01-02T15:04:05Z07:00";
```

**Returns:** `string="2006-01-02T15:04:05Z07:00";`

---

## Structs

### <a id="Location"></a>`Location` `🔓 export`

> 📄 `location.vx` L17-27

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
| `offset`[↗](#Location.offset) | `export fn (self: &amp;Location) offset(): i64` | Standard (base) offset in seconds. |
| `offsetAtUnix`[↗](#Location.offsetAtUnix) | `export fn (self: &amp;Location) offsetAtUnix(unixSec: ` | Actual UTC offset at an arbitrary Unix timestamp. |
| `offsetAt`[↗](#Location.offsetAt) | `export fn (self: &amp;Location) offsetAt(t: Time): i64` | Offset at a Time instant. |
| `offsetHours`[↗](#Location.offsetHours) | `export fn (self: &amp;Location) offsetHours(): i32` | Offset in whole hours. |
| `clone`[↗](#Location.clone) | `export fn (self: &amp;Location) clone(): Location` | Clone. |
| `toString`[↗](#Location.toString) | `export fn (self: &amp;Location) toString(): string` | Display: "America/New_York (UTC-5)" |

---

### <a id="timespec"></a>`timespec`

> 📄 `native.macos.vxc` L3-7

```vex
struct timespec
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `tv_sec` | `i64` | 🔓 public |  |
| `tv_nsec` | `i64` | 🔓 public |  |

---

### <a id="tm"></a>`tm`

> 📄 `native.macos.vxc` L54-67

```vex
struct tm
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `tm_sec` | `i32` | 🔓 public |  |
| `tm_min` | `i32` | 🔓 public |  |
| `tm_hour` | `i32` | 🔓 public |  |
| `tm_mday` | `i32` | 🔓 public |  |
| `tm_mon` | `i32` | 🔓 public |  |
| `tm_year` | `i32` | 🔓 public |  |
| `tm_wday` | `i32` | 🔓 public |  |
| `tm_yday` | `i32` | 🔓 public |  |
| `tm_isdst` | `i32` | 🔓 public |  |
| `tm_gmtoff` | `i64` | 🔓 public |  |
| `tm_zone` | `Ptr&lt;u8&gt;` | 🔓 public |  |

---

### <a id="ScanResult"></a>`ScanResult`

> 📄 `parse.vx` L6-10

```vex
struct ScanResult
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `value` | `i32` | 🔓 public |  |
| `count` | `i32` | 🔓 public |  |

---

### <a id="ScanResult64"></a>`ScanResult64`

> 📄 `parse.vx` L11-15

```vex
struct ScanResult64
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `value` | `i64` | 🔓 public |  |
| `count` | `i32` | 🔓 public |  |

---

### <a id="Instant"></a>`Instant` `🔓 export`

> 📄 `instant.vx` L7-10

```vex
export struct Instant
```

**Implements:** `Clone` & `Copy` & `Eq` & `Ord`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ticks` | `u64` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Instant.now`[↗](#Instant.now) | `export fn Instant.now(): Instant` |  |
| `clone`[↗](#Instant.clone) | `export fn (self: &amp;Instant) clone(): Instant` |  |
| `asNanos`[↗](#Instant.asNanos) | `export fn (self: &amp;Instant) asNanos(): u64` | Process-local clock reading for diagnostics and native interop. It has no |
| `durationSince`[↗](#Instant.durationSince) | `export fn (self: &amp;Instant) durationSince(earlier: ` | Signed difference with saturation at Duration's representable limits. |
| `saturatingDurationSince`[↗](#Instant.saturatingDurationSince) | `export fn (self: &amp;Instant) saturatingDurationSince` | Non-negative difference; clock anomalies or reversed operands yield zero. |
| `elapsed`[↗](#Instant.elapsed) | `export fn (self: &amp;Instant) elapsed(): Duration` |  |
| `checkedAdd`[↗](#Instant.checkedAdd) | `export fn (self: &amp;Instant) checkedAdd(duration: Du` |  |
| `checkedSub`[↗](#Instant.checkedSub) | `export fn (self: &amp;Instant) checkedSub(duration: Du` |  |
| `saturatingAdd`[↗](#Instant.saturatingAdd) | `export fn (self: &amp;Instant) saturatingAdd(duration:` |  |
| `saturatingSub`[↗](#Instant.saturatingSub) | `export fn (self: &amp;Instant) saturatingSub(duration:` |  |
| `op==`[↗](#Instant.op==) | `export fn (self: &amp;Instant) op==(other: &amp;Instant): ` |  |
| `op<`[↗](#Instant.op<) | `export fn (self: &amp;Instant) op&lt;(other: &amp;Instant): b` |  |
| `op>`[↗](#Instant.op>) | `export fn (self: &amp;Instant) op&gt;(other: &amp;Instant): b` |  |
| `op<=`[↗](#Instant.op<=) | `export fn (self: &amp;Instant) op&lt;=(other: &amp;Instant): ` |  |
| `op>=`[↗](#Instant.op>=) | `export fn (self: &amp;Instant) op&gt;=(other: &amp;Instant): ` |  |

---

### <a id="Timer"></a>`Timer` `🔓 export`

> 📄 `helpers.vx` L122-127

```vex
export struct Timer
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `deadline` | `Instant` | 🔒 private |  |
| `fired` | `bool` | 🔒 private |  |
| `active` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Timer.new`[↗](#Timer.new) | `export fn Timer.new(d: Duration): Timer` |  |
| `expired`[↗](#Timer.expired) | `export fn (self: &amp;Timer) expired(): bool` |  |
| `poll`[↗](#Timer.poll) | `export fn (self: &amp;Timer!) poll(): bool` |  |
| `reset`[↗](#Timer.reset) | `export fn (self: &amp;Timer!) reset(d: Duration)` |  |
| `stop`[↗](#Timer.stop) | `export fn (self: &amp;Timer!) stop()` |  |
| `wait`[↗](#Timer.wait) | `export fn (self: &amp;Timer!) wait(): Time` |  |

---

### <a id="Ticker"></a>`Ticker` `🔓 export`

> 📄 `helpers.vx` L195-200

```vex
export struct Ticker
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `interval` | `Duration` | 🔒 private |  |
| `next` | `Instant` | 🔒 private |  |
| `active` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Ticker.new`[↗](#Ticker.new) | `export fn Ticker.new(d: Duration): Ticker` |  |
| `tick`[↗](#Ticker.tick) | `export fn (self: &amp;Ticker!) tick(): bool` |  |
| `reset`[↗](#Ticker.reset) | `export fn (self: &amp;Ticker!) reset(d: Duration)` |  |
| `stop`[↗](#Ticker.stop) | `export fn (self: &amp;Ticker!) stop()` |  |

---

### <a id="DateTimeParts"></a>`DateTimeParts` `🔓 export`

> 📄 `time_type.vx` L28-37

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
| `year`[↗](#DateTimeParts.year) | `export fn (self: &amp;DateTimeParts) year(): i32` |  |
| `month`[↗](#DateTimeParts.month) | `export fn (self: &amp;DateTimeParts) month(): i32` |  |
| `day`[↗](#DateTimeParts.day) | `export fn (self: &amp;DateTimeParts) day(): i32` |  |
| `hour`[↗](#DateTimeParts.hour) | `export fn (self: &amp;DateTimeParts) hour(): i32` |  |
| `minute`[↗](#DateTimeParts.minute) | `export fn (self: &amp;DateTimeParts) minute(): i32` |  |
| `second`[↗](#DateTimeParts.second) | `export fn (self: &amp;DateTimeParts) second(): i32` |  |
| `weekday`[↗](#DateTimeParts.weekday) | `export fn (self: &amp;DateTimeParts) weekday(): i32` |  |

---

### <a id="Time"></a>`Time` `🔓 export`

> 📄 `time_type.vx` L78-81

```vex
export struct Time
```

**Implements:** `Display` & `Clone` & `Copy` & `Eq` & `Ord`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ns` | `i64` | 🔒 readonly |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Time.now`[↗](#Time.now) | `export fn Time.now(): Time` |  |
| `Time.unix`[↗](#Time.unix) | `export fn Time.unix(sec: i64, nsec: i64): Time` |  |
| `Time.checkedUnix`[↗](#Time.checkedUnix) | `export fn Time.checkedUnix(sec: i64, nsec: i64): O` | Constructs Unix time while normalizing an arbitrary nanosecond offset. |
| `Time.fromUnixNanos`[↗](#Time.fromUnixNanos) | `export fn Time.fromUnixNanos(ns: i64): Time` | Constructs an absolute time from nanoseconds since the Unix epoch. |
| `clone`[↗](#Time.clone) | `export fn (self: &amp;Time) clone(): Time` |  |
| `cmp`[↗](#Time.cmp) | `export fn (self: &amp;Time) cmp(other: &amp;Time): i32` |  |
| `op==`[↗](#Time.op==) | `export fn (self: &amp;Time) op==(other: &amp;Time): bool` |  |
| `op<`[↗](#Time.op<) | `export fn (self: &amp;Time) op&lt;(other: &amp;Time): bool` |  |
| `op>`[↗](#Time.op>) | `export fn (self: &amp;Time) op&gt;(other: &amp;Time): bool` |  |
| `op<=`[↗](#Time.op<=) | `export fn (self: &amp;Time) op&lt;=(other: &amp;Time): bool` |  |
| `op>=`[↗](#Time.op>=) | `export fn (self: &amp;Time) op&gt;=(other: &amp;Time): bool` |  |
| `toString`[↗](#Time.toString) | `export fn (self: &amp;Time) toString(): string` |  |
| `unix`[↗](#Time.unix) | `export fn (self: &amp;Time) unix(): i64` |  |
| `unixNano`[↗](#Time.unixNano) | `export fn (self: &amp;Time) unixNano(): i64` | Total nanoseconds elapsed since the Unix epoch. |
| `unixMilli`[↗](#Time.unixMilli) | `export fn (self: &amp;Time) unixMilli(): i64` | Total milliseconds elapsed since the Unix epoch, rounded toward the past. |
| `unixMicro`[↗](#Time.unixMicro) | `export fn (self: &amp;Time) unixMicro(): i64` | Total microseconds elapsed since the Unix epoch, rounded toward the past. |
| `nanosecond`[↗](#Time.nanosecond) | `export fn (self: &amp;Time) nanosecond(): i64` | Nanosecond offset within the current Unix second (`0..999_999_999`). |
| `checkedAdd`[↗](#Time.checkedAdd) | `export fn (self: &amp;Time) checkedAdd(d: Duration): O` |  |
| `add`[↗](#Time.add) | `export fn (self: &amp;Time) add(d: Duration): Time` |  |
| `saturatingAdd`[↗](#Time.saturatingAdd) | `export fn (self: &amp;Time) saturatingAdd(d: Duration)` |  |
| `checkedDurationSince`[↗](#Time.checkedDurationSince) | `export fn (self: &amp;Time) checkedDurationSince(earli` |  |
| `durationSince`[↗](#Time.durationSince) | `export fn (self: &amp;Time) durationSince(earlier: Tim` |  |
| `year`[↗](#Time.year) | `export fn (self: &amp;Time) year(): i64` |  |
| `month`[↗](#Time.month) | `export fn (self: &amp;Time) month(): Month` |  |
| `day`[↗](#Time.day) | `export fn (self: &amp;Time) day(): i64` |  |
| `hour`[↗](#Time.hour) | `export fn (self: &amp;Time) hour(): i64` |  |
| `minute`[↗](#Time.minute) | `export fn (self: &amp;Time) minute(): i64` |  |
| `second`[↗](#Time.second) | `export fn (self: &amp;Time) second(): i64` |  |
| `weekday`[↗](#Time.weekday) | `export fn (self: &amp;Time) weekday(): Weekday` |  |
| `addDate`[↗](#Time.addDate) | `export fn (self: &amp;Time) addDate(years: i32, months` |  |
| `withOffset`[↗](#Time.withOffset) | `export fn (self: &amp;Time) withOffset(offsetSec: i64)` |  |
| `formatWithOffset`[↗](#Time.formatWithOffset) | `export fn (self: &amp;Time) formatWithOffset(layout: s` |  |
| `format`[↗](#Time.format) | `export fn (self: &amp;Time) format(layout: str): strin` |  |
| `startOf`[↗](#Time.startOf) | `export fn (self: &amp;Time) startOf(unit: str): Time` |  |
| `endOf`[↗](#Time.endOf) | `export fn (self: &amp;Time) endOf(unit: str): Time` |  |

---

### <a id="timespec"></a>`timespec`

> 📄 `native.linux.vxc` L3-7

```vex
struct timespec
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `tv_sec` | `i64` | 🔓 public |  |
| `tv_nsec` | `i64` | 🔓 public |  |

---

### <a id="tm"></a>`tm`

> 📄 `native.linux.vxc` L50-63

```vex
struct tm
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `tm_sec` | `i32` | 🔓 public |  |
| `tm_min` | `i32` | 🔓 public |  |
| `tm_hour` | `i32` | 🔓 public |  |
| `tm_mday` | `i32` | 🔓 public |  |
| `tm_mon` | `i32` | 🔓 public |  |
| `tm_year` | `i32` | 🔓 public |  |
| `tm_wday` | `i32` | 🔓 public |  |
| `tm_yday` | `i32` | 🔓 public |  |
| `tm_isdst` | `i32` | 🔓 public |  |
| `tm_gmtoff` | `i64` | 🔓 public |  |
| `tm_zone` | `Ptr&lt;u8&gt;` | 🔓 public |  |

---

### <a id="DateParts"></a>`DateParts` `🔓 export`

> 📄 `conversions.vx` L7-12

```vex
export struct DateParts
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `y` | `i32` | 🔒 readonly |  |
| `m` | `i32` | 🔒 readonly |  |
| `d` | `i32` | 🔒 readonly |  |

---

### <a id="Duration"></a>`Duration` `🔓 export`

> 📄 `duration.vx` L5-8

```vex
export struct Duration
```

**Implements:** `Display` & `Clone` & `Copy` & `Eq` & `Ord`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ns` | `i64` | 🔒 readonly |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Duration.seconds`[↗](#Duration.seconds) | `export fn Duration.seconds(s: i64): Duration` |  |
| `Duration.milliseconds`[↗](#Duration.milliseconds) | `export fn Duration.milliseconds(ms: i64): Duration` |  |
| `Duration.microseconds`[↗](#Duration.microseconds) | `export fn Duration.microseconds(us: i64): Duration` |  |
| `Duration.nanoseconds`[↗](#Duration.nanoseconds) | `export fn Duration.nanoseconds(ns: i64): Duration` |  |
| `Duration.minutes`[↗](#Duration.minutes) | `export fn Duration.minutes(m: i64): Duration` |  |
| `Duration.hours`[↗](#Duration.hours) | `export fn Duration.hours(h: i64): Duration` |  |
| `asSeconds`[↗](#Duration.asSeconds) | `export fn (self: &amp;Duration) asSeconds(): i64` |  |
| `asMillis`[↗](#Duration.asMillis) | `export fn (self: &amp;Duration) asMillis(): i64` |  |
| `asMicros`[↗](#Duration.asMicros) | `export fn (self: &amp;Duration) asMicros(): i64` |  |
| `asNanos`[↗](#Duration.asNanos) | `export fn (self: &amp;Duration) asNanos(): i64` |  |
| `asMinutes`[↗](#Duration.asMinutes) | `export fn (self: &amp;Duration) asMinutes(): i64` |  |
| `asHours`[↗](#Duration.asHours) | `export fn (self: &amp;Duration) asHours(): i64` |  |
| `add`[↗](#Duration.add) | `export fn (self: &amp;Duration) add(other: Duration): ` |  |
| `sub`[↗](#Duration.sub) | `export fn (self: &amp;Duration) sub(other: Duration): ` |  |
| `mul`[↗](#Duration.mul) | `export fn (self: &amp;Duration) mul(n: i64): Duration` |  |
| `div`[↗](#Duration.div) | `export fn (self: &amp;Duration) div(n: i64): Duration` |  |
| `checkedAdd`[↗](#Duration.checkedAdd) | `export fn (self: &amp;Duration) checkedAdd(other: Dura` |  |
| `checkedSub`[↗](#Duration.checkedSub) | `export fn (self: &amp;Duration) checkedSub(other: Dura` |  |
| `checkedMul`[↗](#Duration.checkedMul) | `export fn (self: &amp;Duration) checkedMul(n: i64): Op` |  |
| `checkedDiv`[↗](#Duration.checkedDiv) | `export fn (self: &amp;Duration) checkedDiv(n: i64): Op` |  |
| `saturatingAdd`[↗](#Duration.saturatingAdd) | `export fn (self: &amp;Duration) saturatingAdd(other: D` |  |
| `saturatingSub`[↗](#Duration.saturatingSub) | `export fn (self: &amp;Duration) saturatingSub(other: D` |  |
| `saturatingMul`[↗](#Duration.saturatingMul) | `export fn (self: &amp;Duration) saturatingMul(n: i64):` |  |
| `isZero`[↗](#Duration.isZero) | `export fn (self: &amp;Duration) isZero(): bool` |  |
| `isNegative`[↗](#Duration.isNegative) | `export fn (self: &amp;Duration) isNegative(): bool` |  |
| `abs`[↗](#Duration.abs) | `export fn (self: &amp;Duration) abs(): Duration` |  |
| `saturatingAbs`[↗](#Duration.saturatingAbs) | `export fn (self: &amp;Duration) saturatingAbs(): Durat` |  |
| `clone`[↗](#Duration.clone) | `export fn (self: &amp;Duration) clone(): Duration` |  |
| `neg`[↗](#Duration.neg) | `export fn (self: &amp;Duration) neg(): Duration` |  |
| `cmp`[↗](#Duration.cmp) | `export fn (self: &amp;Duration) cmp(other: &amp;Duration):` |  |
| `op==`[↗](#Duration.op==) | `export fn (self: &amp;Duration) op==(other: &amp;Duration)` |  |
| `op<`[↗](#Duration.op<) | `export fn (self: &amp;Duration) op&lt;(other: &amp;Duration):` |  |
| `op>`[↗](#Duration.op>) | `export fn (self: &amp;Duration) op&gt;(other: &amp;Duration):` |  |
| `op<=`[↗](#Duration.op<=) | `export fn (self: &amp;Duration) op&lt;=(other: &amp;Duration)` |  |
| `op>=`[↗](#Duration.op>=) | `export fn (self: &amp;Duration) op&gt;=(other: &amp;Duration)` |  |
| `toString`[↗](#Duration.toString) | `export fn (self: &amp;Duration) toString(): string` |  |

---

### <a id="FILETIME"></a>`FILETIME`

> 📄 `native.windows.vxc` L3-6

```vex
struct FILETIME
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `dwLowDateTime` | `u32` | 🔒 private |  |
| `dwHighDateTime` | `u32` | 🔒 private |  |

---

### <a id="SYSTEMTIME"></a>`SYSTEMTIME`

> 📄 `native.windows.vxc` L108-117

```vex
struct SYSTEMTIME
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `wYear` | `u16` | 🔒 private |  |
| `wMonth` | `u16` | 🔒 private |  |
| `wDayOfWeek` | `u16` | 🔒 private |  |
| `wDay` | `u16` | 🔒 private |  |
| `wHour` | `u16` | 🔒 private |  |
| `wMinute` | `u16` | 🔒 private |  |
| `wSecond` | `u16` | 🔒 private |  |
| `wMilliseconds` | `u16` | 🔒 private |  |

---

### <a id="TIME_ZONE_INFORMATION"></a>`TIME_ZONE_INFORMATION`

> 📄 `native.windows.vxc` L119-128

```vex
struct TIME_ZONE_INFORMATION
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `Bias` | `i32` | 🔓 public |  |
| `StandardName` | `[u16; 32]` | 🔓 public |  |
| `StandardDate` | `SYSTEMTIME` | 🔓 public |  |
| `StandardBias` | `i32` | 🔓 public |  |
| `DaylightName` | `[u16; 32]` | 🔓 public |  |
| `DaylightDate` | `SYSTEMTIME` | 🔓 public |  |
| `DaylightBias` | `i32` | 🔓 public |  |

---

## Enums

### <a id="Month"></a>`Month` `🔓 export`

> 📄 `constants.vx` L5-18

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

> 📄 `constants.vx` L20-28

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

> 📄 `location.vx` L70-72

```vex
export fn UTC(): Location
```

**Returns:** `Location`

---

### <a id="Local"></a>`Local` `🔓 export`

> 📄 `location.vx` L74-77

```vex
export fn Local(): Location
```

**Returns:** `Location`

---

### <a id="fixedZone"></a>`fixedZone` `🔓 export`

> 📄 `location.vx` L79-81

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

> 📄 `location.vx` L90-110

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

> 📄 `location.vx` L173-173

```vex
export fn EST(): Location
```

**Returns:** `Location`

---

### <a id="PST"></a>`PST` `🔓 export`

> 📄 `location.vx` L174-174

```vex
export fn PST(): Location
```

**Returns:** `Location`

---

### <a id="CET"></a>`CET` `🔓 export`

> 📄 `location.vx` L175-175

```vex
export fn CET(): Location
```

**Returns:** `Location`

---

### <a id="TRT"></a>`TRT` `🔓 export`

> 📄 `location.vx` L176-176

```vex
export fn TRT(): Location
```

**Returns:** `Location`

---

### <a id="JST"></a>`JST` `🔓 export`

> 📄 `location.vx` L177-177

```vex
export fn JST(): Location
```

**Returns:** `Location`

---

### <a id="vex_time_current_ns"></a>`vex_time_current_ns` `🔓 export`

> 📄 `native.macos.vxc` L15-20

```vex
export fn vex_time_current_ns(): u64
```

**Returns:** `u64`

---

### <a id="vex_nanosleep"></a>`vex_nanosleep` `🔓 export`

> 📄 `native.macos.vxc` L22-40

```vex
export fn vex_nanosleep(ns: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ns` | `u64` |  |

---

### <a id="vex_monotonic_ns"></a>`vex_monotonic_ns` `🔓 export`

> 📄 `native.macos.vxc` L42-47

```vex
export fn vex_monotonic_ns(): u64
```

**Returns:** `u64`

---

### <a id="vex_tz_offset_at_shim"></a>`vex_tz_offset_at_shim` `🔓 export`

> 📄 `native.macos.vxc` L74-76

```vex
export fn vex_tz_offset_at_shim(name: Ptr<u8>, unix_sec: i64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `Ptr&lt;u8&gt;` |  |
| `unix_sec` | `i64` |  |

**Returns:** `i64`

---

### <a id="vex_tz_exists_shim"></a>`vex_tz_exists_shim` `🔓 export`

> 📄 `native.macos.vxc` L78-80

```vex
export fn vex_tz_exists_shim(name: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_get_local_offset"></a>`vex_get_local_offset` `🔓 export`

> 📄 `native.macos.vxc` L82-92

```vex
export fn vex_get_local_offset(): i64
```

**Returns:** `i64`

---

### <a id="isDigit"></a>`isDigit`

> 📄 `parse.vx` L17-19

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

> 📄 `parse.vx` L21-35

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

### <a id="scan_nanos_at"></a>`scan_nanos_at`

> 📄 `parse.vx` L37-51

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

### <a id="daysFromCivil"></a>`daysFromCivil`

> 📄 `parse.vx` L57-67

```vex
fn daysFromCivil(year: i32, month: i32, day: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `year` | `i32` |  |
| `month` | `i32` |  |
| `day` | `i32` |  |

**Returns:** `i64`

---

### <a id="validDateTime"></a>`validDateTime`

> 📄 `parse.vx` L69-76

```vex
fn validDateTime(y: i32, m: i32, d: i32, h: i32, min: i32, s: i32): bool
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

**Returns:** `bool`

---

### <a id="partsToNs"></a>`partsToNs`

> 📄 `parse.vx` L78-102

```vex
fn partsToNs(y: i32, m: i32, d: i32, h: i32, min: i32, s: i32, ns: i64, offsetSeconds: i32): Option<i64>
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
| `offsetSeconds` | `i32` |  |

**Returns:** `Option&lt;i64&gt;`

---

### <a id="parse"></a>`parse` `🔓 export`

> 📄 `parse.vx` L104-157

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

> 📄 `parse.vx` L159-222

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

> 📄 `parse.vx` L224-307

```vex
export fn parse_duration(input: str): Result<Duration, string>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |

**Returns:** `Result&lt;Duration, string&gt;`

---

### <a id="signedDurationBetween"></a>`signedDurationBetween`

> 📄 `instant.vx` L12-27

```vex
fn signedDurationBetween(later: u64, earlier: u64): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `later` | `u64` |  |
| `earlier` | `u64` |  |

**Returns:** `Duration`

---

### <a id="now"></a>`now` `🔓 export`

> 📄 `helpers.vx` L13-15

```vex
export fn now(): Time
```

**Returns:** `Time`

---

### <a id="sleep"></a>`sleep` `🔓 export`

> 📄 `helpers.vx` L18-22

```vex
export fn sleep(d: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `d` | `i64` |  |

---

### <a id="sleep"></a>`sleep` `🔓 export`

> 📄 `helpers.vx` L25-30

```vex
export fn sleep(d: Duration)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `d` | `Duration` |  |

---

### <a id="getLocalOffset"></a>`getLocalOffset` `🔓 export`

> 📄 `helpers.vx` L33-35

```vex
export fn getLocalOffset(): i64
```

**Returns:** `i64`

---

### <a id="since"></a>`since` `🔓 export`

> 📄 `helpers.vx` L45-48

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

> 📄 `helpers.vx` L51-54

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

> 📄 `helpers.vx` L57-63

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

> 📄 `helpers.vx` L66-75

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

> 📄 `helpers.vx` L78-80

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

> 📄 `helpers.vx` L83-83

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

> 📄 `helpers.vx` L84-84

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

> 📄 `helpers.vx` L85-85

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

> 📄 `helpers.vx` L86-86

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

> 📄 `helpers.vx` L89-91

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

> 📄 `helpers.vx` L93-93

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

> 📄 `helpers.vx` L94-94

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

> 📄 `helpers.vx` L95-95

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

> 📄 `helpers.vx` L98-105

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

> 📄 `helpers.vx` L108-108

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

> 📄 `helpers.vx` L110-112

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

> 📄 `helpers.vx` L114-116

```vex
export fn clock(t: Time): (i32, i32, i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |

**Returns:** `(i32, i32, i32)`

---

### <a id="newTimer"></a>`newTimer` `🔓 export`

> 📄 `helpers.vx` L139-141

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

> 📄 `helpers.vx` L212-214

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

> 📄 `helpers.vx` L252-255

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

> 📄 `helpers.vx` L261-264

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

> 📄 `helpers.vx` L266-271

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

> 📄 `helpers.vx` L275-278

```vex
export fn formatInLocation(t: Time, layout: str, loc: &Location): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `layout` | `str` |  |
| `loc` | `&amp;Location` |  |

**Returns:** `string`

---

### <a id="toRFC3339InLocation"></a>`toRFC3339InLocation` `🔓 export`

> 📄 `helpers.vx` L281-306

```vex
export fn toRFC3339InLocation(t: Time, loc: &Location): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `loc` | `&amp;Location` |  |

**Returns:** `string`

---

### <a id="inLocation"></a>`inLocation` `🔓 export`

> 📄 `helpers.vx` L310-313

```vex
export fn inLocation(t: Time, loc: &Location): Time
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `loc` | `&amp;Location` |  |

**Returns:** `Time`

---

### <a id="isDST"></a>`isDST` `🔓 export`

> 📄 `helpers.vx` L316-318

```vex
export fn isDST(t: Time, loc: &Location): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `Time` |  |
| `loc` | `&amp;Location` |  |

**Returns:** `bool`

---

### <a id="days_in_month"></a>`days_in_month` `🔓 export`

> 📄 `time_type.vx` L14-22

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

> 📄 `time_type.vx` L47-72

```vex
export fn ns_to_datetime(ns: i64): DateTimeParts
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ns` | `i64` |  |

**Returns:** `DateTimeParts`

---

### <a id="floor_div"></a>`floor_div`

> 📄 `time_type.vx` L110-117

```vex
fn floor_div(value: i64, unit: i64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `i64` |  |
| `unit` | `i64` |  |

**Returns:** `i64`

---

### <a id="add"></a>`add` `🔓 export`

> 📄 `time_type.vx` L219-221

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

> 📄 `time_type.vx` L223-225

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

### <a id="write_padded_int"></a>`write_padded_int`

> 📄 `time_type.vx` L317-329

```vex
fn write_padded_int(sb: &StringBuilder!, val: i64, width: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `sb` | `&amp;StringBuilder!` |  |
| `val` | `i64` |  |
| `width` | `i32` |  |

---

### <a id="vex_time_current_ns"></a>`vex_time_current_ns` `🔓 export`

> 📄 `native.linux.vxc` L14-19

```vex
export fn vex_time_current_ns(): u64
```

**Returns:** `u64`

---

### <a id="vex_nanosleep"></a>`vex_nanosleep` `🔓 export`

> 📄 `native.linux.vxc` L21-36

```vex
export fn vex_nanosleep(ns: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ns` | `u64` |  |

---

### <a id="vex_monotonic_ns"></a>`vex_monotonic_ns` `🔓 export`

> 📄 `native.linux.vxc` L38-43

```vex
export fn vex_monotonic_ns(): u64
```

**Returns:** `u64`

---

### <a id="vex_tz_offset_at_shim"></a>`vex_tz_offset_at_shim` `🔓 export`

> 📄 `native.linux.vxc` L70-72

```vex
export fn vex_tz_offset_at_shim(name: Ptr<u8>, unix_sec: i64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `Ptr&lt;u8&gt;` |  |
| `unix_sec` | `i64` |  |

**Returns:** `i64`

---

### <a id="vex_tz_exists_shim"></a>`vex_tz_exists_shim` `🔓 export`

> 📄 `native.linux.vxc` L74-76

```vex
export fn vex_tz_exists_shim(name: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_get_local_offset"></a>`vex_get_local_offset` `🔓 export`

> 📄 `native.linux.vxc` L78-88

```vex
export fn vex_get_local_offset(): i64
```

**Returns:** `i64`

---

### <a id="fmt_int"></a>`fmt_int`

> 📄 `format.vxc` L5-25

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

> 📄 `format.vxc` L29-107

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

> 📄 `lib.vx` L5-5

```vex
export fn utc(): Location
```

**Returns:** `Location`

---

### <a id="local"></a>`local` `🔓 export`

> 📄 `lib.vx` L6-6

```vex
export fn local(): Location
```

**Returns:** `Location`

---

### <a id="fixed_zone"></a>`fixed_zone` `🔓 export`

> 📄 `lib.vx` L7-7

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

> 📄 `lib.vx` L8-8

```vex
export fn load_location(name: string): Result<Location, string>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` |  |

**Returns:** `Result&lt;Location, string&gt;`

---

### <a id="abs_date"></a>`abs_date` `🔓 export`

> 📄 `conversions.vx` L15-30

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

> 📄 `conversions.vx` L32-34

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

> 📄 `conversions.vx` L37-58

```vex
export fn nsToDateTime(ns: i64): (i32, i32, i32, i32, i32, i32, i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ns` | `i64` |  |

**Returns:** `(i32, i32, i32, i32, i32, i32, i32)`

---

### <a id="magnitude"></a>`magnitude`

> 📄 `duration.vx` L10-16

```vex
fn magnitude(value: i64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `i64` |  |

**Returns:** `u64`

---

### <a id="seconds"></a>`seconds` `🔓 export`

> 📄 `duration.vx` L47-49

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

> 📄 `duration.vx` L51-53

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

> 📄 `duration.vx` L55-57

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

> 📄 `duration.vx` L59-61

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

> 📄 `duration.vx` L63-65

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

> 📄 `duration.vx` L67-69

```vex
export fn hours(h: i64): Duration
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `h` | `i64` |  |

**Returns:** `Duration`

---

### <a id="vex_time_current_ns"></a>`vex_time_current_ns` `🔓 export`

> 📄 `native.windows.vxc` L32-42

```vex
export fn vex_time_current_ns(): u64
```

**Returns:** `u64`

---

### <a id="sleepMilliseconds"></a>`sleepMilliseconds`

> 📄 `native.windows.vxc` L44-55

```vex
fn sleepMilliseconds(ns: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ns` | `u64` |  |

---

### <a id="vex_nanosleep"></a>`vex_nanosleep` `🔓 export`

> 📄 `native.windows.vxc` L57-93

```vex
export fn vex_nanosleep(ns: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ns` | `u64` |  |

---

### <a id="vex_monotonic_ns"></a>`vex_monotonic_ns` `🔓 export`

> 📄 `native.windows.vxc` L95-106

```vex
export fn vex_monotonic_ns(): u64
```

**Returns:** `u64`

---

### <a id="vex_tz_offset_at_shim"></a>`vex_tz_offset_at_shim` `🔓 export`

> 📄 `native.windows.vxc` L139-141

```vex
export fn vex_tz_offset_at_shim(name: Ptr<u8>, unix_sec: i64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `Ptr&lt;u8&gt;` |  |
| `unix_sec` | `i64` |  |

**Returns:** `i64`

---

### <a id="vex_tz_exists_shim"></a>`vex_tz_exists_shim` `🔓 export`

> 📄 `native.windows.vxc` L143-145

```vex
export fn vex_tz_exists_shim(name: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_get_local_offset"></a>`vex_get_local_offset` `🔓 export`

> 📄 `native.windows.vxc` L147-181

```vex
export fn vex_get_local_offset(): i64
```

**Returns:** `i64`

---

---

*Generated by vex-doc v2.0 • 2026-09-03*
