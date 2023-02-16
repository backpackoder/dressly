import { useContext, useState } from "react";

// Context
import { AppContext } from "../../AppContext";

// Components
import FavMenu from "./FavMenu";
import SettingsMenu from "./SettingsMenu";

function Menus() {
  const { newFav, setNewFav } = useContext(AppContext);

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
          newFav={newFav}
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
