import "./App.css";

import { useEffect, useState } from "react";

// Context
import MainContext from "./MainContext";

// Components
import Header from "./components/Header";
import Menus from "./components/menus";

import WeatherHeader from "./components/WeatherHeader";
import CatchPhrase from "./components/CatchPhrase";
import SearchAnotherCity from "./components/buttons/SearchAnotherCity";

import Current from "./components/weather/Current";
import Forecast from "./components/weather/Forecast";
import LocationNotFound from "./components/weather/LocationNotFound";

// Hooks
import {
  useAirQualityLink,
  useCurrentLink,
  useForecastLink,
} from "./hooks/linksAPI";
import useTextInCapitalize from "./hooks/textInCapitalize";

// Utils
import favList from "./utils/favList";
import {
  getActualUTCHour,
  getHourOfSunrise,
  getHourOfSunset,
  getMinuteOfSunrise,
  getMinuteOfSunset,
} from "./constants/constants";

function App() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    setLongitud(position.coords.longitude);
    setLatitud(position.coords.latitude);
  }

  const [cntValue, setCntValue] = useState(1);
  const cnt = [];

  for (let i = 0; i < cntValue * 8; i++) {
    cnt.push(i);
  }

  function increaseCnt() {
    if (cntValue < 5) {
      setCntValue(cntValue + 1);
    }
  }

  const [willSearch, setWillSearch] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  const [callApi, setCallApi] = useState(false);
  const [isSearchByLocation, setIsSearchByLocation] = useState(true);

  const [longitud, setLongitud] = useState();
  const [latitud, setLatitud] = useState();

  const [cityName, setCityName] = useState("");
  const citynameInCapitalize = useTextInCapitalize(cityName);
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(true);

  const [getWeatherCurrent, setGetWeatherCurrent] = useState({});
  const [getWeatherForecast, setGetWeatherForecast] = useState({});
  const [getCurrentAirQuality, setGetCurrentAirQuality] = useState({});

  const [addedToFavorite, setAddedToFavorite] = useState(false);

  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const userNameInCapitalize = useTextInCapitalize(userName);

  const byLocalisation = `lat=${latitud}&lon=${longitud}`;
  const bySearch = `q=${citynameInCapitalize},${country}`;
  const bySearchAirQuality = `city=${citynameInCapitalize}&country=${country}`;

  const locOrSearch =
    longitud && latitud
      ? isSearchByLocation
        ? byLocalisation
        : bySearch
      : bySearch;

  const locOrSearchAirQuality =
    longitud && latitud
      ? isSearchByLocation
        ? byLocalisation
        : bySearchAirQuality
      : bySearchAirQuality;

  // API
  const currentLink = useCurrentLink(locOrSearch);
  const forecastLink = useForecastLink(locOrSearch);
  const currentAirQualityLink = useAirQualityLink(locOrSearchAirQuality);

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
    // User name
    userName,
    userNameInCapitalize,
    setUserName,
    // General info
    generalInfo,
    setGeneralInfo,
  };

  useEffect(() => {
    setWillSearch(false);
    setHasSearched(true);
    setLoading(true);
    setCntValue(1);

    // current's fetch
    fetch(currentLink)
      .then((res) => {
        return res.json();
      })
      .then((currentData) => {
        setGetWeatherCurrent(currentData);
        setLoading(false);
      })
      .catch((err) => {
        console.log("erreur dans catch current: " + err);
        setLoading(false);
      });

    // forecast's fetch
    fetch(forecastLink)
      .then((res) => {
        return res.json();
      })
      .then((forecastData) => {
        setGetWeatherForecast(forecastData);
      })
      .catch((err) => {
        console.log("erreur dans catch forecast: " + err);
      });

    // currentAirQuality's fetch
    fetch(currentAirQualityLink)
      .then((res) => {
        return res.json();
      })
      .then((currentAirQualityData) => {
        setGetCurrentAirQuality(currentAirQualityData);
      })
      .catch((err) => {
        console.log("erreur dans catch currentAirQuality: " + err);
      });

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

      const actualHour = getActualUTCHour(getWeatherCurrent);
      const hourOfSunrise = getHourOfSunrise(getWeatherCurrent);
      const minuteOfSunrise = getMinuteOfSunrise(getWeatherCurrent);
      const hourOfSunset = getHourOfSunset(getWeatherCurrent);
      const minuteOfSunset = getMinuteOfSunset(getWeatherCurrent);

      if (actualHour < hourOfSunrise) {
        root.classList.add("nightTime");
      } else if (actualHour === hourOfSunrise) {
        if (actualHour < minuteOfSunrise) {
          root.classList.add("nightTime");
        } else {
          root.classList.remove("nightTime");
        }
      } else {
        if (actualHour > hourOfSunset) {
          root.classList.add("nightTime");
        } else if (actualHour === hourOfSunset) {
          if (actualHour >= minuteOfSunset) {
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

      <div className="mainContainer">
        {willSearch ? <WeatherHeader /> : <SearchAnotherCity />}

        {loading && <p>Loading...</p>}
        {hasSearched && !getWeatherCurrent.name && !loading && (
          <LocationNotFound />
        )}
        {hasSearched && getWeatherCurrent.name && !loading && (
          <>
            <CatchPhrase />
            <Current />
            <Forecast />
          </>
        )}
      </div>
    </MainContext.Provider>
  );
}

export default App;
