import axios from 'axios'
import Syncano from '@syncano/core'
import Validator from '@syncano/validate'

export default async ctx => {
  const {response} = new Syncano(ctx)
  const validator = new Validator(ctx)

  // Validate arguments against jsonSchema (socket.yml)
  try {
    await validator.validateRequest()
  } catch (err) {
    return response.json(err.messages, 400)
  }

  const {city} = ctx.args
  const {API_KEY} = ctx.config

  try {
    const result = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    )
    const weather = result.data
    const threeHoursWeather = weather.list.slice(0, 3) // A three-hour period

    const forecast = threeHoursWeather.map(status => {
      const date = new Date(status.dt * 1000)
      const dateHour = date.toLocaleString('en-US', { hour: 'numeric' })

      return {
        hour: dateHour,
        forecast: status.weather[0].main,
        rain: status.weather[0].rain
      }
    })
    return response.json(forecast)
  } catch (err) {
    return response.json({message: err.response.data.message}, 400)
  }
}
