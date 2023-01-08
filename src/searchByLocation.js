import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function SearchByLocation({ searchByLocation }) {
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
