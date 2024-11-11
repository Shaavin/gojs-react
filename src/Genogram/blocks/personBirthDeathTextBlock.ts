import * as go from "gojs";
import { theme } from "../constants";

const personBirthDeathTextBlock = () =>
  new go.TextBlock({
    stroke: theme.colors.personText,
    font: theme.fonts.birthDeathFont,
    alignmentFocus: go.Spot.Top,
    alignment: new go.Spot(0.5, 1, 0, -35),
  }).bind("text", "", ({ born, death }) => {
    if (!born) return "";
    return `${born} - ${death ?? ""}`;
  });

export default personBirthDeathTextBlock;
