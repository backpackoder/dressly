function Header({ hasSearched }) {
  return (
    <>
      {!hasSearched ? (
        <h1>
          ¿Hace <span style={{ color: "blue" }}>frijol</span> o{" "}
          <span style={{ color: "red" }}>calabacín</span>?
        </h1>
      ) : null}
    </>
  );
}

export default Header;
