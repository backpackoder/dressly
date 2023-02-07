import { createContext } from "react";

export default createContext({
  getWeatherCurrent: {},
  setGetWeatherCurrent: () => {},
  getWeatherForecast: {},
  setGetWeatherForecast: () => {},
  getCurrentAirQuality: {},
  setGetCurrentAirQuality: () => {},

  cnt: null,
  cntValue: null,
  setCntValue: () => {},
  increaseCnt: () => {},

  userName: null,
  setUserName: () => {},

  generalInfo: null,
  setGeneralInfo: () => {},
  openGeneralInfo: null,

  setWillSearch: () => {},
  setHasSearched: () => {},

  setLoading: () => {},
  locOrSearch: () => {},
});
