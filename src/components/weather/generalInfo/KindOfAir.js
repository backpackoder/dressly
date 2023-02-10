import { useMemo } from "react";

// utils
import generalInfoData from "../../../utils/generalInfoData";

function KindOfAir({ getWeatherCurrent }) {
  const actualHumidity = getWeatherCurrent.main.humidity;
  const actualWind = getWeatherCurrent.wind.speed;

  const humidity = useMemo(() => {
    switch (true) {
      case actualHumidity >= 75:
        return generalInfoData["humidity"]["veryWet"];

      case actualHumidity < 75 && actualHumidity >= 55:
        return generalInfoData["humidity"]["wet"];

      case actualHumidity < 55 && actualHumidity >= 40:
        return generalInfoData["humidity"]["aLittleWet"];

      case actualHumidity < 40 && actualHumidity >= 25:
        return generalInfoData["humidity"]["aLittleDry"];

      case actualHumidity < 25 && actualHumidity >= 10:
        return generalInfoData["humidity"]["dry"];

      case actualHumidity < 10:
        return generalInfoData["humidity"]["dry"];

      default:
        return "No tengo datos sobre la humedad del aire";
    }
  }, [actualHumidity]);

  const wind = useMemo(() => {
    switch (true) {
      case actualWind < 1:
        return generalInfoData["wind"]["none"];

      case actualWind >= 1 && actualWind < 5:
        return generalInfoData["wind"]["calm"];

      case actualWind >= 5 && actualWind < 15:
        return generalInfoData["wind"]["weak"];

      case actualWind >= 15 && actualWind < 25:
        return generalInfoData["wind"]["light"];

      case actualWind >= 25 && actualWind < 35:
        return generalInfoData["wind"]["moderate"];

      case actualWind >= 35 && actualWind < 50:
        return generalInfoData["wind"]["fresh"];

      case actualWind >= 50 && actualWind < 65:
        return generalInfoData["wind"]["strong"];

      case actualWind >= 65 && actualWind < 85:
        return generalInfoData["wind"]["hard"];

      case actualWind >= 85 && actualWind < 115:
        return generalInfoData["wind"]["Storm"];

      case actualWind >= 115:
        return generalInfoData["wind"]["hurricane"];

      default:
        return "no tengo datos sobre el viento";
    }
  }, [actualWind]);

  return (
    <>
      {humidity.before} <span>{humidity.key}</span> {humidity.after} y{" "}
      {wind.before} <span>{wind.key}</span> {wind.after}
    </>
  );
}

export default KindOfAir;
