import { useContext } from "react";

// Components
import Header from "./components/Header";
import Menus from "./components/menus";
import WeatherHeader from "./components/WeatherHeader";
import LocationNotFound from "./components/weather/LocationNotFound";
import SearchAnotherCity from "./components/buttons/SearchAnotherCity";
import CatchPhrase from "./components/CatchPhrase";
import Current from "./components/weather/Current";
import Forecast from "./components/weather/Forecast";

// Context
import { AppContext } from "./AppContext";

function AppConsummer() {
  const { loading, willSearch, hasSearched, getWeatherCurrent } =
    useContext(AppContext);

  return (
    <>
      <Header />

      <Menus />

      <div className="mainContainer">
        {willSearch ? <WeatherHeader /> : <SearchAnotherCity />}

        {loading && <p>Loading...</p>}
        {hasSearched && !getWeatherCurrent.name && !loading && (
          <LocationNotFound />
        )}
        {hasSearched && getWeatherCurrent.name && !loading && (
          <>
            <CatchPhrase />
            <Current />
            <Forecast />
          </>
        )}
      </div>
    </>
  );
}

export default AppConsummer;
