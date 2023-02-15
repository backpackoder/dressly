import { useContext } from "react";

// Context
import { AppContext } from "../../../AppContext";

// Components
// import AmanecerAtardecer from "./AmanecerAtardecer";
import Temp from "./Temp";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import KindOfAir from "./KindOfAir";

function GeneralInfo() {
  const {
    getWeatherCurrent,
    userName,
    userNameInCapitalize,
    generalInfo,
    setGeneralInfo,
  } = useContext(AppContext);

  return (
    <div
      className={generalInfo ? "generalInfo visible" : "generalInfo invisible"}
      onClick={() => setGeneralInfo(!generalInfo)}
    >
      <FontAwesomeIcon icon={faXmark} className="xMark" />
      <div>
        <p>
          Buenos dias{" "}
          <span>{userName ? userNameInCapitalize : "extranjero"}</span>
          ,
          <br />
          <br />
          En{" "}
          <span>
            {getWeatherCurrent.name} ({getWeatherCurrent.sys.country})
          </span>
          :
          <br />
          <br />
          {/* <AmanecerAtardecer /> */}
          <br />
          <br />
          <Temp getWeatherCurrent={getWeatherCurrent} />
          <br />
          <br />
          <KindOfAir getWeatherCurrent={getWeatherCurrent} />
        </p>
        <img
          src="temp3.png"
          alt="Frijol o calabacín te da un resumen del clima actual."
          className="generalInfoImg"
        />
      </div>
    </div>
  );
}

export default GeneralInfo;
