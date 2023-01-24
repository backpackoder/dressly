import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import MainContext from "../../MainContext";

import generalInfoData from "../../utils/generalInfoData";

function GeneralInfo() {
  const { getWeatherCurrent, generalInfo, setGeneralInfo } =
    useContext(MainContext);
  let userName = "Naco";

  return (
    <div
      className={generalInfo ? "generalInfo visible" : "generalInfo invisible"}
      onClick={() => setGeneralInfo(!generalInfo)}
    >
      <FontAwesomeIcon icon={faXmark} className="xMark" />
      <div>
        <p>
          Buenos dias <span>{userName}</span>,<br />
          <br />
          En{" "}
          <span>
            {getWeatherCurrent.name} ({getWeatherCurrent.sys.country})
          </span>
          , {generalInfoData["day"]["after_sunrise"]}{" "}
          <span>{getWeatherCurrent.sys.sunrise}.</span>
          <br />
          {generalInfoData["temp"]["poco_frijol"].today_its} (
          {getWeatherCurrent.main.feels_like.toFixed(1)}C°) y con{" "}
          <span>{getWeatherCurrent.weather[0].description}.</span>
          <br />
          {generalInfoData["temp"]["poco_frijol"].advice}{" "}
          {generalInfoData["humidity"]["aLittleWet"]} y{" "}
          {generalInfoData["wind"]["aLittle"]}.<br />
          {generalInfoData["day"]["before_sunset"]}{" "}
          <span>{getWeatherCurrent.sys.sunset}.</span>
        </p>
        <img
          src="temp3.png"
          alt="Frijol o calabacín te da  un resumen del clima actual."
          className="generalInfoImg"
        />
      </div>
    </div>
  );
}

export default GeneralInfo;
