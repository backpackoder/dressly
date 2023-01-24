const getWeatherCurrent = {};

export const root = document.getElementById("root");
export const deltatime = getWeatherCurrent?.dt;
export const timezone = getWeatherCurrent?.timezone;
export const date = new Date((deltatime + timezone) * 1000);
export const dateHours = date.getUTCHours();
export const dateMinutes = date.getUTCMinutes();
export const sunrise = getWeatherCurrent?.sys?.sunrise;
export const sunset = getWeatherCurrent?.sys?.sunset;
export const getHoursRise = new Date((sunrise + timezone) * 1000).getUTCHours();
export const getHoursSet = new Date((sunset + timezone) * 1000).getUTCHours();
export const getMinutesRise = new Date(
  (sunrise + timezone) * 1000
).getUTCMinutes();
export const getMinutesSet = new Date(
  (sunset + timezone) * 1000
).getUTCMinutes();
