import * as go from "gojs";
import { theme } from "../constants";
import { Person } from "../../data/types";
import formatDate from "../../utils/formatDate";

const personBirthDeathTextBlock = () =>
  new go.TextBlock({
    stroke: theme.colors.textColor,
    font: theme.fonts.birthDeathFont,
    alignmentFocus: go.Spot.Top,
    alignment: new go.Spot(0.5, 1, 0, -35),
  }).bind("text", "", ({ birthdate, deathdate }: Person) => {
    return `${formatDate(birthdate)} - ${formatDate(deathdate)}`;
  });

export default personBirthDeathTextBlock;
