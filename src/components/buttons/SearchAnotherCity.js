import { useContext } from "react";

// Context
import { AppContext } from "../../AppContext";

function SearchAnotherCity() {
  const { setWillSearch } = useContext(AppContext);

  return (
    <div className="anotherSearchBtnWrapper">
      <input
        onClick={() => setWillSearch(true)}
        type="button"
        value="Buscar una otra ciudad"
        className="anotherSearchBtn"
      />
    </div>
  );
}

export default SearchAnotherCity;
