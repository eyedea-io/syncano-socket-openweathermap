import axios from 'axios'
import Syncano from 'syncano-server'

export default (ctx) => {
  const {response} = Syncano(ctx)

  return axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${ctx.args.city}&appid=${ctx.config.API_KEY}`)
  .then((response) => response.data)
  .then((weather) => {
    const threeHoursWeather = weather.list.slice(0, 3) // A three-hour period
    const forecast = threeHoursWeather.map((status) => {
      const date = new Date(status.dt * 1000)
      const dateHour = date.toLocaleString('en-US', { hour: 'numeric' })

      return {
        forecast: status.weather[0].main,
        hour: dateHour,
        rain: status.weather[0].rain
      }
    })

    response.json(forecast)
  })
  .catch((error) => {
    response.json({message: error.response.data.message}, 400)
  })
}
