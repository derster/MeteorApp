const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=d213cc4c99915d4563106ca7230db731';
export const fetchWeather = (lat,lon) => {
  const url = rootUrl+ "&lat="+lat+"&lon="+lon
  console.log(url)

  return fetch(url)
    .then(res => res.json())
    .then(json => ({
       temp: json.main.temp,
       weather: json.weather[0].main,
       city: json.name
    }))
}
