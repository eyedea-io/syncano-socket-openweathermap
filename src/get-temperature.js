import axios from 'axios'
import Syncano from 'syncano-server'

export default (ctx) => {
  const {response} = Syncano(ctx)
  return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${ctx.args.city}&appid=${ctx.config.API_KEY}`)
  .then((response) => response.data)
  .then((weather) => {
    const temperatureKelvin = weather.main.temp
    const temperatureCelsius = temperatureKelvin - 273.15

    response.json({temp: temperatureCelsius.toFixed(1)})
  })
  .catch((error) => {
    response.json({ message: error.response.data.message }, 400)
  })
}
