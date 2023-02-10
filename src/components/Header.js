import { useContext } from "react";

// Context
import { AppContext } from "../AppContext";

function Header() {
  const { hasSearched } = useContext(AppContext);

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
