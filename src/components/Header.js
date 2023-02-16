import { useContext } from "react";

// Context
import { AppContext } from "../AppContext";

function Header() {
  const { willSearch } = useContext(AppContext);

  return (
    <>
      {willSearch && (
        <header>
          <h1>Dressly</h1>
        </header>
      )}
    </>
  );
}

export default Header;
