import { useContext } from "react";

// Context
import { AppContext } from "../../AppContext";

// Utils
import favList from "../../utils/favList";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function FavMenu({
  setNewFav,
  showFav,
  isFavShowed,
  setIsFavShowed,
  isSettingsShowed,
}) {
  const {
    searchByName,
    setCityName,
    citynameInCapitalize,
    setCountry,
    setAddedToFavorite,
  } = useContext(AppContext);

  const favListFromLS = JSON.parse(localStorage.getItem("favList"));

  function updateLocalStorage() {
    const favListString = JSON.stringify(favList);
    window.localStorage.setItem("favList", favListString);
  }

  function deleteFav(index) {
    favList.splice(index, 1);
    setNewFav([...favList]);

    const findCityInFavs = favList.find(
      (item) => item.city === citynameInCapitalize
    );
    if (findCityInFavs !== undefined) {
      setAddedToFavorite(true);
    } else {
      setAddedToFavorite(false);
    }

    updateLocalStorage();
  }

  function fetchFav(index) {
    const favListIndex = favList[index];
    setCityName(favListIndex.city);
    setCountry(favListIndex.country);

    setIsFavShowed(!isFavShowed);

    searchByName();
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
          {favListFromLS.map((data, index) => {
            return (
              <li key={index}>
                <FontAwesomeIcon
                  onClick={() => deleteFav(index)}
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
