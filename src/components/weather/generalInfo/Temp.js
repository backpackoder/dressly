import { useMemo } from "react";

// Utils
import generalInfoData from "../../../utils/generalInfoData";

// Constants
import { HEAT_INDEX } from "../../../constants/constants";

function Temperature({ getWeatherCurrent }) {
  const actualTemp = getWeatherCurrent.main.feels_like.toFixed(1);

  const [today_its, advice] = useMemo(() => {
    switch (true) {
      case actualTemp > HEAT_INDEX.TEMP_0:
        return [
          generalInfoData["temp"]["mucho_calor"].today_its,
          generalInfoData["temp"]["mucho_calor"].advice,
        ];

      case actualTemp <= HEAT_INDEX.TEMP_0 && actualTemp >= HEAT_INDEX.TEMP_1:
        return [
          generalInfoData["temp"]["calor"].today_its,
          generalInfoData["temp"]["calor"].advice,
        ];

      case actualTemp < HEAT_INDEX.TEMP_1 && actualTemp >= HEAT_INDEX.TEMP_2:
        return [
          generalInfoData["temp"]["poco_calor"].today_its,
          generalInfoData["temp"]["poco_calor"].advice,
        ];

      case actualTemp < HEAT_INDEX.TEMP_2 && actualTemp >= HEAT_INDEX.TEMP_3:
        return [
          generalInfoData["temp"]["templado"].today_its,
          generalInfoData["temp"]["templado"].advice,
        ];

      case actualTemp < HEAT_INDEX.TEMP_3 && actualTemp >= HEAT_INDEX.TEMP_4:
        return [
          generalInfoData["temp"]["poco_frío"].today_its,
          generalInfoData["temp"]["poco_frío"].advice,
        ];

      case actualTemp < HEAT_INDEX.TEMP_4 && actualTemp >= HEAT_INDEX.TEMP_5:
        return [
          generalInfoData["temp"]["frío"].today_its,
          generalInfoData["temp"]["frío"].advice,
        ];

      case actualTemp < HEAT_INDEX.TEMP_5:
        return [
          generalInfoData["temp"]["mucho_frío"].today_its,
          generalInfoData["temp"]["mucho_frío"].advice,
        ];

      default:
        return "no tengo datos sobre la temperatura";
    }
  }, [actualTemp]);

  return (
    <>
      {today_its.before} <span>{today_its.key}</span> {today_its.after} (
      {getWeatherCurrent.main.feels_like.toFixed(1)}C°) y{" "}
      <span>{getWeatherCurrent.weather[0].description}.</span> {advice}
    </>
  );
}

export default Temperature;
