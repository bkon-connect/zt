
import {addTimeZoneData, clearTimeZoneData} from '../src/registry.js'
import data from '../data/packed/complete.json'

window.mocha.setup('bdd')

const units = require.context('./unit', true, /\.js$/)
units.keys().forEach(units)

const zones = require.context('./zones', true, /\.js$/)
zones.keys().map(zones).forEach(m => {
  Object.keys(m).forEach(n => {
    describe(n, () => {
      before(() => {
        clearTimeZoneData()
        addTimeZoneData(data)
      })
      Object.keys(m[n]).filter(y => y !== 'guess').forEach(y => {
        it(y, m[n][y])
      })
    })
  })
})

window.mocha.run()
