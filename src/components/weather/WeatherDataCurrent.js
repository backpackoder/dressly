import { useContext, useMemo } from "react";

import MainContext from "../../MainContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faDroplet,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

import GeneralInfo from "./GeneralInfo";

import Clock from "./Clock";
import queHaceData from "../../utils/queHaceData";

function WeatherDataCurrent() {
  const { getWeatherCurrent, getCurrentAirQuality } = useContext(MainContext);

  return (
    <div id="weatherData">
      <GeneralInfo />
      <WeatherLocalDate getWeatherCurrent={getWeatherCurrent} />
      <div id="weatherMiddleInfos">
        <div id="weatherPart1">
          <WeatherFeelsLike getWeatherCurrent={getWeatherCurrent} />
          <WeatherIcon getWeatherCurrent={getWeatherCurrent} />
          <WeatherDescription getWeatherCurrent={getWeatherCurrent} />
        </div>
        <QueHace getWeatherCurrent={getWeatherCurrent} />
      </div>
      <WeatherInfos
        getWeatherCurrent={getWeatherCurrent}
        getCurrentAirQuality={getCurrentAirQuality}
      />
    </div>
  );
}

function WeatherLocalDate({ getWeatherCurrent }) {
  return (
    <>
      {getWeatherCurrent.dt ? (
        <>
          <Clock getWeatherCurrent={getWeatherCurrent} />
        </>
      ) : (
        <p>Erreur dans WeatherLocalDate</p>
      )}
    </>
  );
}

function WeatherFeelsLike({ getWeatherCurrent }) {
  return (
    <div id="weatherFeelsLike" className="weatherInfosItem">
      {getWeatherCurrent.main ? (
        <p id="getWeatherFeelsLike">
          {getWeatherCurrent.main.feels_like.toFixed(1)}°C
        </p>
      ) : null}
    </div>
  );
}

function WeatherIcon({ getWeatherCurrent }) {
  return (
    <div id="weatherIcon" className="weatherInfosItem">
      {getWeatherCurrent.weather ? (
        <img
          id="icon"
          src={
            "http://openweathermap.org/img/wn/" +
            getWeatherCurrent.weather[0].icon +
            ".png"
          }
          alt="weather icon"
        />
      ) : null}
    </div>
  );
}

function WeatherDescription({ getWeatherCurrent }) {
  return (
    <div id="weatherDescription" className="weatherInfosItem">
      {getWeatherCurrent.weather ? (
        <>
          <p id="getWeatherDescr">{getWeatherCurrent.weather[0].description}</p>
        </>
      ) : null}
    </div>
  );
}

function QueHace({ getWeatherCurrent }) {
  const queHace = useMemo(() => {
    if (getWeatherCurrent.main) {
      if (getWeatherCurrent.main.temp < 10) {
        return queHaceData.temp0;
      } else if (
        getWeatherCurrent.main.temp >= 10 &&
        getWeatherCurrent.main.temp < 15
      ) {
        return queHaceData.temp1;
      } else if (
        getWeatherCurrent.main.temp >= 15 &&
        getWeatherCurrent.main.temp < 20
      ) {
        return queHaceData.temp2;
      } else if (
        getWeatherCurrent.main.temp >= 20 &&
        getWeatherCurrent.main.temp < 25
      ) {
        return queHaceData.temp3;
      } else if (
        getWeatherCurrent.main.temp >= 25 &&
        getWeatherCurrent.main.temp < 30
      ) {
        return queHaceData.temp4;
      } else if (
        getWeatherCurrent.main.temp >= 30 &&
        getWeatherCurrent.main.temp < 35
      ) {
        return queHaceData.temp5;
      } else if (getWeatherCurrent.main.temp >= 35) {
        return queHaceData.temp6;
      }
    }
  }, [getWeatherCurrent]);

  const { generalInfo, setGeneralInfo } = useContext(MainContext);

  return (
    <div id="queHace">
      {getWeatherCurrent.name ? (
        <p id="queHaceText">{queHace.catchPhrase}</p>
      ) : null}
      <div>
        <img
          src={queHace.imgSrc}
          alt="Frijol o calabacín"
          onClick={() => setGeneralInfo(!generalInfo)}
        ></img>
        <p className="queHaceInfo">☝️ Dale clic x infos ☝️</p>
      </div>
    </div>
  );
}

function WeatherInfos({ getWeatherCurrent, getCurrentAirQuality }) {
  const sunrise = getWeatherCurrent.sys.sunrise;
  const sunset = getWeatherCurrent.sys.sunset;
  const timezone = getWeatherCurrent.timezone;

  const getHoursRise = new Date((sunrise + timezone) * 1000).getUTCHours();
  const getHoursSet = new Date((sunset + timezone) * 1000).getUTCHours();
  const getMinutesRise = new Date((sunrise + timezone) * 1000).getUTCMinutes();
  const getMinutesSet = new Date((sunset + timezone) * 1000).getUTCMinutes();

  let currentAirQualityResult = "";
  let currentAirQualityColorResult = {
    backgroundColor: "",
    padding: "5px 0",
  };

  if (getCurrentAirQuality.data) {
    if (getCurrentAirQuality.data[0].aqi <= 50) {
      currentAirQualityResult = "bueno";
      currentAirQualityColorResult.backgroundColor = "rgba(144, 238, 144, 0.5)";
    } else if (
      getCurrentAirQuality.data[0].aqi > 50 &&
      getCurrentAirQuality.data[0].aqi <= 100
    ) {
      currentAirQualityResult = "moderado";
      currentAirQualityColorResult.backgroundColor = "rgba(255, 255, 0, 0.5)";
    } else if (
      getCurrentAirQuality.data[0].aqi > 100 &&
      getCurrentAirQuality.data[0].aqi <= 150
    ) {
      currentAirQualityResult = "Mediocre";
      currentAirQualityColorResult.backgroundColor = "rgba(255, 166, 0, 0.5)";
    } else if (
      getCurrentAirQuality.data[0].aqi > 150 &&
      getCurrentAirQuality.data[0].aqi <= 200
    ) {
      currentAirQualityResult = "Malsano";
      currentAirQualityColorResult.backgroundColor = "rgba(255, 0, 0, 0.5)";
    } else if (
      getCurrentAirQuality.data[0].aqi > 200 &&
      getCurrentAirQuality.data[0].aqi <= 250
    ) {
      currentAirQualityResult = "Muy malsano";
      currentAirQualityColorResult.backgroundColor = "rgba(143, 63, 151, 0.5)";
    } else {
      currentAirQualityResult = "Peligroso";
      currentAirQualityColorResult.backgroundColor = "rgba(128, 0, 0, 0.5)";
    }
  }

  let currentCarbonResult = "";
  let currentCarbonColorResult = {
    backgroundColor: "",
    padding: "5px 0",
  };

  if (getCurrentAirQuality.data) {
    if (getCurrentAirQuality.data[0].co <= 50) {
      currentCarbonResult = "bueno";
      currentCarbonColorResult.backgroundColor = "rgba(144, 238, 144, 0.5)";
    } else if (
      getCurrentAirQuality.data[0].co > 50 &&
      getCurrentAirQuality.data[0].co <= 200
    ) {
      currentCarbonResult = "moderado";
      currentCarbonColorResult.backgroundColor = "rgba(255, 255, 0, 0.5)";
    } else if (
      getCurrentAirQuality.data[0].co > 200 &&
      getCurrentAirQuality.data[0].co <= 400
    ) {
      currentCarbonResult = "Mediocre";
      currentCarbonColorResult.backgroundColor = "rgba(255, 166, 0, 0.5)";
    } else if (
      getCurrentAirQuality.data[0].co > 400 &&
      getCurrentAirQuality.data[0].co <= 600
    ) {
      currentCarbonResult = "Malsano";
      currentCarbonColorResult.backgroundColor = "rgba(255, 0, 0, 0.5)";
    } else {
      currentCarbonResult = "Peligroso";
      currentCarbonColorResult.backgroundColor = "rgba(128, 0, 0, 0.5)";
    }
  }

  return (
    <div id="weatherInfos">
      <div id="weatherMainInfosItem" className="weatherInfosItem">
        <div id="weatherRise">
          <div className="help">
            <FontAwesomeIcon icon={faSun} className="weatherInfosIcon" />
          </div>
          {getWeatherCurrent.sys ? (
            <p id="getWeatherRise">
              {getHoursRise < 10 ? "0" + getHoursRise : getHoursRise}:
              {getMinutesRise < 10 ? "0" + getMinutesRise : getMinutesRise}
            </p>
          ) : null}
        </div>

        <div id="weatherSet">
          <div className="help">
            <FontAwesomeIcon icon={faMoon} className="weatherInfosIcon" />
          </div>
          {getWeatherCurrent.sys ? (
            <p id="getWeatherSet">
              {getHoursSet < 10 ? "0" + getHoursSet : getHoursSet}:
              {getMinutesSet < 10 ? "0" + getMinutesSet : getMinutesSet}
            </p>
          ) : null}
        </div>

        <div id="weatherHumidity">
          <div className="help">
            <FontAwesomeIcon icon={faDroplet} className="weatherInfosIcon" />
          </div>
          {getWeatherCurrent.main ? (
            <p id="getWeatherHumidity">{getWeatherCurrent.main.humidity}%</p>
          ) : null}
        </div>

        <div id="weatherWind">
          <div className="help">
            <FontAwesomeIcon icon={faWind} className="weatherInfosIcon" />
          </div>
          {getWeatherCurrent.wind ? (
            <p id="getWeatherWind">{getWeatherCurrent.wind.speed}km/h</p>
          ) : null}
        </div>
      </div>

      <div id="weatherSecondaryInfosItem">
        <div>
          <div className="weatherTitleInfosItemWrapper">
            <p className="weatherTitleInfosItem">Calidad del aire:</p>
          </div>
          {getCurrentAirQuality.data ? (
            <div id="getWeatherAqi" style={currentAirQualityColorResult}>
              <span>{currentAirQualityResult}</span>
              <br />({getCurrentAirQuality.data[0].aqi})
            </div>
          ) : null}
        </div>
        <div>
          <div className="weatherTitleInfosItemWrapper">
            <p className="weatherTitleInfosItem">Monóxido de carbono (CO):</p>
          </div>
          {getCurrentAirQuality.data ? (
            <p id="getWeatherAirQuality" style={currentCarbonColorResult}>
              <span>{currentCarbonResult}</span>
              <br />({getCurrentAirQuality.data[0].co.toFixed(2)} µg/m³)
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default WeatherDataCurrent;
