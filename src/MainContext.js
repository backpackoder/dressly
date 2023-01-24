import { createContext } from "react";

export default createContext({
  getWeatherCurrent: {},

  cnt: null,
  cntValue: null,
  increaseCnt: () => {},

  generalInfo: null,
  setGeneralInfo: () => {},
  openGeneralInfo: null,
});
