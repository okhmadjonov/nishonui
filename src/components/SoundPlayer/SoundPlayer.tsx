import hitSound from "../../assets/sounds/akm.mp3";
import missSound from "../../assets/sounds/miss.mp3";

export const playSound = (type: "hit" | "miss") => {
  const sound = new Audio(type === "hit" ? hitSound : missSound);
  sound.play();
};
