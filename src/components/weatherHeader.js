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
  searchLocation,
}) {
  let inputBtnValue = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  if (getWeatherCurrent) {
    citynameInCapitalize === getWeatherCurrent.name &&
    (country === getWeatherCurrent.sys.country || country === "")
      ? (inputBtnValue = <FontAwesomeIcon icon={faArrowRightRotate} />)
      : (inputBtnValue = <FontAwesomeIcon icon={faMagnifyingGlass} />);
  }

  const findCity = worldCities.filter(
    (item) => item.name.indexOf(cityName) !== -1
  );
  // const findCountryInFavs = favList.find((item) => item.country === getWeatherCurrent.sys.country);

  function eso() {
    if (cityName) {
      // console.log("fetchFilter cityName: " + cityName);
      if (findCity !== undefined) {
        // console.log("City found: " + JSON.stringify(findCity, null, 2));
        // console.log("------------------------------------------------");
      } else {
        // console.log("City not found");
        // console.log("help: " + JSON.stringify(findCity, null, 2));
      }
    }
  }

  function fetchFilter(index) {
    const filterIndex = findCity[index];
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
              eso();
            }}
            name="selectCity"
            placeholder="..............."
            value={citynameInCapitalize}
            id="cityInput"
          ></input>
          <div>
            {findCity.length < 10
              ? findCity.map((data, index) => {
                  return (
                    <div key={index}>
                      <p onClick={() => fetchFilter(index)}>
                        {data.name}, {data.country}
                      </p>
                    </div>
                  );
                })
              : null}
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
            <button onClick={searchLocation} id="submitBtn">
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
