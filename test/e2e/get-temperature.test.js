/* global describe it expect */
import {run} from '@syncano/test'

describe('get-temperature', function () {
  const config = {
    API_KEY: process.env.OPENWEATHERMAP_API_KEY
  }

  it('existing city', async () => {
    const result = await run('get-temperature', {args: {city: 'Oslo'}, config})

    expect(result).toHaveProperty('code', 200)
    expect(result.data).toHaveProperty('temp')
  })

  it('wrong API key', async () => {
    const params = {
      args: {
        city: 'Oslo'
      },
      config: {
        API_KEY: 'dummy'
      }
    }
    const result = await run('get-temperature', params)

    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message')
    expect(result.data.message).toEqual(expect.stringMatching('Invalid API key'))
  })
})

// /* global describe it */
// import {assert} from 'chai'
// import {run, generateMeta} from '@syncano/test'
//
// describe('get-temperature', function () {
//   const meta = generateMeta()
//   const config = {
//     API_KEY: process.env.OPENWEATHERMAP_API_KEY
//   }
//
//   it('existing city', function (done) {
//     run('get-temperature', {args: {city: 'Oslo'}, meta, config})
//       .then(response => {
//         assert.property(response.data, 'temp')
//         assert.propertyVal(response, 'code', 200)
//         done()
//       })
//   })
//   it('wrong API_KEY', function (done) {
//     run('get-temperature', {args: {city: 'Oslo'}, meta, config: {API_KEY: 'dummy'}})
//       .then(response => {
//         assert.property(response.data, 'message')
//         assert.propertyVal(response, 'code', 400)
//         assert(response.data.message.includes('Invalid API key.'))
//         done()
//       })
//   })
// })
