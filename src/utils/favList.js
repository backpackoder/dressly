const favList = [];

const favListFromLS = JSON.parse(localStorage.getItem("favList"));

if (favListFromLS) {
  favListFromLS.map((data) => {
    return favList.push({ city: data.city, country: data.country });
  });
}

export default favList;

// {
//   city: "Lille",
//   country: "FR",
// },
// {
//   city: "Tijuana",
//   country: "MX",
// },
// {
//   city: "Toulouse",
//   country: "FR",
// },
// {
//   city: "Berlin",
//   country: "DE",
// },
// {
//   city: "Guadalajara",
//   country: "MX",
// },
// {
//   city: "Bali",
//   country: "ID",
// },
