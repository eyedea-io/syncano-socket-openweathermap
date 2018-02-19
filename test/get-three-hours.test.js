/* global describe it */
import {assert} from 'chai'
import {run, generateMeta} from '@syncano/test'

describe('get-three-hours', function () {
  const meta = generateMeta()
  const config = {
    API_KEY: process.env.OPENWEATHERMAP_API_KEY
  }

  it('existing city', function (done) {
    run('get-three-hours', {args: {city: 'Oslo'}, meta, config})
      .then(response => {
        assert.isArray(response.data)
        assert.propertyVal(response, 'code', 200)
        done()
      })
  })
  it('wrong API_KEY', function (done) {
    run('get-three-hours', {args: {city: 'Oslo'}, meta, config: {API_KEY: 'dummy'}})
      .then(response => {
        assert.property(response.data, 'message')
        assert.propertyVal(response, 'code', 400)
        assert(response.data.message.includes('Invalid API key.'))
        done()
      })
  })
})
