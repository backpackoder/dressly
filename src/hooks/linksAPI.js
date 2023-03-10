import {
  API_OPENWEATHER_KEY,
  API_OPENWEATHER_ROOT,
  API_WEATHERBIT_KEY,
  API_WEATHERBIT_ROOT,
  FORECAST,
  WEATHER,
} from "../constants/constants";

export function useCurrentLink(latitud, longitud, locOrSearch, citySearched) {
  return (latitud && longitud) || citySearched
    ? `${API_OPENWEATHER_ROOT}/${WEATHER}?${locOrSearch}&lang=sp&units=metric&limit=3&appid=${API_OPENWEATHER_KEY}`
    : null;
}

export function useForecastLink(latitud, longitud, locOrSearch, citySearched) {
  return (latitud && longitud) || citySearched
    ? `${API_OPENWEATHER_ROOT}/${FORECAST}?${locOrSearch}&lang=sp&units=metric&limit=3&cnt=40&appid=${API_OPENWEATHER_KEY}`
    : null;
}

export function useAirQualityLink(
  latitud,
  longitud,
  locOrSearchAirQuality,
  citySearched
) {
  return (latitud && longitud) || citySearched
    ? `${API_WEATHERBIT_ROOT}?${locOrSearchAirQuality}&key=${API_WEATHERBIT_KEY}`
    : null;
}
