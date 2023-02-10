// Open weather API
// Data
export const API_OPENWEATHER_ROOT = "https://api.openweathermap.org/data/2.5";
// API KEYS : d493df14c0516863693cb4400253aaff /// c785a88639c20358827c2b46c36be516 // 865cb46cb65bfd1413e81f1ae9da2702
export const API_OPENWEATHER_KEY = "d493df14c0516863693cb4400253aaff";
// Images
export const API_OPENWEATHER_ROOT_IMG = "https://openweathermap.org/img/wn";

// WeatherBit API
export const API_WEATHERBIT_ROOT =
  "https://api.weatherbit.io/v2.0/current/airquality";
// API KEYS : d2a73b171c4f4d3682997db8f0ed6737 /// da8804d2bf7242fba42808df119747e5
export const API_WEATHERBIT_KEY = "d2a73b171c4f4d3682997db8f0ed6737";

// Text
export const WEATHER = "weather";
export const FORECAST = "forecast";

// Data from API
// Time
export const WEEKDAYS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];
export const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

// Get local time
export function getDeltatime(data, isForecast) {
  return isForecast || isForecast === 0 ? data.list[isForecast].dt : data.dt;
}
export function getTimezone(data, isForecast) {
  return isForecast || isForecast === 0 ? data.city.timezone : data.timezone;
}

// Get local date
export function getDate(data, isForecast) {
  return new Date(
    (getDeltatime(data, isForecast) + getTimezone(data, isForecast)) * 1000
  );
}

// Get local time datas
export function getActualUTCDate(data, isForecast) {
  return getDate(data, isForecast).getUTCDate();
}
export function getActualUTCYear(data, isForecast) {
  return getDate(data, isForecast).getUTCFullYear();
}
export function getActualUTCMonth(data, isForecast) {
  return getDate(data, isForecast).getUTCMonth();
}
export function getActualUTCDay(data, isForecast) {
  return getDate(data, isForecast).getUTCDay();
}
export function getActualUTCHour(data, isForecast) {
  return getDate(data, isForecast).getUTCHours();
}
export function getActualUTCMinute(data, isForecast) {
  return getDate(data, isForecast).getUTCMinutes();
}

// Sunrise
export function getSunrise(data) {
  return data.sys.sunrise;
}
export function getHourOfSunrise(data) {
  return new Date((getSunrise(data) + getTimezone(data)) * 1000).getUTCHours();
}
export function getMinuteOfSunrise(data) {
  return new Date(
    (getSunrise(data) + getTimezone(data)) * 1000
  ).getUTCMinutes();
}
// Sunset
export function getSunset(data) {
  return data.sys.sunset;
}
export function getHourOfSunset(data) {
  return new Date((getSunset(data) + getTimezone(data)) * 1000).getUTCHours();
}
export function getMinuteOfSunset(data) {
  return new Date((getSunset(data) + getTimezone(data)) * 1000).getUTCMinutes();
}

// Heat index
export const HEAT_INDEX = {
  TEMP_0: 35,
  TEMP_1: 30,
  TEMP_2: 25,
  TEMP_3: 20,
  TEMP_4: 15,
  TEMP_5: 10,
};
