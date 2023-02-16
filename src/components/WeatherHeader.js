import { useContext, useState, useEffect } from "react";

// Context
import { AppContext } from "../AppContext";

// Components
import SearchByLocation from "./buttons/SearchByLocation";
import CountrySelector from "./CountrySelector";

// Utils
import worldCities from "../utils/worldCities.json";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faMagnifyingGlass,
  faArrowRightRotate,
} from "@fortawesome/free-solid-svg-icons";

function WeatherHeader() {
  const {
    getWeatherCurrent,
    cityName,
    citynameInCapitalize,
    country,
    setCountry,
    resetData,
    setCityName,
    searchByName,
    submitButtonRef,
    handleKeyPress,
  } = useContext(AppContext);

  const [inputBtnValue, setInputBtnValue] = useState(faMagnifyingGlass);

  useEffect(() => {
    citynameInCapitalize === getWeatherCurrent.name &&
    (country === getWeatherCurrent.sys.country || country === "")
      ? setInputBtnValue(faArrowRightRotate)
      : setInputBtnValue(faMagnifyingGlass);
  }, [getWeatherCurrent, cityName, citynameInCapitalize, country]);

  const findLocation = worldCities.filter(
    (item) =>
      item.name.indexOf(cityName) !== -1 && item.country.indexOf(country) !== -1
  );

  function fetchFilter(index) {
    const filterIndex = findLocation[index];

    searchByName(filterIndex.name, filterIndex.country);
  }

  return (
    <>
      <div id="weatherHeader" onKeyDown={handleKeyPress}>
        <div id="weatherHeaderCity">
          <SearchByLocation />
          <p>Insierta una ciudad:</p>
          <input
            onChange={(e) => {
              setCityName(e.target.value);
            }}
            name="selectCity"
            placeholder="..............."
            value={cityName}
            id="cityInput"
          />

          <div className="locationGuesser">
            {findLocation.map((data, index) => {
              return (
                citynameInCapitalize &&
                index < 10 && (
                  <p key={index} onClick={() => fetchFilter(index)}>
                    {data.name}, {data.country}
                  </p>
                )
              );
            })}
          </div>
        </div>

        <div id="weatherHeaderCountry">
          <div id="selectCountry">
            <p>País:</p>
            <CountrySelector country={country} setCountry={setCountry} />
          </div>
          <div id="buttons">
            <button onClick={resetData} id="resetBtn">
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button
              onClick={() => searchByName()}
              id="submitBtn"
              ref={submitButtonRef}
            >
              <FontAwesomeIcon icon={inputBtnValue} />
            </button>
          </div>
        </div>

        {citynameInCapitalize || country ? (
          <p id="weatherHeaderSummary">
            <span>Estás buscando: </span>
            {citynameInCapitalize ? citynameInCapitalize : "..."},{" "}
            {country ? `(${country})` : "(Mundo)"}
          </p>
        ) : null}
      </div>
    </>
  );
}

export default WeatherHeader;
