/* global describe it expect */
import {run} from '@syncano/test'

describe('get-three-hours', function () {
  const config = {
    API_KEY: process.env.OPENWEATHERMAP_API_KEY
  }

  it('existing city', async () => {
    const result = await run('get-three-hours', {args: {city: 'Oslo'}, config})

    expect(result).toHaveProperty('code', 200)
    expect(Array.isArray(result.data)).toBe(true)
    expect(result.data).toHaveLength(3)
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
    const result = await run('get-three-hours', params)

    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message')
    expect(result.data.message).toEqual(expect.stringMatching('Invalid API key'))
  })
})
