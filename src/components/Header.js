import { useContext } from "react";
import MainContext from "../MainContext";

function Header() {
  const { hasSearched } = useContext(MainContext);

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
