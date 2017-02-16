import axios from 'axios';

axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${ARGS.city}&appid=${CONFIG.APP_ID}`)
  .then((response) => response.data)
  .then((weather) => {
    const city = weather.name;
    const temperatureKelvin = weather.main.temp;
    const temperatureCelsius =  temperatureKelvin - 273.15;

    setResponse(new HttpResponse(
      200,
      JSON.stringify({ temp: temperatureCelsius.toFixed(1)}),
      META.metadata.response.mimetype
    ));
  })
  .catch((error) => {
    setResponse(new HttpResponse(
      400,
      JSON.stringify({ message: error.response.data.message }),
      META.metadata.response.mimetype
    ));
  });
