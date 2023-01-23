//Badges
import SmartAndPersistent from "src/assets/SmartAndPersistent.png";
import StrongArm from "src/assets/StrongArm.png";
import TrueHero from "src/assets/TrueHero.png";
import LegendInTheMaking from "src/assets/LegendInTheMaking.png";

export function getBadgeImage(name: string) {
  if (name === "Legend in the making") return LegendInTheMaking;
  else if (name === "True Hero") return TrueHero;
  else if (name === "Strong Arm") return StrongArm;
  else return SmartAndPersistent;
}
