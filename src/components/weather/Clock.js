import { useState, useEffect } from "react";

function Clock({ getWeatherCurrent }) {
  const deltatime = getWeatherCurrent.dt;
  const timezone = getWeatherCurrent.timezone;
  const date = new Date((deltatime + timezone) * 1000);

  const dateHours = date.getUTCHours();
  const dateMinutes = date.getUTCMinutes();

  const weekdays = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const months = [
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

  const [isTrue, setIsTrue] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTrue(!isTrue);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTrue]);

  return (
    <div id="dayAndTime">
      <p id="actualDay">
        El {weekdays[date.getUTCDay()]}, {date.getUTCDate()} de{" "}
        {months[date.getUTCMonth()]} del {date.getUTCFullYear()}
      </p>
      <p id="actualTime">
        {dateHours < 10 ? "0" + dateHours : dateHours}
        <span className={isTrue ? "visible" : "invisible"}>:</span>
        {dateMinutes < 10 ? "0" + dateMinutes : dateMinutes}
      </p>
    </div>
  );
}

export default Clock;
