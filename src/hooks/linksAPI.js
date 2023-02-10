import {
  API_OPENWEATHER_KEY,
  API_OPENWEATHER_ROOT,
  API_WEATHERBIT_KEY,
  API_WEATHERBIT_ROOT,
  FORECAST,
  WEATHER,
} from "../constants/constants";

export function useCurrentLink(locOrSearch, latitud, longitud, cityName) {
  return (latitud && longitud) || cityName
    ? `${API_OPENWEATHER_ROOT}/${WEATHER}?${locOrSearch}&lang=sp&units=metric&limit=3&appid=${API_OPENWEATHER_KEY}`
    : null;
}

export function useForecastLink(locOrSearch, latitud, longitud, cityName) {
  return (latitud && longitud) || cityName
    ? `${API_OPENWEATHER_ROOT}/${FORECAST}?${locOrSearch}&lang=sp&units=metric&limit=3&cnt=40&appid=${API_OPENWEATHER_KEY}`
    : null;
}

export function useAirQualityLink(
  locOrSearchAirQuality,
  latitud,
  longitud,
  cityName
) {
  return (latitud && longitud) || cityName
    ? `${API_WEATHERBIT_ROOT}?${locOrSearchAirQuality}&key=${API_WEATHERBIT_KEY}`
    : null;
}
