// import { useContext, useEffect } from "react";
// import MainContext from "../MainContext";

// function useCallApi() {
//   const {
//     callApi,
//     setCallApi,
//     setWillSearch,
//     setHasSearched,
//     setLoading,
//     setCntValue,
//     locOrSearch,
//     currentLoc,
//     currentSearch,
//     setGetWeatherCurrent,
//     forecastLoc,
//     forecastSearch,
//     setGetWeatherForecast,
//     currentAirQualityLoc,
//     currentAirQualitySearch,
//     setGetCurrentAirQuality,
//   } = useContext(MainContext);

//   useEffect(() => {
//     setWillSearch(false);
//     setHasSearched(true);
//     setLoading(true);
//     setCntValue(1);

//     // current's fetch
//     fetch(locOrSearch(currentLoc, currentSearch))
//       .then((res) => {
//         return res.json();
//       })
//       .then((currentData) => {
//         setGetWeatherCurrent(currentData);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log("erreur dans catch current: " + err);
//         setLoading(false);
//       });

//     // forecast's fetch
//     fetch(locOrSearch(forecastLoc, forecastSearch))
//       .then((res) => {
//         return res.json();
//       })
//       .then((forecastData) => {
//         setGetWeatherForecast(forecastData);
//       })
//       .catch((err) => {
//         console.log("erreur dans catch forecast: " + err);
//       });

//     // currentAirQuality's fetch
//     fetch(locOrSearch(currentAirQualityLoc, currentAirQualitySearch))
//       .then((res) => {
//         return res.json();
//       })
//       .then((currentAirQualityData) => {
//         setGetCurrentAirQuality(currentAirQualityData);
//       })
//       .catch((err) => {
//         console.log("erreur dans catch currentAirQuality: " + err);
//       });

//     return () => {
//       setCallApi(false);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [callApi]);
// }

// export default useCallApi;
