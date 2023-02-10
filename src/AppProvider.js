import { useState, useEffect } from "react";

// Hooks
import {
  useAirQualityLink,
  useCurrentLink,
  useForecastLink,
} from "./hooks/linksAPI";
import useTextInCapitalize from "./hooks/textInCapitalize";

// Constants
import {
  getActualUTCHour,
  getHourOfSunrise,
  getHourOfSunset,
  getMinuteOfSunrise,
  getMinuteOfSunset,
  HEAT_INDEX,
} from "./constants/constants";

// Utils
import favList from "./utils/favList";

// Create context
import { AppContext } from "./AppContext";

function AppProvider(props) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    setLongitud(position.coords.longitude);
    setLatitud(position.coords.latitude);
  }

  // Status
  const [willSearch, setWillSearch] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  // Coords
  const [latitud, setLatitud] = useState();
  const [longitud, setLongitud] = useState();

  // Search
  const [isSearchByLocation, setIsSearchByLocation] = useState(true);
  const [callApi, setCallApi] = useState(false);
  const [loading, setLoading] = useState(true);

  // API datas
  const [getWeatherCurrent, setGetWeatherCurrent] = useState({});
  const [getWeatherForecast, setGetWeatherForecast] = useState({});
  const [getCurrentAirQuality, setGetCurrentAirQuality] = useState({});

  // City and country names
  const [cityName, setCityName] = useState("");
  const citynameInCapitalize = useTextInCapitalize(cityName);
  const [country, setCountry] = useState("");

  // General infos
  const [generalInfo, setGeneralInfo] = useState(false);

  // Ctn for forecast
  const [cntValue, setCntValue] = useState(1);

  const cnt = [];
  for (let i = 0; i < cntValue * 8; i++) {
    cnt.push(i);
  }

  // Favorites
  const [addedToFavorite, setAddedToFavorite] = useState(false);

  // User name
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const userNameInCapitalize = useTextInCapitalize(userName);

  // Heat index
  const [temp0, setTemp0] = useState(HEAT_INDEX.TEMP_0);
  const [temp1, setTemp1] = useState(HEAT_INDEX.TEMP_1);
  const [temp2, setTemp2] = useState(HEAT_INDEX.TEMP_2);
  const [temp3, setTemp3] = useState(HEAT_INDEX.TEMP_3);
  const [temp4, setTemp4] = useState(HEAT_INDEX.TEMP_4);
  const [temp5, setTemp5] = useState(HEAT_INDEX.TEMP_5);

  // Functions
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

  function increaseCnt() {
    if (cntValue < 5) {
      setCntValue(cntValue + 1);
    }
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

  const contextValue = {
    // HOOKS
    // Status
    willSearch,
    setWillSearch,
    hasSearched,
    setHasSearched,

    // Coords
    latitud,
    setLatitud,
    longitud,
    setLongitud,

    // Search
    isSearchByLocation,
    setIsSearchByLocation,
    callApi,
    setCallApi,
    loading,
    setLoading,

    // API datas
    getWeatherCurrent,
    setGetWeatherCurrent,
    getWeatherForecast,
    setGetWeatherForecast,
    getCurrentAirQuality,
    setGetCurrentAirQuality,

    // City and country names
    cityName,
    setCityName,
    citynameInCapitalize,
    country,
    setCountry,

    // General info
    generalInfo,
    setGeneralInfo,

    // Ctn for forecast
    cnt,
    cntValue,
    setCntValue,

    // Favorites
    addedToFavorite,
    setAddedToFavorite,

    // User name
    userName,
    setUserName,
    userNameInCapitalize,

    // Heat index
    temp0,
    setTemp0,
    temp1,
    setTemp1,
    temp2,
    setTemp2,
    temp3,
    setTemp3,
    temp4,
    setTemp4,
    temp5,
    setTemp5,

    // FUNCTIONS
    searchByLocation,
    searchByName,
    increaseCnt,
    resetData,
  };

  const byLocalisation = `lat=${latitud}&lon=${longitud}`;
  const bySearch = `q=${citynameInCapitalize},${country}`;
  const bySearchAirQuality = `city=${citynameInCapitalize}&country=${country}`;

  const locOrSearch =
    latitud && longitud
      ? isSearchByLocation
        ? byLocalisation
        : bySearch
      : bySearch;

  const locOrSearchAirQuality =
    latitud && longitud
      ? isSearchByLocation
        ? byLocalisation
        : bySearchAirQuality
      : bySearchAirQuality;

  // API calls
  const currentLink = useCurrentLink(locOrSearch, latitud, longitud, cityName);
  const forecastLink = useForecastLink(
    locOrSearch,
    latitud,
    longitud,
    cityName
  );
  const currentAirQualityLink = useAirQualityLink(
    locOrSearchAirQuality,
    latitud,
    longitud,
    cityName
  );

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
        console.log("Error with current datas: " + err);
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
        console.log("Error with forecast datas: " + err);
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
        console.log("Error with air quality datas: " + err);
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

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default AppProvider;
