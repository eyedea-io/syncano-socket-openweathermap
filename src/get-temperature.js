import axios from 'axios'
import Syncano from '@syncano/core'

export default async ctx => {
  const {response} = new Syncano(ctx)
  const {city} = ctx.args
  const {API_KEY} = ctx.config

  try {
    const result = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
    const temperatureKelvin = result.data.main.temp
    const temperatureCelsius = temperatureKelvin - 273.15

    return response.json({temp: temperatureCelsius.toFixed(1)})
  } catch (err) {
    return response.json({message: err.response.data.message}, 400)
  }
}
