import { useContext } from "react";
import MainContext from "../../MainContext";

function SearchAnotherCity() {
  const { setWillSearch } = useContext(MainContext);

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
