import { useContext, useMemo } from "react";

import MainContext from "../../../MainContext";

import {
  getActualUTCHour,
  getActualUTCMinute,
  getHourOfSunrise,
  getHourOfSunset,
  getMinuteOfSunrise,
  getMinuteOfSunset,
} from "../../../constants/constants";

import generalInfoData from "../../../utils/generalInfoData";

function AmanecerAtardecer() {
  const { getWeatherCurrent } = useContext(MainContext);

  const actualHour = getActualUTCHour(getWeatherCurrent);
  const actualMinute = getActualUTCMinute(getWeatherCurrent);

  const hourOfSunrise = getHourOfSunrise(getWeatherCurrent);
  const minuteOfSunrise = getMinuteOfSunrise(getWeatherCurrent);
  const hourOfSunset = getHourOfSunset(getWeatherCurrent);
  const minuteOfSunset = getMinuteOfSunset(getWeatherCurrent);

  const hora = "hora";
  const y = "y";
  const minuto = "min";
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
        return `${minuteOfSunrise - actualMinute} ${minuto}`;
      } else {
        return `${
          actualHour < hourOfSunrise
            ? actualMinute <= minuteOfSunrise
              ? `${hourOfSunrise - actualHour} ${hora}${
                  hourOfSunrise - actualHour === 1 ? "" : plural
                }`
              : `${hourOfSunrise - actualHour - 1} ${hora}${
                  hourOfSunrise - actualHour === 1 ? "" : plural
                }`
            : actualMinute <= minuteOfSunrise
            ? actualMinute - minuteOfSunrise === 0
              ? ""
              : `${24 - actualHour + hourOfSunrise} ${hora}${
                  24 - actualHour + hourOfSunrise === 1 ? "" : plural
                }`
            : `${24 - actualHour + hourOfSunrise - 1} ${hora}${
                24 - actualHour + hourOfSunrise - 1 === 1 ? "" : plural
              }`
        }${actualMinute - minuteOfSunrise === 0 ? "" : `${" "}y${" "}`}${
          actualMinute <= minuteOfSunrise
            ? minuteOfSunrise - actualMinute === 0
              ? ""
              : `${minuteOfSunrise - actualMinute} ${minuto}`
            : `${60 + minuteOfSunrise - actualMinute} ${minuto}`
        }`;
      }
    } else if (amanecer === generalInfoData["day"]["after_sunrise"]) {
      if (actualHour === hourOfSunrise) {
        return `${actualMinute - minuteOfSunrise} ${minuto}`;
      } else {
        return `${
          actualHour < hourOfSunrise
            ? `${hourOfSunrise - actualHour} ${hora}${
                hourOfSunrise - actualHour === 1 ? "" : plural
              }`
            : actualMinute <= minuteOfSunrise
            ? actualHour - hourOfSunrise - 1 === 0
              ? ""
              : `${actualHour - hourOfSunrise - 1} ${hora}${
                  actualHour - hourOfSunrise - 1 === 1 ? "" : plural
                }`
            : `${actualHour - hourOfSunrise} ${hora}${
                actualHour - hourOfSunrise === 1 ? "" : plural
              }`
        }${actualMinute - minuteOfSunrise === 0 ? "" : `${" "}y${" "}`}${
          actualMinute <= minuteOfSunrise
            ? actualMinute - minuteOfSunrise === 0
              ? ""
              : `${60 + actualMinute - minuteOfSunrise} ${minuto}`
            : `${actualMinute - minuteOfSunrise} ${minuto}`
        }`;
      }
    }
  }, [amanecer, actualHour, actualMinute, hourOfSunrise, minuteOfSunrise]);

  const atardecerCalc = useMemo(() => {
    if (atardecer === generalInfoData["day"]["before_sunset"]) {
      if (hourOfSunset === actualHour) {
        return `${minuteOfSunset - actualMinute} ${minuto}`;
      } else {
        return `${
          actualMinute <= minuteOfSunset
            ? actualMinute - minuteOfSunset === 0
              ? ""
              : `${hourOfSunset - actualHour} ${hora}${
                  hourOfSunset - actualHour === 1 ? "" : plural
                }`
            : `${hourOfSunset - actualHour - 1} ${hora}${
                hourOfSunset - actualHour - 1 === 1 ? "" : plural
              }`
        }
            ${actualMinute - minuteOfSunset === 0 ? "" : `${" "}y${" "}`}
              ${
                actualMinute <= minuteOfSunset
                  ? actualMinute - minuteOfSunset === 0
                    ? ""
                    : `${minuteOfSunset - actualMinute} ${minuto}`
                  : `${60 + minuteOfSunset - actualMinute} ${minuto}`
              }`;
      }
    } else if (atardecer === generalInfoData["day"]["after_sunset"]) {
      if (actualHour === hourOfSunset) {
        return `${actualMinute - minuteOfSunset} ${minuto}`;
      } else {
        return `${
          actualHour <= hourOfSunset
            ? actualMinute - minuteOfSunset === 0
              ? ""
              : actualMinute < minuteOfSunset
              ? `${24 - hourOfSunset + actualHour - 1} ${hora}${
                  24 - hourOfSunset + actualHour - 1 === 1 ? "" : plural
                }`
              : `${24 - hourOfSunset + actualHour} ${hora}${
                  24 - hourOfSunset + actualHour === 1 ? "" : plural
                }`
            : actualMinute - minuteOfSunset === 0
            ? ""
            : actualMinute < minuteOfSunset
            ? `${actualHour - hourOfSunset - 1} ${hora}${
                actualHour - hourOfSunset - 1 === 1 ? "" : plural
              }`
            : `${actualHour - hourOfSunset} ${hora}${
                actualHour - hourOfSunset === 1 ? "" : plural
              }`
        }${actualMinute - minuteOfSunset === 0 ? "" : `${" "}y${" "}`}${
          actualMinute <= minuteOfSunset
            ? actualMinute - minuteOfSunset === 0
              ? ""
              : `${60 + actualMinute - minuteOfSunset} ${minuto}`
            : actualMinute - minuteOfSunset === 0
            ? ""
            : `${actualMinute - minuteOfSunset} ${minuto}`
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

export default AmanecerAtardecer;
