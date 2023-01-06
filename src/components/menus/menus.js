import { useState } from "react";

import FavMenu from "./favMenu";
import SettingsMenu from "./settingsMenu";

import favList from "../../utils/favList";

function Menus({
  cityName,
  citynameInCapitalize,
  setCityName,
  setCountry,
  searchLocation,
  setAddedToFavorite,
}) {
  const [newFav, setNewFav] = useState(favList);

  const [isFavShowed, setIsFavShowed] = useState(false);
  const [isSettingsShowed, setIsSettingsShowed] = useState(false);

  function showFav() {
    setIsSettingsShowed(false);
    setIsFavShowed(!isFavShowed);
  }

  function showSettings() {
    setIsFavShowed(false);
    setIsSettingsShowed(!isSettingsShowed);
  }

  return (
    <div
      id="menus"
      className={isFavShowed || isSettingsShowed ? "active" : "inactive"}
    >
      <SettingsMenu
        isSettingsShowed={isSettingsShowed}
        isFavShowed={isFavShowed}
        showSettings={showSettings}
      />
      {favList.length > 0 ? (
        <FavMenu
          setNewFav={setNewFav}
          cityName={cityName}
          citynameInCapitalize={citynameInCapitalize}
          setCityName={setCityName}
          setCountry={setCountry}
          searchLocation={searchLocation}
          setAddedToFavorite={setAddedToFavorite}
          isFavShowed={isFavShowed}
          setIsFavShowed={setIsFavShowed}
          isSettingsShowed={isSettingsShowed}
          showFav={showFav}
        />
      ) : null}
    </div>
  );
}

export default Menus;
