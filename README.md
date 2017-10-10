
# zt

> Minimalist timezones for Node.js and the browser, inspired by [moment-timezone](http://momentjs.com/timezone/)

**Note:** WIP

```js
import zt from 'zt'
import assert from 'assert'

// `zt` operates on UTC timestamps (milliseconds since 1 Jan, 1970 UTC)

let ts = Date.UTC(2016, 2, 13, 7) // 13 Mar, 2016 07:00 UTC
assert.equal(ts, 1457852400000)

// It converts UTC timestamps to local time timestamps
// (milliseconds since 1 Jan, 1970 UTC, plus or minus whatever
// local adjustments are in effect *at the given time*,
// i.e. Daylight Savings Time)

ts = zt(ts, 'America/Chicago')    // 13 Mar, 2016 01:00 CST
assert.equal(ts, 1457830800000)

ts = Date.UTC(2016, 2, 13, 8)     // 13 Mar, 2016 08:00 UTC
assert.equal(ts, 1457856000000)   // one hour later in UTC time...

ts = zt(ts, 'America/Chicago')    // 13 Mar, 2016 03:00 CDT
assert.equal(ts, 1457838000000)   // ...is 2 hours later in local time,
                                  // because Daylight Savings Time
                                  // went into effect

// Date objects can be used instead of timestamps...

let d = new Date(Date.UTC(2016, 2, 13, 7, 2, 3))

// ...and you'll get back a Date object in return...

d = zt(d, 'America/Chicago')
assert(d instanceof Date)

// ...which is convenient for formatted display in local time:

const pad = n => (n < 10 ? '0' : '') + n
const fmt = f => pad(d['getUTC' + f]())
const time = [fmt('Hours'), fmt('Minutes'), fmt('Seconds')].join(':')
assert.equal(time, '01:02:03')

// The local offset (in minutes) can be retrieved for a timestamp:

import {offset} from 'zt'

ts = Date.UTC(2016, 2, 13, 7)
let dm = offset(ts, 'America/Chicago')
assert.equal(dm, -360) // UTC - 6 hours (in minutes)

ts = Date.UTC(2016, 2, 13, 8)
dm = offset(ts, 'America/Chicago')
assert.equal(dm, -300) // UTC - 5 hours (in minutes)

// Apply an offset to a timestamp by converting to milliseconds...

ts += dm * 6e4 // (60000 milliseconds in an hour)

// ...which is all `zt()` really does:

ts = Date.UTC(2016, 2, 13, 8)
dm = offset(ts, 'America/Chicago')
assert.equal(zt(ts, 'America/Chicago'), ts + dm * 6e4)

// It can also convert local timestamps to UTC timestamps:

ts = Date.UTC(2016, 2, 13, 8)
ts = zt(ts, 'America/Chicago')        // UTC to local
ts = zt(ts, 'America/Chicago', true)  // local to UTC
assert.equal(ts, Date.UTC(2016, 2, 13, 8))

// It works for Date objects too:

d = new Date(Date.UTC(2016, 2, 13, 8))
d = zt(d, 'America/Chicago')        // UTC to local
d = zt(d, 'America/Chicago', true)  // local to UTC
assert(d instanceof Date)
assert.equal(d.getTime(), Date.UTC(2016, 2, 13, 8))

// Offsets can also be retrieved for local to UTC conversions...

ts = Date.UTC(2016, 2, 13, 8)
ts = zt(ts, 'America/Chicago')
dm = offset(ts, 'America/Chicago', true)
assert.equal(dm, 300)

// ...and are applied to local timestamps in the same way:

ts += dm * 6e4
assert.equal(ts, Date.UTC(2016, 2, 13, 8))

// Some local timestamps can't be directly converted to UTC,
// since the local time may be ambiguous (it happened more than
// once locally) or invalid (it never happened locally).

// For ambiguous conversions, the default is to use the *earliest*
// possible UTC time:

ts = Date.UTC(2016, 10, 6, 7)               // 6 Nov, 2016 07:00 UTC
ts = zt(ts, 'America/Chicago')              // 6 Nov, 2016 01:00 CST
ts = zt(ts, 'America/Chicago', true)        // 6 Nov, 2016 06:00 UTC
assert.equal(ts, Date.UTC(2016, 10, 6, 6))

// You can pass the `moveAmbiguousForward` option to use the *latest*
// possible UTC time instead:
let opts = {moveAmbiguousForward: true}
ts = Date.UTC(2016, 10, 6, 6)               // 6 Nov, 2016 06:00 UTC
ts = zt(ts, 'America/Chicago')              // 6 Nov, 2016 01:00 CDT
ts = zt(ts, 'America/Chicago', true, opts)  // 6 Nov, 2016 07:00 UTC
assert.equal(ts, Date.UTC(2016, 10, 6, 7))

// For invalid conversions, the default is to use the *earliest*
// valid UTC time:

ts = Date.UTC(2016, 2, 13, 8)               // 13 Mar, 2016 08:00 UTC
ts = zt(ts, 'America/Chicago')              // 13 Mar, 2016 03:00 CDT
ts -= 60 * 6e4                              // 13 Mar, 2016 02:00 CDT (invalid)
ts = zt(ts, 'America/Chicago', true)        // 13 Mar, 2016 07:00 UTC
assert.equal(ts, Date.UTC(2016, 2, 13, 7))

// You can pass the `moveInvalidForward` option to use the *latest*
// valid UTC time instead:

opts = {moveInvalidForward: true}
ts = Date.UTC(2016, 2, 13, 8)               // 13 Mar, 2016 08:00 UTC
ts = zt(ts, 'America/Chicago')              // 13 Mar, 2016 03:00 CDT
ts -= 60 * 6e4                              // 13 Mar, 2016 02:00 CDT (invalid)
ts = zt(ts, 'America/Chicago', true, opts)  // 13 Mar, 2016 08:00 UTC
assert.equal(ts, Date.UTC(2016, 2, 13, 8))

// The timezone abbreviation (which may change over time) can
// be retrieved for a given timestamp:

import {abbr} from 'zt'

ts = Date.UTC(2016, 2, 13, 7)
assert.equal(abbr(ts, 'America/Chicago'), 'CST')

ts = Date.UTC(2016, 2, 13, 8)
assert.equal(abbr(ts, 'America/Chicago'), 'CDT')

// Whether or not a given timestamp falls during Daylight Savings Time
// can be retrieved as well:

import {dst} from 'zt'

ts = Date.UTC(2016, 2, 13, 7)
assert.ok(!dst(ts, 'America/Chicago'))

ts = Date.UTC(2016, 2, 13, 8)
assert.ok(dst(ts, 'America/Chicago'))

```

### Timezone Data

Timezone data is sourced from the [moment-timezone](http://momentjs.com/timezone/) project and uses a slightly modified version of the totally excellent moment-timezone [packed format](http://momentjs.com/timezone/docs/#/data-formats/packed-format/).
