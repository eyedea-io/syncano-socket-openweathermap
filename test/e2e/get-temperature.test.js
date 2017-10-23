/* global describe it */
import {assert} from 'chai'
import {run} from 'syncano-test'

describe('get-temperature', function() {
  const config = {
    API_KEY: process.env.OPENWEATHERMAP_API_KEY
  }

  it('existing city', function(done) {
    run('get-temperature', {args: {city: 'Oslo'}, config}).then(res => {
      assert.property(res.data, 'temp')
      assert.propertyVal(res, 'code', 200)
      done()
    })
  })
  it('wrong API_KEY', function(done) {
    run('get-temperature', {
      args: {city: 'Oslo'},
      config: {API_KEY: 'dummy'}
    }).then(res => {
      assert.property(res.data, 'message')
      assert.propertyVal(res, 'code', 400)
      assert(res.data.message.includes('Invalid API key.'))
      done()
    })
  })
})
