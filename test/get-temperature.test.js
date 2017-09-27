/* global describe it */
import {assert} from 'chai'
import {run} from 'syncano-test'

describe('get-temperature', function () {
  const config = {
    API_KEY: process.env.OPENWEATHERMAP_API_KEY
  }

  it('existing city', function (done) {
    run('get-temperature', {args: {city: 'Oslo'}, config})
      .then(response => {
        assert.property(response.data, 'temp')
        assert.propertyVal(response, 'code', 200)
        done()
      })
  })
  it('wrong API_KEY', function (done) {
    run('get-temperature', {args: {city: 'Oslo'}, config: {API_KEY: 'dummy'}})
      .then(response => {
        assert.property(response.data, 'message')
        assert.propertyVal(response, 'code', 400)
        assert(response.data.message.includes('Invalid API key.'))
        done()
      })
  })
})
