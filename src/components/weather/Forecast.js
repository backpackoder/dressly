import { useContext } from "react";

import MainContext from "../../MainContext";

function WeatherDataForecast() {
  const { getWeatherForecast, cnt, cntValue, increaseCnt } =
    useContext(MainContext);

  return getWeatherForecast.list ? (
    <div className="weatherDataForecast">
      <div>
        <h2>Previsiones 24h</h2>
        <p>(cada 3 horas)</p>
        <div className="weatherDataItemForecastWrapper">
          {cnt.map((data, index) => {
            return (
              index < cntValue * 8 && (
                <WeatherDataItem
                  key={index}
                  getWeatherForecast={getWeatherForecast}
                  cntIndex={data}
                />
              )
            );
          })}
        </div>

        {cntValue < 5 ? (
          <button onClick={increaseCnt} className="increaseCntBtn">
            Ver 24h más
          </button>
        ) : null}
      </div>
    </div>
  ) : null;
}

function WeatherDataItem({ getWeatherForecast, cntIndex }) {
  const deltatime = getWeatherForecast.list[cntIndex].dt;
  const timezone = getWeatherForecast.city.timezone;

  const getDateDt = new Date((deltatime + timezone) * 1000).getUTCDate();
  const getMonthDt = new Date((deltatime + timezone) * 1000).getUTCMonth();
  const getHoursDt = new Date((deltatime + timezone) * 1000).getUTCHours();
  const getMinutesDt = new Date((deltatime + timezone) * 1000).getUTCMinutes();

  return (
    <div className="weatherDataItemForecast">
      {getWeatherForecast.list ? (
        <>
          <p className="forecastDt">
            {`El ${getDateDt < 10 ? `0${getDateDt}` : getDateDt}/${
              getMonthDt < 10 ? `0${getMonthDt + 1}` : getMonthDt + 1
            } a `}
            {getHoursDt < 10 ? "0" + getHoursDt : getHoursDt}:
            {getMinutesDt < 10 ? "0" + getMinutesDt : getMinutesDt}
          </p>
          <p className="forecastFeels_likes">
            {getWeatherForecast.list[cntIndex].main.feels_like.toFixed(1)}°C
          </p>
          <p className="forecastDescription">
            {getWeatherForecast.list[cntIndex].weather[0].description}
          </p>
          <img
            className="forecastIcon"
            src={
              "http://openweathermap.org/img/wn/" +
              getWeatherForecast.list[cntIndex].weather[0].icon +
              ".png"
            }
            alt="weather icon"
          />
        </>
      ) : null}
      <div>
        <input
          type="button"
          value=">>> Ver detalles >>>"
          className="forecastDetailsBtn"
        />
      </div>
    </div>
  );
}

export default WeatherDataForecast;
