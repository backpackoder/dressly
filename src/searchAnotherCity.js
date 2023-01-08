function SearchAnotherCity({ setWillSearch }) {
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
