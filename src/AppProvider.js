import { useState, useEffect, useRef } from "react";

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
  const [citySearched, setCitySearched] = useState("");
  const [country, setCountry] = useState("");
  const [countrySearched, setCountrySearched] = useState("");

  // General infos
  const [generalInfo, setGeneralInfo] = useState(false);

  // Ctn for forecast
  const [cntValue, setCntValue] = useState(1);

  const cnt = [];
  for (let i = 0; i < cntValue * 8; i++) {
    cnt.push(i);
  }

  // Favorites
  const [newFav, setNewFav] = useState(favList);
  const [addedToFavorite, setAddedToFavorite] = useState(false);

  // User name
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const userNameInCapitalize = useTextInCapitalize(userName);

  // Heat index
  const heatListFromLS = JSON.parse(localStorage.getItem("heat"));

  const [temp0, setTemp0] = useState(
    heatListFromLS === null ? HEAT_INDEX.TEMP_0 : heatListFromLS[0]
  );
  const [temp1, setTemp1] = useState(
    heatListFromLS === null ? HEAT_INDEX.TEMP_1 : heatListFromLS[1]
  );
  const [temp2, setTemp2] = useState(
    heatListFromLS === null ? HEAT_INDEX.TEMP_2 : heatListFromLS[2]
  );
  const [temp3, setTemp3] = useState(
    heatListFromLS === null ? HEAT_INDEX.TEMP_3 : heatListFromLS[3]
  );
  const [temp4, setTemp4] = useState(
    heatListFromLS === null ? HEAT_INDEX.TEMP_4 : heatListFromLS[4]
  );
  const [temp5, setTemp5] = useState(
    heatListFromLS === null ? HEAT_INDEX.TEMP_5 : heatListFromLS[5]
  );

  const submitButtonRef = useRef();

  // Functions
  function searchByLocation() {
    setIsSearchByLocation(true);
    setCallApi(true);
    setWillSearch(false);
    setHasSearched(true);
    setCntValue(1);
  }

  function searchByName(cityFav, countryFav) {
    setIsSearchByLocation(false);
    setCitySearched(cityFav !== undefined ? cityFav : citynameInCapitalize);
    setCountrySearched(countryFav !== undefined ? countryFav : country);
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

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      submitButtonRef.current.click();
    }
  }

  function updateFav(index) {
    const findCityInFavs = favList.find(
      (item) => item.city === getWeatherCurrent.name
    );

    const findCityIndexOf = favList.indexOf(findCityInFavs);

    if (index === null) {
      if (findCityIndexOf !== -1) {
        favList.splice(findCityIndexOf, 1);
      } else {
        favList.push({
          city: getWeatherCurrent?.name,
          country: getWeatherCurrent?.sys?.country,
        });
      }
      setAddedToFavorite(!addedToFavorite);
    } else {
      favList.splice(index, 1);
      setAddedToFavorite(findCityIndexOf === index ? false : true);
    }

    setNewFav([...favList]);
    updateLocalStorage();
  }

  function updateLocalStorage() {
    const favListString = JSON.stringify(favList);
    window.localStorage.setItem("favList", favListString);
  }

  const byLocalisation = `lat=${latitud}&lon=${longitud}`;
  const bySearch = `q=${citySearched},${countrySearched}`;
  const bySearchAirQuality = `city=${citySearched}&country=${countrySearched}`;

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
  const currentLink = useCurrentLink(
    latitud,
    longitud,
    locOrSearch,
    citySearched
  );
  const forecastLink = useForecastLink(
    latitud,
    longitud,
    locOrSearch,
    citySearched
  );
  const currentAirQualityLink = useAirQualityLink(
    latitud,
    longitud,
    locOrSearchAirQuality,
    citySearched
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
  }, [callApi, currentAirQualityLink, currentLink, forecastLink]);

  useEffect(() => {
    const findCityInFavs = favList.find(
      (item) =>
        item.city === getWeatherCurrent.name &&
        item.country === getWeatherCurrent.sys.country
    );

    findCityInFavs !== undefined
      ? setAddedToFavorite(true)
      : setAddedToFavorite(false);
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
  }, [getWeatherCurrent]);

  // Context values
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
    citySearched,
    setCitySearched,
    country,
    setCountry,
    countrySearched,
    setCountrySearched,

    // General info
    generalInfo,
    setGeneralInfo,

    // Ctn for forecast
    cnt,
    cntValue,
    setCntValue,

    // Favorites
    newFav,
    setNewFav,
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

    // UseRef
    submitButtonRef,
    handleKeyPress,

    // FUNCTIONS
    searchByLocation,
    searchByName,
    increaseCnt,
    resetData,
    updateFav,
  };

  return <AppContext.Provider {...props} value={contextValue} />;
}

export default AppProvider;
