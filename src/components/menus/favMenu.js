import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import favList from "../../utils/favList";

function FavMenu({
  setNewFav,
  citynameInCapitalize,
  setCityName,
  setCountry,
  searchByName,
  setAddedToFavorite,
  isFavShowed,
  setIsFavShowed,
  isSettingsShowed,
  showFav,
}) {
  // let favListFromLS = localStorage.getItem("favList");
  const favListFromLS = JSON.parse(localStorage.getItem("favList"));
  // console.log("favListFromLS: " + JSON.stringify(favListFromLS));
  // console.log("obj: " + JSON.stringify(obj));

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
    // console.log("findCityInFavs: " + JSON.stringify(findCityInFavs, null, 2));

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
      <div onClick={showFav} id="favMenuBtn">
        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
      </div>

      <div
        id="favMenu"
        className={isFavShowed && !isSettingsShowed ? "active" : "inactive"}
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
