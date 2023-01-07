import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faMagnifyingGlass,
  faArrowRightRotate,
} from "@fortawesome/free-solid-svg-icons";

import CountrySelector from "./countrySelector";

import worldCities from "../utils/worldCities.json";

function WeatherHeader({
  getWeatherCurrent,
  handleCity,
  cityName,
  citynameInCapitalize,
  country,
  setCountry,
  resetData,
  setCityName,
  whichFetch,
  searchLocation,
}) {
  let inputBtnValue = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  if (getWeatherCurrent) {
    citynameInCapitalize === getWeatherCurrent.name &&
    (country === getWeatherCurrent.sys.country || country === "")
      ? (inputBtnValue = <FontAwesomeIcon icon={faArrowRightRotate} />)
      : (inputBtnValue = <FontAwesomeIcon icon={faMagnifyingGlass} />);
  }

  const findLocation = worldCities.filter(
    (item) =>
      item.name.indexOf(cityName) !== -1 && item.country.indexOf(country) !== -1
  );

  function fetchFilter(index) {
    const filterIndex = findLocation[index];
    setCityName(filterIndex.name);
    setCountry(filterIndex.country);

    searchLocation();
  }

  return (
    <>
      <div id="weatherHeader">
        <div id="weatherHeaderCity">
          <p>Insierta una ciudad:</p>
          <input
            onChange={(e) => {
              handleCity(e);
            }}
            name="selectCity"
            placeholder="..............."
            value={citynameInCapitalize}
            id="cityInput"
          />

          <div className="locationGuesser">
            {findLocation.map((data, index) => {
              return citynameInCapitalize && index < 10 ? (
                <p key={index} onClick={() => fetchFilter(index)}>
                  {data.name}, {data.country}
                </p>
              ) : null;
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
              onClick={() => {
                whichFetch();
                searchLocation();
              }}
              id="submitBtn"
            >
              {inputBtnValue}
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
