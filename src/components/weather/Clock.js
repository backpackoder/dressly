import { useState, useEffect } from "react";

// Constants
import {
  getActualUTCHour,
  getActualUTCMinute,
  getActualUTCDate,
  getActualUTCDay,
  getActualUTCMonth,
  getActualUTCYear,
  MONTHS,
  WEEKDAYS,
} from "../../constants/constants";

function Clock({ getWeatherCurrent }) {
  const actualUTCYear = getActualUTCYear(getWeatherCurrent);
  const actualUTCMonth = getActualUTCMonth(getWeatherCurrent);
  const actualUTCDate = getActualUTCDate(getWeatherCurrent);
  const actualUTCDay = getActualUTCDay(getWeatherCurrent);
  const actualHour = getActualUTCHour(getWeatherCurrent);
  const actualMinute = getActualUTCMinute(getWeatherCurrent);

  const [isColonVisible, setIsColonVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsColonVisible(!isColonVisible);
    }, 1000);

    return () => clearInterval(interval);
  }, [isColonVisible]);

  return (
    <div className="dayAndTime">
      <p className="actualDay">
        El {WEEKDAYS[actualUTCDay]}, {actualUTCDate} de {MONTHS[actualUTCMonth]}{" "}
        del {actualUTCYear}
      </p>
      <p className="actualTime">
        {actualHour < 10 ? "0" + actualHour : actualHour}
        <span className={isColonVisible ? "colon" : "colon invisible"}>:</span>
        {actualMinute < 10 ? "0" + actualMinute : actualMinute}
      </p>
    </div>
  );
}

export default Clock;
