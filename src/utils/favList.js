// Constants
import { favListFromLS } from "../constants/constants";

const favList = [];

if (favListFromLS) {
  favListFromLS.map((data) => {
    return favList.push({ city: data.city, country: data.country });
  });
}

export default favList;
