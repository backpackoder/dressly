import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import favList from "../utils/favList";

function CatchPhrase({
  getWeatherCurrent,
  addedToFavorite,
  setAddedToFavorite,
}) {
  function updateLocalStorage() {
    const favListString = JSON.stringify(favList);
    window.localStorage.setItem("favList", favListString);
  }

  function addToFav() {
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
      <p id="catchPhrase">Cómo se siente en:</p>
      <div id="catchPhraseData">
        <p>
          {getWeatherCurrent.name} ({getWeatherCurrent.sys.country})
        </p>
      </div>
      <div id="catchPhraseCoord">
        <p>longitud: {getWeatherCurrent.coord.lon}</p>
        <p>latitud: {getWeatherCurrent.coord.lat}</p>
      </div>

      <div id="favoriteBtnContainer">
        <FontAwesomeIcon
          icon={faStar}
          className={addedToFavorite ? "inFavs" : "notInFavs"}
          onClick={addToFav}
        />
      </div>
    </div>
  );
}

export default CatchPhrase;
