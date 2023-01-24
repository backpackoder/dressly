import { useContext, useState } from "react";

import FavMenu from "./FavMenu";
import SettingsMenu from "./SettingsMenu";

import favList from "../../utils/favList";
import MainContext from "../../MainContext";

function Menus() {
  const {
    setCityName,
    citynameInCapitalize,
    setCountry,
    searchByName,
    setAddedToFavorite,
  } = useContext(MainContext);

  const [newFav, setNewFav] = useState(favList);
  console.log("newFav: " + newFav);

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
          citynameInCapitalize={citynameInCapitalize}
          setCityName={setCityName}
          setCountry={setCountry}
          searchByName={searchByName}
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
