import axios from 'axios';


axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${ARGS.city}&appid=${CONFIG.APP_ID}`)
  .then((response) => response.data)
  .then((weather) => {
    const threeHoursWeather = weather.list.slice(0, 3); // A three-hour period
    const forecast = threeHoursWeather.map((status) => {
      const date = new Date(status.dt * 1000);
      const dateHour = date.toLocaleString('en-US', { hour: "numeric" });

      return {
        forecast: status.weather[0].main,
        hour: dateHour,
        rain: status.weather[0].rain
      };
   });

    setResponse(new HttpResponse(
      200,
      JSON.stringify(forecast),
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
