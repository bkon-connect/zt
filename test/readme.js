
import fs from 'fs'
import path from 'path'
import {transform} from 'babel-core'
import {addTimeZoneData, clearTimeZoneData} from '../src/registry.js'

const readme = fs.readFileSync('README.md', 'utf8')
const raw = readme.replace(/^[^]*```js([^]*)```[^]*$/g, '$1')
  .replace(/from 'zt/g, 'from \'../src/core.js')
const code = transform(raw, {filename: path.resolve('README.md')}).code

describe('README', () => {
  before(() => {
    clearTimeZoneData()
    addTimeZoneData(require('../data/packed/complete.json'))
  })
  after(clearTimeZoneData)
  /* eslint-disable no-eval */
  it('should run without errors', () => eval(code))
  /* eslint-enable no-eval */
})
