import { useContext } from "react";

// Context
import { AppContext } from "../../AppContext";

// Utils
import favList from "../../utils/favList";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function FavMenu({ showFav, isFavShowed, setIsFavShowed, isSettingsShowed }) {
  const { searchByName, newFav, updateFav } = useContext(AppContext);

  function fetchFav(index) {
    const favListIndex = favList[index];

    setIsFavShowed(!isFavShowed);
    searchByName(favListIndex.city, favListIndex.country);
  }

  return (
    <>
      <div onClick={showFav} className="favMenuBtn">
        <FontAwesomeIcon icon={faStar} className="star" />
      </div>

      <div
        className={
          isFavShowed && !isSettingsShowed
            ? "favMenu active"
            : "favMenu inactive"
        }
      >
        <p>Lugares favoritos:</p>
        <ul>
          {newFav.map((data, index) => {
            return (
              <li key={index}>
                <FontAwesomeIcon
                  onClick={() => updateFav(index)}
                  icon={faTrashCan}
                  className="trashCan"
                />
                <p onClick={() => fetchFav(index)}>
                  {data.city} ({data.country})
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default FavMenu;
