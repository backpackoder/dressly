import "./App.css";

import { useEffect, useState } from "react";

// Context
import MainContext from "./MainContext";

// Components
import Header from "./components/Header";
import Menus from "./components/menus/Menus";

import WeatherHeader from "./components/WeatherHeader";
import CatchPhrase from "./components/CatchPhrase";
import SearchAnotherCity from "./components/buttons/SearchAnotherCity";

import WeatherDataCurrent from "./components/weather/WeatherDataCurrent";
import WeatherDataForecast from "./components/weather/WeatherDataForecast";
import LocationNotFound from "./components/weather/LocationNotFound";

// Hooks
import useCitynameInCapitalize from "./hooks/hooks";

// Utils
import favList from "./utils/favList";

function App() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    setLongitud(position.coords.longitude);
    setLatitud(position.coords.latitude);
  }

  const [cntValue, setCntValue] = useState(1);
  const cntLenght = cntValue;
  const cnt = [];

  for (let i = 0; i < cntLenght * 8; i++) {
    cnt.push(i);
  }

  function increaseCnt() {
    if (cntValue < 5) {
      setCntValue(cntValue + 1);
    }
  }

  const [longitud, setLongitud] = useState();
  const [latitud, setLatitud] = useState();

  const [cityName, setCityName] = useState("");

  const citynameInCapitalize = useCitynameInCapitalize(cityName);

  // const splitCityName = cityName.split(" ");
  // for (var i = 0; i < splitCityName.length; i++) {
  //   splitCityName[i] =
  //     splitCityName[i].charAt(0).toUpperCase() + splitCityName[i].slice(1);
  // }
  // const citynameInCapitalize = splitCityName.join(" ");

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
  const currentLink = `https://api.openweathermap.org/data/2.5/weather?q=${citynameInCapitalize},${country}&lang=sp&units=metric&limit=3&appid=d493df14c0516863693cb4400253aaff`;
  const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${citynameInCapitalize},${country}&lang=sp&units=metric&limit=3&$cnt=${cntLenght}&appid=d493df14c0516863693cb4400253aaff`;
  const currentFromLocLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&lang=sp&units=metric&appid=d493df14c0516863693cb4400253aaff`;
  const forecastFromLocLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&lang=sp&units=metric&appid=d493df14c0516863693cb4400253aaff`;

  // weatherbit.io links
  // API KEYS : d2a73b171c4f4d3682997db8f0ed6737 /// da8804d2bf7242fba42808df119747e5
  const currentAirQualityLink = `https://api.weatherbit.io/v2.0/current/airquality?city=${citynameInCapitalize}&key=d2a73b171c4f4d3682997db8f0ed6737`;
  const currentAirQualityFromLocLink = `https://api.weatherbit.io/v2.0/current/airquality?lat=${latitud}&lon=${longitud}&key=d2a73b171c4f4d3682997db8f0ed6737`;
  // https://www.weatherapi.com links
  // API KEYS : 04196720d32144c9b0124634222512
  // const forecastDaily = "lien";

  const [isSearchByLocation, setIsSearchByLocation] = useState(true);
  const [callApi, setCallApi] = useState(false);

  function searchByLocation() {
    setIsSearchByLocation(true);
    setCallApi(true);
    setWillSearch(false);
    setHasSearched(true);
    setCntValue(1);
  }

  function searchByName() {
    setIsSearchByLocation(false);
    setCallApi(true);
    setWillSearch(false);
    setHasSearched(true);
    setCntValue(1);
  }

  function resetData() {
    setHasSearched(false);
    setIsSearchByLocation(true);
    setCityName("");
    setCountry("");
    setGetWeatherCurrent({});
    setGetWeatherForecast({});
    setGetCurrentAirQuality({});
  }

  // Into WeatherDataCurrent's component
  const [generalInfo, setGeneralInfo] = useState(false);

  const contextValue = {
    // API datas
    getWeatherCurrent,
    getWeatherForecast,
    getCurrentAirQuality,
    // City and country names
    cityName,
    setCityName,
    citynameInCapitalize,
    country,
    setCountry,
    // ResetData function
    resetData,
    // Search functions
    searchByLocation,
    searchByName,
    setWillSearch,
    hasSearched,
    // Favorites
    addedToFavorite,
    setAddedToFavorite,
    // Ctn for forecast
    cnt,
    cntValue,
    increaseCnt,
    // General info
    generalInfo,
    setGeneralInfo,
  };

  useEffect(() => {
    setWillSearch(false);
    setHasSearched(true);
    setCntValue(1);

    if (longitud && latitud) {
      // METHODE YOUNESS
      // currentLink's fetch
      fetch(isSearchByLocation ? currentFromLocLink : currentLink)
        .then((res) => {
          return res.json();
        })
        .then((currentData) => {
          setGetWeatherCurrent(currentData);
          return fetch(isSearchByLocation ? forecastFromLocLink : forecastLink);
        })
        // forecastLink's fetch
        .then((res) => {
          return res.json();
        })
        .then((forecastData) => {
          setGetWeatherForecast(forecastData);
          return fetch(
            isSearchByLocation
              ? currentAirQualityFromLocLink
              : currentAirQualityLink
          );
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
          console.log("erreur dans catch: " + err);
        });
    }

    return () => {
      setCallApi(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callApi, latitud, longitud]);

  useEffect(() => {
    const findCityInFavs = favList.find(
      (item) =>
        item.city === getWeatherCurrent.name &&
        item.country === getWeatherCurrent.sys.country
    );
    if (findCityInFavs !== undefined) {
      setAddedToFavorite(true);
    } else {
      setAddedToFavorite(false);
    }
  }, [getWeatherCurrent]);

  useEffect(() => {
    if (getWeatherCurrent.name) {
      const root = document.getElementById("root");

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
    <MainContext.Provider value={contextValue}>
      <Header />

      <Menus />

      <div id="mainContainer">
        {willSearch ? <WeatherHeader /> : <SearchAnotherCity />}

        {hasSearched && getWeatherCurrent.name ? (
          <>
            <CatchPhrase />
            <WeatherDataCurrent />
            <WeatherDataForecast />
          </>
        ) : (
          <LocationNotFound />
        )}
      </div>
    </MainContext.Provider>
  );
}

export default App;
