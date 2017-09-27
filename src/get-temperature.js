import axios from 'axios'

export default (ctx) => {
  return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${ctx.args.city}&appid=${ctx.config.APP_ID}`)
  .then((response) => response.data)
  .then((weather) => {
    const temperatureKelvin = weather.main.temp
    const temperatureCelsius = temperatureKelvin - 273.15

    ctx.setResponse(new ctx.HttpResponse(
      200,
      JSON.stringify({ temp: temperatureCelsius.toFixed(1) }),
      ctx.meta.metadata.response.mimetype
    ))
  })
  .catch((error) => {
    ctx.setResponse(new ctx.HttpResponse(
      400,
      JSON.stringify({ message: error.response.data.message }),
      ctx.meta.metadata.response.mimetype
    ))
  })
}
