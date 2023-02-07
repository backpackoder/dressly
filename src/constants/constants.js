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
export const API_WEATHERBIT_KEY = "da8804d2bf7242fba42808df119747e5";

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
export function getDeltatime(data) {
  return data.dt;
}
export function getTimezone(data) {
  return data.timezone;
}
export function getDate(data) {
  return new Date((getDeltatime(data) + getTimezone(data)) * 1000);
}
export function getActualUTCDate(data) {
  return getDate(data).getUTCDate();
}
export function getActualUTCYear(data) {
  return getDate(data).getUTCFullYear();
}
export function getActualUTCMonth(data) {
  return getDate(data).getUTCMonth();
}
export function getActualUTCDay(data) {
  return getDate(data).getUTCDay();
}
export function getActualUTCHour(data) {
  return getDate(data).getUTCHours();
}
export function getActualUTCMinute(data) {
  return getDate(data).getUTCMinutes();
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
