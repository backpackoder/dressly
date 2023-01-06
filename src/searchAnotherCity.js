function SearchAnotherCity({ setWillSearch }) {
  return (
    <div id="anotherSearchBtnWrapper">
      <input
        onClick={() => setWillSearch(true)}
        type="button"
        value="Buscar una otra ciudad"
        id="anotherSearchBtn"
      />
    </div>
  );
}

export default SearchAnotherCity;
