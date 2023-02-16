import { useContext } from "react";

// Context
import { AppContext } from "../AppContext";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function CatchPhrase() {
  const { getWeatherCurrent, addedToFavorite, updateFav } =
    useContext(AppContext);

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
          onClick={() => updateFav(null)}
        />
      </div>
    </div>
  );
}

export default CatchPhrase;
