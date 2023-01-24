const useCitynameInCapitalize = (cityName) => {
  const splitCityName = cityName.split(" ");
  for (var i = 0; i < splitCityName.length; i++) {
    splitCityName[i] =
      splitCityName[i].charAt(0).toUpperCase() + splitCityName[i].slice(1);
  }
  const citynameInCapitalize = splitCityName.join(" ").trim();

  return citynameInCapitalize;
};

export default useCitynameInCapitalize;
