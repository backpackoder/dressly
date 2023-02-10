import { useContext } from "react";

// Context
import { AppContext } from "../../AppContext";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function SearchByLocation() {
  const { searchByLocation } = useContext(AppContext);

  return (
    <div className="searchByLocationBtnWrapper">
      <FontAwesomeIcon icon={faLocationDot} />
      <input
        onClick={searchByLocation}
        type="button"
        value="Buscar por mi localización"
        className="searchByLocationBtn"
      />
      <FontAwesomeIcon icon={faLocationDot} />
    </div>
  );
}

export default SearchByLocation;
