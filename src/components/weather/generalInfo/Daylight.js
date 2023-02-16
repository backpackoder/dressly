import { useContext, useMemo } from "react";

// Context
import { AppContext } from "../../../AppContext";

// Constants
import {
  getActualUTCHour,
  getActualUTCMinute,
  getHourOfSunrise,
  getHourOfSunset,
  getMinuteOfSunrise,
  getMinuteOfSunset,
} from "../../../constants/constants";

// Utils
import generalInfoData from "../../../utils/generalInfoData";

function Daylight() {
  const { getWeatherCurrent } = useContext(AppContext);

  const actualHour = getActualUTCHour(getWeatherCurrent);
  const actualMinute = getActualUTCMinute(getWeatherCurrent);

  const hourOfSunrise = getHourOfSunrise(getWeatherCurrent);
  const minuteOfSunrise = getMinuteOfSunrise(getWeatherCurrent);
  const hourOfSunset = getHourOfSunset(getWeatherCurrent);
  const minuteOfSunset = getMinuteOfSunset(getWeatherCurrent);

  const HORA = "hora";
  const CON = "con";
  const MIN = "min";
  const plural = "s";

  const [amanecer, atardecer] = useMemo(() => {
    if (actualHour < hourOfSunrise) {
      if (actualHour > hourOfSunset) {
        return [
          generalInfoData["day"]["before_sunrise"],
          generalInfoData["day"]["after_sunset"],
        ];
      } else if (actualHour === hourOfSunset) {
        if (actualMinute < minuteOfSunset) {
          return [
            generalInfoData["day"]["after_sunrise"],
            generalInfoData["day"]["before_sunset"],
          ];
        } else {
          return [
            generalInfoData["day"]["before_sunrise"],
            generalInfoData["day"]["after_sunset"],
          ];
        }
      } else {
        return [
          generalInfoData["day"]["before_sunrise"],
          generalInfoData["day"]["after_sunset"],
        ];
      }
    } else if (actualHour === hourOfSunrise) {
      if (actualMinute < minuteOfSunrise) {
        return [
          generalInfoData["day"]["before_sunrise"],
          generalInfoData["day"]["after_sunset"],
        ];
      } else {
        return [
          generalInfoData["day"]["after_sunrise"],
          generalInfoData["day"]["before_sunset"],
        ];
      }
    } else {
      if (actualHour > hourOfSunset) {
        return [
          generalInfoData["day"]["before_sunrise"],
          generalInfoData["day"]["after_sunset"],
        ];
      } else if (actualHour === hourOfSunset) {
        if (actualMinute >= minuteOfSunset) {
          return [
            generalInfoData["day"]["before_sunrise"],
            generalInfoData["day"]["after_sunset"],
          ];
        } else {
          return [
            generalInfoData["day"]["after_sunrise"],
            generalInfoData["day"]["before_sunset"],
          ];
        }
      } else {
        return [
          generalInfoData["day"]["after_sunrise"],
          generalInfoData["day"]["before_sunset"],
        ];
      }
    }
  }, [
    actualHour,
    actualMinute,
    hourOfSunrise,
    hourOfSunset,
    minuteOfSunrise,
    minuteOfSunset,
  ]);

  const amanecerCalc = useMemo(() => {
    if (amanecer === generalInfoData["day"]["before_sunrise"]) {
      if (hourOfSunrise === actualHour) {
        return `${minuteOfSunrise - actualMinute} ${MIN}`;
      } else {
        return `${
          actualHour < hourOfSunrise
            ? actualMinute <= minuteOfSunrise
              ? minuteOfSunrise - actualMinute - 1 === 0
                ? ""
                : `${hourOfSunrise - actualHour} ${HORA}${
                    hourOfSunrise - actualHour === 1 ? "" : plural
                  }`
              : hourOfSunrise - actualHour - 1 === 0
              ? ""
              : `${hourOfSunrise - actualHour - 1} ${HORA}${
                  hourOfSunrise - actualHour - 1 === 1 ? "" : plural
                }`
            : actualMinute <= minuteOfSunrise
            ? actualMinute - minuteOfSunrise === 0
              ? ""
              : `${24 - actualHour + hourOfSunrise} ${HORA}${
                  24 - actualHour + hourOfSunrise === 1 ? "" : plural
                }`
            : `${24 - actualHour + hourOfSunrise - 1} ${HORA}${
                24 - actualHour + hourOfSunrise - 1 === 1 ? "" : plural
              }`
        }${
          hourOfSunrise - actualHour - 1 === 0 ||
          actualMinute - minuteOfSunrise === 0
            ? ""
            : `${" "}${CON}${" "}`
        }${
          actualMinute <= minuteOfSunrise
            ? minuteOfSunrise - actualMinute === 0
              ? ""
              : `${minuteOfSunrise - actualMinute} ${MIN}`
            : `${60 + minuteOfSunrise - actualMinute} ${MIN}`
        }`;
      }
    } else if (amanecer === generalInfoData["day"]["after_sunrise"]) {
      if (actualHour === hourOfSunrise) {
        return `${actualMinute - minuteOfSunrise} ${MIN}`;
      } else {
        return `${
          actualHour < hourOfSunrise
            ? `${hourOfSunrise - actualHour} ${HORA}${
                hourOfSunrise - actualHour === 1 ? "" : plural
              }`
            : actualMinute <= minuteOfSunrise
            ? actualHour - hourOfSunrise - 1 === 0
              ? ""
              : `${actualHour - hourOfSunrise - 1} ${HORA}${
                  actualHour - hourOfSunrise - 1 === 1 ? "" : plural
                }`
            : `${actualHour - hourOfSunrise} ${HORA}${
                actualHour - hourOfSunrise === 1 ? "" : plural
              }`
        }${
          actualHour - hourOfSunrise - 1 === 0 ||
          actualMinute - minuteOfSunrise === 0
            ? ""
            : `${" "}${CON}${" "}`
        }${
          actualMinute <= minuteOfSunrise
            ? actualMinute - minuteOfSunrise === 0
              ? ""
              : `${60 + actualMinute - minuteOfSunrise} ${MIN}`
            : `${actualMinute - minuteOfSunrise} ${MIN}`
        }`;
      }
    }
  }, [amanecer, actualHour, actualMinute, hourOfSunrise, minuteOfSunrise]);

  const atardecerCalc = useMemo(() => {
    if (atardecer === generalInfoData["day"]["before_sunset"]) {
      if (hourOfSunset === actualHour) {
        return `${minuteOfSunset - actualMinute} ${MIN}`;
      } else {
        return `${
          actualMinute <= minuteOfSunset
            ? hourOfSunset - actualHour === 0
              ? ""
              : `${hourOfSunset - actualHour} ${HORA}${
                  hourOfSunset - actualHour === 1 ? "" : plural
                }`
            : hourOfSunset - actualHour - 1 === 0
            ? ""
            : `${hourOfSunset - actualHour - 1} ${HORA}${
                hourOfSunset - actualHour - 1 === 1 ? "" : plural
              }`
        }${
          hourOfSunset - actualHour - 1 === 0 ||
          actualMinute - minuteOfSunset === 0
            ? ""
            : `${" "}${CON}${" "}`
        }${
          actualMinute <= minuteOfSunset
            ? actualMinute - minuteOfSunset === 0
              ? ""
              : `${minuteOfSunset - actualMinute} ${MIN}`
            : `${60 + minuteOfSunset - actualMinute} ${MIN}`
        }`;
      }
    } else if (atardecer === generalInfoData["day"]["after_sunset"]) {
      if (actualHour === hourOfSunset) {
        return `${actualMinute - minuteOfSunset} ${MIN}`;
      } else {
        return `${
          actualHour <= hourOfSunset
            ? actualMinute - minuteOfSunset === 0
              ? ""
              : actualMinute < minuteOfSunset
              ? `${24 - hourOfSunset + actualHour - 1} ${HORA}${
                  24 - hourOfSunset + actualHour - 1 === 1 ? "" : plural
                }`
              : `${24 - hourOfSunset + actualHour} ${HORA}${
                  24 - hourOfSunset + actualHour === 1 ? "" : plural
                }`
            : actualMinute - minuteOfSunset === 0
            ? ""
            : actualMinute < minuteOfSunset
            ? actualHour - hourOfSunset - 1 === 0
              ? ""
              : `${actualHour - hourOfSunset - 1} ${HORA}${
                  actualHour - hourOfSunset - 1 === 1 ? "" : plural
                }`
            : `${actualHour - hourOfSunset} ${HORA}${
                actualHour - hourOfSunset === 1 ? "" : plural
              }`
        }${
          actualHour - hourOfSunset - 1 === 0 ||
          actualMinute - minuteOfSunset === 0
            ? ""
            : `${" "}${CON}${" "}`
        }${
          actualMinute <= minuteOfSunset
            ? actualMinute - minuteOfSunset === 0
              ? ""
              : `${60 + actualMinute - minuteOfSunset} ${MIN}`
            : actualMinute - minuteOfSunset === 0
            ? ""
            : `${actualMinute - minuteOfSunset} ${MIN}`
        }`;
      }
    }
  }, [atardecer, actualHour, actualMinute, hourOfSunset, minuteOfSunset]);

  return (
    <>
      {amanecer === generalInfoData["day"]["after_sunrise"] ? (
        <>
          {amanecer} <span>{amanecerCalc}.</span>
          <br />
          {atardecer} <span>{atardecerCalc}.</span>
        </>
      ) : (
        <>
          {atardecer} <span>{atardecerCalc}.</span>
          <br />
          {amanecer} <span>{amanecerCalc}.</span>
        </>
      )}
    </>
  );
}

export default Daylight;
