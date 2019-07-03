import React, { useState, useEffect } from "react";
import axios from "axios";

function objectEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

const loadAndSet = (set, link) => {
  axios.get(link).then(response => {
    set(response.data);
  });
};

const loadCountries = set => () =>
  loadAndSet(set, "https://restcountries.eu/rest/v2/all");

const loadWeather = (set, city) => () =>
  loadAndSet(
    set,
    `https://api.apixu.com/v1/current.json?key=bc8e6a9a612a420d95c160551190307&q=${city}`
  );

const LanguageList = ({ list }) => {
  const mapped = list.map(x => <li key={x.iso639_2}>{x.name}</li>);
  return <ul>{mapped}</ul>;
};

const DisplayWeather = ({ city, weather, setWeather }) => {
  // setWeather({});
  useEffect(loadWeather(setWeather, city), []);
  console.log(weather)
  if (objectEmpty(weather)) {
    return <></>;
  } else {
    return(
    <div>
      <b>temperature: {weather.current.temp_c}</b> <br/>
      <img src={weather.current.condition.icon} alt=""/> <br/>
      <b>wind: {weather.current.wind_kph}</b>
    </div>
    )
  }
};

const DisplayCountry = ({ country, weather, setWeather}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital: {country.capital}
        <br />
        population: {country.population}
      </p>
      <h2>
        <b>Languages</b>
      </h2>
      <LanguageList list={country.languages} />
      <p />
      <div>
        <img src={country.flag} alt="flag" height="100" />
      </div>
      <b>Weather in {country.capital}</b>
      <DisplayWeather city={country.capital} weather={weather} setWeather={setWeather} />
    </div>
  );
};

const filteredCountries = (countries, search) => {
  const regexp = new RegExp(`.*${search}.*`, "i");
  return countries.filter(x => x.name.match(regexp));
};

const Search = ({ setSearchBox }) => {
  const onChange = event => setSearchBox(event.target.value);
  return (
    <form>
      <input onChange={onChange} />
    </form>
  );
};

const DisplayCountryList = ({ list, setSearchBox }) => {
  const SelectButton = ({ value }) => {
    const select = event => {
      event.preventDefault();
      setSearchBox(value);
    };

    return <button onClick={select}>select</button>;
  };

  const mapped = list.map(x => (
    <li key={x.alpha3Code}>
      {x.name} <SelectButton value={x.name} />
    </li>
  ));
  return <ul>{mapped}</ul>;
};

const DisplayResults = ({ list, setSearchBox, weather, setWeather }) => {
  if (list.length > 10) {
    return <div>Specify search tearm</div>;
  } else if (list.length > 1) {
    return <DisplayCountryList list={list} setSearchBox={setSearchBox} />;
  } else if (list.length === 1) {
    return <DisplayCountry country={list[0]} weather={weather} setWeather={setWeather}/>;
  } else {
    return <div>Nothing was found :sad:</div>;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchBox, setSearchBox] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(loadCountries(setCountries), []);

  return (
    <div>
      <Search setSearchBox={setSearchBox} />
      <DisplayResults
        list={filteredCountries(countries, searchBox)}
        setSearchBox={setSearchBox}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  );
}

export default App;
