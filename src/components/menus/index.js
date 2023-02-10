import { useState } from "react";

// Components
import FavMenu from "./FavMenu";
import SettingsMenu from "./SettingsMenu";

// Utils
import favList from "../../utils/favList";

function Menus() {
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
      {newFav.length > 0 && (
        <FavMenu
          setNewFav={setNewFav}
          showFav={showFav}
          isFavShowed={isFavShowed}
          setIsFavShowed={setIsFavShowed}
          isSettingsShowed={isSettingsShowed}
        />
      )}
    </div>
  );
}

export default Menus;
