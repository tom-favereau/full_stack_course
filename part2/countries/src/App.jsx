import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from "./components/weather.jsx";

const App = () => {
    const [allCountries, setAllCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)



    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages,area')
            .then(res => setAllCountries(res.data))
            .catch(err => console.log('fail'))
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        setSelectedCountry(null)
    }

    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    const handleShowClick = (country) => {
        setSelectedCountry(country)
    }

    const render = () => {
        if (filter == null || filteredCountries.length > 10){
            return <p>Too many matches, specify another filter</p>
        } else if (selectedCountry) {
                return <CountryDetails country={selectedCountry} />
        } else if (filteredCountries.length === 1) {
            return <CountryDetails country={filteredCountries[0]} />
        } else {
            return filteredCountries.map(c =>
                <p key={c.name.common}>{c.name.common}
                    <button onClick={() => handleShowClick(c)}>Show</button>
                </p>)
        }
    }

    return (
        <div>
            <div>
                find countries: <input value={filter} onChange={handleFilterChange} />
            </div>

            <div>{render()}</div>
        </div>
    )
}

const CountryDetails = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>Capital: {country.capital[0]}</div>
            <div>Population: {country.population}</div>
            <div>Area: {country.area}</div>

            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages || {}).map(lang =>
                    <li key={lang}>{lang}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
            <Weather capital={country.capital[0]} />

        </div>
    )
}

export default App
