import "./App.css";

import { useEffect, useState } from "react";

import Header from "./components/header";
import Menus from "./components/menus/menus";
import WeatherHeader from "./components/weatherHeader";
import CatchPhrase from "./components/catchPhrase";
import WeatherDataForecast from "./components/weather/weatherDataForecast";
import WeatherDataCurrent from "./components/weather/weatherDataCurrent";

import favList from "./utils/favList";
// import worldCities from "./utils/worldCities.json";

function App() {
  const cntLenght = 8;
  const cnt = [];

  for (let i = 0; i < cntLenght; i++) {
    cnt.push(i);
  }

  // HOOKS
  const [cityName, setCityName] = useState("");

  const splitCityName = cityName.split(" ");
  for (var i = 0; i < splitCityName.length; i++) {
    splitCityName[i] =
      splitCityName[i].charAt(0).toUpperCase() + splitCityName[i].slice(1);
  }
  const citynameInCapitalize = splitCityName.join(" ");

  const [country, setCountry] = useState("");

  const [getWeatherCurrent, setGetWeatherCurrent] = useState({});
  const [getWeatherForecast, setGetWeatherForecast] = useState({});
  const [getCurrentAirQuality, setGetCurrentAirQuality] = useState({});

  const [willSearch, setWillSearch] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  const [addedToFavorite, setAddedToFavorite] = useState(false);

  // API
  // GetWeatherApi links
  // API KEYS : d493df14c0516863693cb4400253aaff /// c785a88639c20358827c2b46c36be516
  const currentLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&lang=sp&units=metric&limit=3&appid=c785a88639c20358827c2b46c36be516`;
  const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${country}&lang=sp&units=metric&limit=3&$cnt=${cntLenght}&appid=c785a88639c20358827c2b46c36be516`;
  // Ambee Data links
  const currentAirQualityLink = `https://api.weatherbit.io/v2.0/current/airquality?city=${cityName}&key=d2a73b171c4f4d3682997db8f0ed6737`;
  // API KEYS : d2a73b171c4f4d3682997db8f0ed6737
  // https://www.weatherapi.com links
  // API KEYS : 04196720d32144c9b0124634222512
  // const forecastDaily = "lien";

  // FUNCTIONS
  function handleCity(e) {
    setCityName(e.target.value);
  }

  function searchLocation() {
    setWillSearch(false);
    setHasSearched(true);

    // METHODE NORMALE 1 FETCH
    // fetch(currentLink)
    // .then((res) => res.json())
    // .then((res2) => {
    //   setGetWeatherCurrent(res2);
    //   console.log("res2 " + getWeatherCurrent.name);
    // })
    // .catch((err) => console.log("err: " + err));

    // METHODE DIMITRI
    // const currentLinkFetch = fetch(currentLink).then((res) => res.json());
    // const forecastLinkFetch = fetch(forecastLink).then((res) => res.json());
    // const currentAirQualityLinkFetch = fetch(currentAirQuality).then((res) => res.json());

    // const allData = Promise.all([currentLinkFetch, forecastLinkFetch, currentAirQualityLinkFetch]);
    // const resFetchs = [setGetWeatherCurrent, setGetWeatherForecast, setGetCurrentAirQuality];

    // allData.then((res) => {
    //   resFetchs.map((data, index) => {
    //     return data(res[index]);
    //   });
    //   console.log("after Fetch: " + getWeatherCurrent.name);
    // });

    // METHODE YOUNESS
    // currentLink's fetch
    if (citynameInCapitalize) {
      fetch(currentLink)
        .then((res) => {
          return res.json();
        })
        .then((currentData) => {
          setGetWeatherCurrent(currentData);
          console.log("citynameInCapitalize: " + citynameInCapitalize);
          console.log("getWeatherCurrent: " + getWeatherCurrent.name);
          console.log("FETCH DONE");
          return fetch(forecastLink);
        })
        // forecastLink's fetch
        .then((res) => {
          return res.json();
        })
        .then((forecastData) => {
          setGetWeatherForecast(forecastData);
          return fetch(currentAirQualityLink);
        })
        // currentAirQualityLink's fetch
        .then((res) => {
          return res.json();
        })
        .then((currentAirQualityData) => {
          setGetCurrentAirQuality(currentAirQualityData);
        })
        // Catch if errors
        .catch((err) => {
          console.log("erreur: " + err);
        });
    }

    const findCityInFavs = favList.find(
      (item) =>
        item.city === citynameInCapitalize &&
        item.country === getWeatherCurrent.sys.country
    );
    if (findCityInFavs !== undefined) {
      setAddedToFavorite(true);
      console.log("AddedToFavorite: true");
      console.log("findCityInFavs: " + JSON.stringify(findCityInFavs, null, 2));
    } else {
      setAddedToFavorite(false);
      console.log("AddedToFavorite: false");
      console.log("findCityInFavs: " + JSON.stringify(findCityInFavs, null, 2));
    }
  }

  function resetData() {
    setHasSearched(false);
    setCityName("");
    setCountry("");
    setGetWeatherCurrent({});
    setGetWeatherForecast({});
    setGetCurrentAirQuality({});
  }

  useEffect(() => {
    if (getWeatherCurrent.name) {
      const deltatime = getWeatherCurrent.dt;
      const timezone = getWeatherCurrent.timezone;
      const date = new Date((deltatime + timezone) * 1000);
      const dateHours = date.getUTCHours();
      const dateMinutes = date.getUTCMinutes();

      const sunrise = getWeatherCurrent.sys.sunrise;
      const sunset = getWeatherCurrent.sys.sunset;
      const getHoursRise = new Date((sunrise + timezone) * 1000).getUTCHours();
      const getHoursSet = new Date((sunset + timezone) * 1000).getUTCHours();
      const getMinutesRise = new Date(
        (sunrise + timezone) * 1000
      ).getUTCMinutes();
      const getMinutesSet = new Date(
        (sunset + timezone) * 1000
      ).getUTCMinutes();

      const root = document.getElementById("root");

      if (dateHours < getHoursRise) {
        root.classList.add("nightTime");
      } else if (dateHours === getHoursRise) {
        if (dateMinutes < getMinutesRise) {
          root.classList.add("nightTime");
        } else {
          root.classList.remove("nightTime");
        }
      } else {
        if (dateHours > getHoursSet) {
          root.classList.add("nightTime");
        } else if (dateHours === getHoursSet) {
          if (dateMinutes >= getMinutesSet) {
            root.classList.add("nightTime");
          } else {
            root.classList.remove("nightTime");
          }
        } else {
          root.classList.remove("nightTime");
        }
      }
    }
  });

  return (
    <div id="fakeRoot">
      <Header hasSearched={hasSearched} />

      <Menus
        cityName={cityName}
        setCityName={setCityName}
        setCountry={setCountry}
        searchLocation={searchLocation}
        citynameInCapitalize={citynameInCapitalize}
        setAddedToFavorite={setAddedToFavorite}
      />

      <div id="mainContainer">
        {willSearch ? (
          <WeatherHeader
            getWeatherCurrent={getWeatherCurrent}
            handleCity={handleCity}
            cityName={cityName}
            citynameInCapitalize={citynameInCapitalize}
            country={country}
            setCountry={setCountry}
            resetData={resetData}
            setCityName={setCityName}
            searchLocation={searchLocation}
          />
        ) : null}
        {!willSearch && getWeatherCurrent.name ? (
          <div id="anotherSearchBtnWrapper">
            <input
              onClick={() => setWillSearch(true)}
              type="button"
              value="Buscar una otra ciudad"
              id="anotherSearchBtn"
            />
          </div>
        ) : null}
        {!willSearch && !getWeatherCurrent.name ? (
          <WeatherHeader
            getWeatherCurrent={getWeatherCurrent}
            handleCity={handleCity}
            cityName={cityName}
            citynameInCapitalize={citynameInCapitalize}
            country={country}
            setCountry={setCountry}
            resetData={resetData}
            setCityName={setCityName}
            searchLocation={searchLocation}
          />
        ) : null}

        {hasSearched ? (
          <>
            {getWeatherCurrent.name ? (
              <>
                <CatchPhrase
                  getWeatherCurrent={getWeatherCurrent}
                  addedToFavorite={addedToFavorite}
                  setAddedToFavorite={setAddedToFavorite}
                />
                <WeatherDataCurrent
                  getWeatherCurrent={getWeatherCurrent}
                  getCurrentAirQuality={getCurrentAirQuality}
                />
                {getWeatherForecast.list ? (
                  <WeatherDataForecast
                    getWeatherForecast={getWeatherForecast}
                    cnt={cnt}
                  />
                ) : null}
              </>
            ) : (
              <div id="locationNotFoundContainer">
                <img src="temp0.png" alt="Ninguna ciudad ha sido encontrada" />
                <p>Ninguna ciudad ha sido encontrada.</p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
