
import assert from 'assert'
import {
  addTimeZoneData as add,
  hasTimeZoneData as has,
  clearTimeZoneData as clear,
  removeTimeZoneData as rm,
  getZone as gz
} from '../../src/registry.js'
import Zone from '../../src/zone.js'
import packed from '../fixtures/packed.json'
import unpacked from '../fixtures/unpacked.json'

// Fixtures:
// 1. normal zone
// 2. parent zone
// 3. linked zone
// 4. linked zone with abbrs
// 5. deep linked zone

const alln = unpacked.zones.map(z => z.name)
const [n1, n2, n3, n4, n5] = alln

describe('registry', () => {
  before(clear)

  describe('addTimeZoneData', () => {
    afterEach(clear)

    it('should add packed zones', () => {
      assert.ok(!has(n1))
      assert.ok(!has(n2))
      add(packed)
      assert.ok(has(n1))
      assert.ok(has(n2))
    })

    it('should add unpacked zones', () => {
      assert.ok(!has(n1))
      assert.ok(!has(n2))
      add(unpacked)
      assert.ok(has(n1))
      assert.ok(has(n2))
    })

    it('should add packed links', () => {
      assert.ok(!has(n3))
      assert.ok(!has(n4))
      assert.ok(!has(n5))
      add(packed)
      assert.ok(has(n3))
      assert.ok(has(n4))
      assert.ok(has(n5))
    })
  })

  describe('clearTimeZoneData', () => {
    it('should clear packed zones', () => {
      assert.ok(!has(n1))
      assert.ok(!has(n2))
      add(packed)
      assert.ok(has(n1))
      assert.ok(has(n2))
      clear()
      assert.ok(!has(n1))
      assert.ok(!has(n2))
    })

    it('should clear unpacked zones', () => {
      assert.ok(!has(n1))
      assert.ok(!has(n2))
      add(unpacked)
      assert.ok(has(n1))
      assert.ok(has(n2))
      clear()
      assert.ok(!has(n1))
      assert.ok(!has(n2))
    })

    it('should clear packed links', () => {
      assert.ok(!has(n3))
      assert.ok(!has(n4))
      assert.ok(!has(n5))
      add(packed)
      assert.ok(has(n3))
      assert.ok(has(n4))
      assert.ok(has(n5))
      clear()
      assert.ok(!has(n3))
      assert.ok(!has(n4))
      assert.ok(!has(n5))
    })
  })

  describe('removeTimeZoneData', () => {
    afterEach(clear)

    it('should remove packed zones', () => {
      assert.ok(!has(n1))
      assert.ok(!has(n2))
      add(packed)
      assert.ok(has(n1))
      assert.ok(has(n2))
      rm(n2)
      assert.ok(has(n1))
      assert.ok(!has(n2))
    })

    it('should remove unpacked zones', () => {
      assert.ok(!has(n1))
      assert.ok(!has(n2))
      add(unpacked)
      assert.ok(has(n1))
      assert.ok(has(n2))
      rm(n2)
      assert.ok(has(n1))
      assert.ok(!has(n2))
    })

    it('should remove packed links', () => {
      assert.ok(!has(n3))
      add(packed)
      assert.ok(has(n1))
      assert.ok(has(n3))
      rm(n3)
      assert.ok(has(n1))
      assert.ok(!has(n3))
    })

    it('should remove packed links when linked zone is removed', () => {
      add(packed)
      assert.ok(has(n1))
      assert.ok(has(n2))
      assert.ok(has(n3))
      assert.ok(has(n4))
      assert.ok(has(n5))
      rm(n2)
      assert.ok(has(n1))
      assert.ok(!has(n2))
      assert.ok(!has(n3))
      assert.ok(!has(n4))
      assert.ok(!has(n5))
      clear()
      add(packed)
      assert.ok(has(n1))
      assert.ok(has(n2))
      assert.ok(has(n3))
      assert.ok(has(n4))
      assert.ok(has(n5))
      rm(n3)
      assert.ok(has(n1))
      assert.ok(has(n2))
      assert.ok(!has(n3))
      assert.ok(has(n4))
      assert.ok(has(n5))
    })
  })

  describe('getZone', () => {
    afterEach(clear)

    it('should return a zone instance for packed zones', () => {
      add(packed)
      assert.ok(gz(n1) instanceof Zone)
      assert.ok(gz(n2) instanceof Zone)
    })

    it('should return a zone instance for unpacked zones', () => {
      add(unpacked)
      assert.ok(gz(n1) instanceof Zone)
      assert.ok(gz(n2) instanceof Zone)
    })

    it('should return a zone instance for packed links', () => {
      add(packed)
      assert.ok(gz(n3) instanceof Zone)
    })

    it('should set the name of the zone', () => {
      const check = n => assert.equal(gz(n).name, n, n)
      add(packed)
      alln.map(check)
      clear()
      add(unpacked)
      alln.map(check)
    })

    it('should populate unpacked links', () => {
      add(unpacked)
      assert.equal(gz(n1).link, undefined)
      assert.equal(gz(n2).link, undefined)
      assert.equal(gz(n3).link, gz(n2).name)
      assert.equal(gz(n4).link, gz(n2).name)
      assert.equal(gz(n5).link, gz(n2).name)
    })

    it('should link a packed zone to its canonical parent', () => {
      add(packed)
      assert.equal(gz(n1).link, undefined)
      assert.equal(gz(n2).link, undefined)
      assert.equal(gz(n3).link, gz(n2).name)
      assert.equal(gz(n4).link, gz(n2).name)
      assert.equal(gz(n5).link, gz(n2).name)
    })

    it('should normalize zone names', () => {
      add(packed)
      assert.equal(gz(n2.toLowerCase()).name, n2)
      assert.equal(gz(n2.toUpperCase()).name, n2)
    })

    it('should apply link abbreviations to parent', () => {
      add(packed)
      const psplit = packed.zones[1].split('|')[1].split(' ')
      const lsplit = packed.links[1].split('|')[2].split(' ')
      const plmap = psplit.reduce((m, k, i) => ({...m, [k]: lsplit[i]}), {})
      const pabbrs = JSON.stringify(gz(n2).abbrs.map(a => plmap[a]))
      const labbrs = JSON.stringify(gz(n4).abbrs)
      assert.equal(labbrs, pabbrs)
    })
  })
})
