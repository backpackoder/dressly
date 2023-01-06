import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

// import settingsInputs from "../../utils/settingsInputs";
import favList from "../../utils/favList";

function SettingsMenu({ isSettingsShowed, isFavShowed, showSettings }) {
  const [temp0, setTemp0] = useState(10);
  const [temp1, setTemp1] = useState(15);
  const [temp2, setTemp2] = useState(20);
  const [temp3, setTemp3] = useState(25);
  const [temp4, setTemp4] = useState(30);
  const [temp5, setTemp5] = useState(35);

  // const temps = [temp0, temp1, temp2, temp3, temp4, temp5];
  const setTemps = [
    setTemp0,
    setTemp0,
    setTemp1,
    setTemp2,
    setTemp3,
    setTemp4,
    setTemp5,
  ];

  const settingsInputs = [
    {
      label: "Mucho Frijol",
      emoji: "❄️",
      name: "temp0",
      deg: temp0,
      nextDeg: null,
    },
    {
      label: "Frijol",
      emoji: "🥶",
      name: "temp1",
      deg: temp0,
      nextDeg: temp1,
    },
    {
      label: "Poco frijol",
      emoji: "😰",
      name: "temp2",
      deg: temp1,
      nextDeg: temp2,
    },
    {
      label: "Templado",
      emoji: "😃",
      name: "temp3",
      deg: temp2,
      nextDeg: temp3,
    },
    {
      label: "Poco calabacín",
      emoji: "♨️",
      name: "temp4",
      deg: temp3,
      nextDeg: temp4,
    },
    {
      label: "Calabacín",
      emoji: "🔥",
      name: "temp5",
      deg: temp4,
      nextDeg: temp5,
    },
    {
      label: "Mucho calabacín",
      emoji: "🥵",
      name: "temp6",
      deg: temp5,
      nextDeg: null,
    },
  ];

  const handleCelcius = (index, e) => {
    const { value } = e.target;
    setTemps[index](value);
  };
  function indexCheck(index, e) {
    console.log("index: " + index);
  }

  function resetChanges() {
    setTemp0(10);
    setTemp1(15);
    setTemp2(20);
    setTemp3(25);
    setTemp4(30);
    setTemp5(35);
  }

  function saveChanges() {
    if (temp0 >= temp1) {
      setTemp0(temp1 - 1);
    } else {
      if (temp1 >= temp2) {
        setTemp1(temp2 - 1);
      } else {
        if (temp2 >= temp3) {
          setTemp2(temp3 - 1);
        } else {
          if (temp3 >= temp4) {
            setTemp3(temp4 - 1);
          } else {
            if (temp4 >= temp5) {
              setTemp4(temp5 - 1);
            }
          }
        }
      }
    }
  }

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
          <p>Como se siente: </p>

          {settingsInputs.map((data, index) => {
            return (
              <>
                {index === 0 ? (
                  <div onClick={(e) => indexCheck(index, e)} key={index}>
                    <p>{`${data.emoji} ${data.label} :`}</p>
                    <p>{`Menos de ${data.deg}C°`}</p>
                  </div>
                ) : null}

                {index > 0 && index < settingsInputs.length - 1 ? (
                  <div onClick={(e) => indexCheck(index, e)} key={index}>
                    <label htmlFor={data.name}>
                      {data.emoji} {data.label} :
                    </label>
                    <div>
                      {"De "}
                      <input
                        onChange={(e) => handleCelcius(index, e)}
                        className="mapInput"
                        type="number"
                        name={data.name}
                        value={data.deg}
                      />
                      {`C° hasta ${data.nextDeg}C°`}
                    </div>
                  </div>
                ) : null}

                {index === settingsInputs.length - 1 ? (
                  <div onClick={(e) => indexCheck(index, e)} key={index}>
                    <label htmlFor={data.name}>
                      {data.emoji} {data.label} :
                    </label>
                    <div>
                      {"Más de "}
                      <input
                        onChange={(e) => handleCelcius(index, e)}
                        className="mapInput"
                        type="number"
                        name={data.name}
                        value={data.deg}
                      />
                      {`C°`}
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}

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
    </>
  );
}

export default SettingsMenu;
