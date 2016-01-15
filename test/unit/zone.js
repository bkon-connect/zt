
import assert from 'assert'
import {dst} from '../../src/core.js'
import {addTimeZoneData, clearTimeZoneData} from '../../src/registry.js'
import data from '../../data/packed/complete.json'

describe('Zone', () => {
  before(() => {
    addTimeZoneData(data)
  })

  after(() => {
    clearTimeZoneData()
  })

  describe('#dst()', () => {
    const name = 'America/Chicago'

    it('should return true for DST times', () => {
      const ts = [
        Date.UTC(2016, 2, 13, 8),
        Date.UTC(2016, 10, 6, 6)
      ]
      ts.forEach(t => assert.equal(dst(t, name), true))
    })

    it('should return false for non-DST times', () => {
      const ts = [
        Date.UTC(2016, 2, 13, 7),
        Date.UTC(2016, 10, 6, 7)
      ]
      ts.forEach(t => assert.equal(dst(t, name), false))
    })
  })
})
