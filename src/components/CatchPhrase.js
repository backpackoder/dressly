import { useContext } from "react";

// Context
import { AppContext } from "../AppContext";

// Utils
import favList from "../utils/favList";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function CatchPhrase() {
  const { getWeatherCurrent, addedToFavorite, setAddedToFavorite } =
    useContext(AppContext);

  function updateLocalStorage() {
    const favListString = JSON.stringify(favList);
    window.localStorage.setItem("favList", favListString);
  }

  function handlerFav() {
    if (addedToFavorite) {
      const findCity = favList.find(
        (item) => item.city === getWeatherCurrent.name
      );
      const findCityIndexOf = favList.indexOf(findCity);
      if (findCityIndexOf !== -1) {
        favList.splice(findCityIndexOf, 1);
      }
    } else {
      favList.push({
        city: getWeatherCurrent.name,
        country: getWeatherCurrent.sys.country,
      });
    }

    setAddedToFavorite(!addedToFavorite);
    updateLocalStorage();
  }

  return (
    <div id="catchPhraseContainer">
      <p id="catchPhrase">Cómo se siente en</p>
      <div id="catchPhraseData">
        <p>
          {getWeatherCurrent.name} ({getWeatherCurrent.sys.country})
        </p>
      </div>
      <div id="catchPhraseCoord">
        <p>latitud: {getWeatherCurrent.coord.lat}</p>
        <p>longitud: {getWeatherCurrent.coord.lon}</p>
      </div>

      <div id="favoriteBtnContainer">
        <FontAwesomeIcon
          icon={faStar}
          className={addedToFavorite ? "inFavs" : "notInFavs"}
          onClick={handlerFav}
        />
      </div>
    </div>
  );
}

export default CatchPhrase;
