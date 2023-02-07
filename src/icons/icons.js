import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTrashCan,
  faCog,
  faArrowRightRotate,
  faSave,
  faSun,
  faMoon,
  faDroplet,
  faWind,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// Menus
export function STAR_ICON(onClick, classIcon) {
  return (
    <FontAwesomeIcon
      icon={faStar}
      onClick={onClick}
      className={classIcon.toString()}
    />
  );
}
export function TRASHCAN_ICON(classIcon) {
  return <FontAwesomeIcon icon={faTrashCan} className={classIcon.toString()} />;
}
export function COG_ICON(classIcon) {
  return <FontAwesomeIcon icon={faCog} className={classIcon.toString()} />;
}
export function ARROWRIGHTROTATE_ICON(classIcon) {
  return (
    <FontAwesomeIcon
      icon={faArrowRightRotate}
      className={classIcon.toString()}
    />
  );
}
export function SAVE_ICON(classIcon) {
  return <FontAwesomeIcon icon={faSave} className={classIcon.toString()} />;
}

// Weather data current
export function SUN_ICON(classIcon) {
  return <FontAwesomeIcon icon={faSun} className={classIcon.toString()} />;
}
export function MOON_ICON(classIcon) {
  return <FontAwesomeIcon icon={faMoon} className={classIcon.toString()} />;
}
export function DROPLET_ICON(classIcon) {
  return <FontAwesomeIcon icon={faDroplet} className={classIcon.toString()} />;
}
export function WIND_ICON(classIcon) {
  return <FontAwesomeIcon icon={faWind} className={classIcon.toString()} />;
}

// General infos
export function XMARK_ICON(classIcon) {
  return <FontAwesomeIcon icon={faXmark} className={classIcon.toString()} />;
}
