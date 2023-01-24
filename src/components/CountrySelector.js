import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

function CountrySelector({ country, setCountry }) {
  // A REVOIR
  // useEffect(() => {
  //   const reactSelect = document.querySelector("#react-select-3-placeholder");
  //   reactSelect.textContent = "ANY...";
  // });

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (country) => {
    setCountry(country.value);
  };

  return (
    <>
      <Select onChange={changeHandler} value={country} options={options} />
    </>
  );
}

export default CountrySelector;
