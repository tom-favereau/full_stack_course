import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({ capital }) => {
    const [weatherData, setWeatherData] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY
    //console.log(api_key)

    useEffect(() => {
        if (!capital) return

        axios
            .get("https://api.openweathermap.org/data/2.5/weather", {
                params: {
                    q: capital,
                    units: "metric",
                    appid: api_key
                }
            })
            .then(response => setWeatherData(response.data))
            .catch(error => console.log("Weather error"))
    }, [capital, api_key])

    if (!weatherData) return <p>Loading weather...</p>

    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <img src={iconUrl} alt={weatherData.weather[0].description} />
            <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
    )
}

export default Weather
