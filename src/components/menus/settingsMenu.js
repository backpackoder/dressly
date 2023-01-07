import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

// import settingsInputs from "../../utils/settingsInputs";
import favList from "../../utils/favList";

function SettingsMenu({ isSettingsShowed, isFavShowed, showSettings }) {
  const [temp0, setTemp0] = useState(35);
  const [temp1, setTemp1] = useState(30);
  const [temp2, setTemp2] = useState(25);
  const [temp3, setTemp3] = useState(20);
  const [temp4, setTemp4] = useState(15);
  const [temp5, setTemp5] = useState(10);

  // const temps = [temp0, temp1, temp2, temp3, temp4, temp5];
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
      label: "Mucho calabacín",
      emoji: "🥵",
      name: "temp6",
      deg: temp0,
      prevDeg: null,
    },
    {
      label: "Calabacín",
      emoji: "🔥",
      name: "temp5",
      deg: temp1,
      prevDeg: temp0,
    },
    {
      label: "Poco calabacín",
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
      label: "Poco frijol",
      emoji: "🤧",
      name: "temp2",
      deg: temp4,
      prevDeg: temp3,
    },
    {
      label: "Frijol",
      emoji: "❄️",
      name: "temp1",
      deg: temp5,
      prevDeg: temp4,
    },
    {
      label: "Mucho frijol",
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
    setTemp0(35);
    setTemp1(30);
    setTemp2(25);
    setTemp3(20);
    setTemp4(15);
    setTemp5(10);
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

  return (
    <>
      <div
        onClick={showSettings}
        id="settingsMenuBtn"
        className={favList.length > 0 ? "down" : "up"}
      >
        <FontAwesomeIcon icon={faCog} style={{ color: "#000" }} />
      </div>

      <div
        id="settingsMenu"
        className={isSettingsShowed && !isFavShowed ? "active" : "inactive"}
      >
        <p>Configuracion:</p>
        <div id="heatIndex">
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
                        min="-10"
                        max="40"
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
                        min="-10"
                        max="40"
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
                }
                return null;
              })}
            </div>
          </div>

          <div className="resetAndSaveBtn">
            <input
              onClick={resetChanges}
              id="resetChanges"
              type="button"
              value="Reiniciar"
            />
            <input
              onClick={saveChanges}
              id="saveChanges"
              type="button"
              value="Guardar"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsMenu;
