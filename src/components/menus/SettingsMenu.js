import { useContext, useEffect } from "react";

// Context
import { AppContext } from "../../AppContext";

// Constants
import { HEAT_INDEX } from "../../constants/constants";

// Utils
import favList from "../../utils/favList";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faArrowRightRotate,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

function SettingsMenu({ isSettingsShowed, isFavShowed, showSettings }) {
  const {
    userName,
    userNameInCapitalize,
    setUserName,
    temp0,
    setTemp0,
    temp1,
    setTemp1,
    temp2,
    setTemp2,
    temp3,
    setTemp3,
    temp4,
    setTemp4,
    temp5,
    setTemp5,
  } = useContext(AppContext);

  const setTemps = [
    setTemp0,
    setTemp1,
    setTemp2,
    setTemp3,
    setTemp4,
    setTemp5,
    setTemp5,
  ];

  const settingsInputs = [
    {
      label: "Mucho calor",
      emoji: "🥵",
      name: "temp6",
      deg: temp0,
      prevDeg: null,
    },
    {
      label: "Tengo calor",
      emoji: "🔥",
      name: "temp5",
      deg: temp1,
      prevDeg: temp0,
    },
    {
      label: "Poco calor",
      emoji: "♨️",
      name: "temp4",
      deg: temp2,
      prevDeg: temp1,
    },
    {
      label: "Templado",
      emoji: "😃",
      name: "temp3",
      deg: temp3,
      prevDeg: temp2,
    },
    {
      label: "Poco frío",
      emoji: "🤧",
      name: "temp2",
      deg: temp4,
      prevDeg: temp3,
    },
    {
      label: "Tengo frío",
      emoji: "❄️",
      name: "temp1",
      deg: temp5,
      prevDeg: temp4,
    },
    {
      label: "Mucho frío",
      emoji: "🥶",
      name: "temp0",
      deg: temp5,
      prevDeg: temp4,
    },
  ];

  function handleCelcius(e, index) {
    const { value } = e.target;
    setTemps[index](value);
  }

  function resetChanges() {
    setTemp0(HEAT_INDEX.TEMP_0);
    setTemp1(HEAT_INDEX.TEMP_1);
    setTemp2(HEAT_INDEX.TEMP_2);
    setTemp3(HEAT_INDEX.TEMP_3);
    setTemp4(HEAT_INDEX.TEMP_4);
    setTemp5(HEAT_INDEX.TEMP_5);
  }

  function saveChanges() {}

  // if (temp0 <= temp1) {
  //   setTemp0(temp1 + 1);
  // } else {
  //   if (temp1 <= temp2) {
  //     setTemp1(temp2 + 1);
  //   } else {
  //     if (temp2 <= temp3) {
  //       setTemp2(temp3 + 1);
  //     } else {
  //       if (temp3 <= temp4) {
  //         setTemp3(temp4 + 1);
  //       } else {
  //         if (temp4 <= temp5) {
  //           setTemp4(temp5 + 1);
  //         }
  //       }
  //     }
  //   }
  // }

  // if (temp5 >= temp4) {
  //   setTemp5(temp4 - 1);
  // } else {
  //   if (temp4 >= temp3) {
  //     setTemp4(temp3 - 1);
  //   } else {
  //     if (temp3 >= temp2) {
  //       setTemp3(temp2 - 1);
  //     } else {
  //       if (temp2 >= temp1) {
  //         setTemp2(temp1 - 1);
  //       } else {
  //         if (temp1 >= temp0) {
  //           setTemp1(temp0 - 1);
  //         }
  //       }
  //     }
  //   }
  // }

  useEffect(() => {
    window.localStorage.setItem("userName", userNameInCapitalize);
  }, [userNameInCapitalize]);

  useEffect(() => {
    const heatList = [temp0, temp1, temp2, temp3, temp4, temp5];
    window.localStorage.setItem("heat", JSON.stringify(heatList));
  }, [temp0, temp1, temp2, temp3, temp4, temp5]);

  return (
    <>
      <div
        onClick={showSettings}
        className={
          favList.length > 0 ? "settingsMenuBtn down" : "settingsMenuBtn up"
        }
      >
        <FontAwesomeIcon icon={faCog} style={{ color: "#000" }} />
      </div>

      <div
        className={
          isSettingsShowed && !isFavShowed
            ? "settingsMenu active"
            : "settingsMenu inactive"
        }
      >
        <p>Configuracion:</p>
        <div className="pseudo">
          <p>Como te llamas?</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="heatIndex">
          <p>Indice de calor</p>

          <div className="levels">
            <div>
              <div className="thermometer"></div>

              {settingsInputs.map((data, index) => {
                if (index === 0) {
                  return (
                    <div key={index} className="level">
                      <p className="label">
                        {data.label} {data.emoji}
                      </p>
                      Más de{" "}
                      <input
                        type="number"
                        min="-20"
                        max="50"
                        value={data.deg}
                        onChange={(e) => handleCelcius(e, index)}
                      />
                      <span>C°</span>
                    </div>
                  );
                } else if (index > 0 && index < settingsInputs.length - 1) {
                  return (
                    <div key={index} className="level">
                      <p className="label">
                        {data.label} {data.emoji}
                      </p>
                      Entre{" "}
                      <input
                        type="number"
                        min="-20"
                        max="50"
                        value={data.deg}
                        onChange={(e) => handleCelcius(e, index)}
                      />{" "}
                      y{" "}
                      <span>
                        {index === 1 ? data.prevDeg : data.prevDeg - 1}
                        C°
                      </span>
                    </div>
                  );
                } else if (index === settingsInputs.length - 1) {
                  return (
                    <div key={index} className="level">
                      <p className="label">
                        {data.label} {data.emoji}
                      </p>
                      <p>
                        Menos de <span>{data.deg}C°</span>
                      </p>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>

          <div className="resetAndSaveBtn">
            <button onClick={resetChanges} className="resetChanges">
              <FontAwesomeIcon icon={faArrowRightRotate} />
            </button>

            <button onClick={saveChanges} className="saveChanges">
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsMenu;
