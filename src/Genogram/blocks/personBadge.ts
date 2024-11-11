import * as go from "gojs";
import {
  CORNER_ROUNDNESS,
  genderProperty,
  STROKE_WIDTH,
  theme,
} from "../constants";
import { Gender } from "../../data/types";

const genderToTextColor = (gender: Gender) =>
  gender === "male"
    ? theme.colors.maleBadgeText
    : gender === "female"
    ? theme.colors.femaleBadgeText
    : theme.colors.otherBadgeText;

const genderToFillColor = (gender: Gender) =>
  gender === "male"
    ? theme.colors.maleBadgeBackground
    : gender === "female"
    ? theme.colors.femaleBadgeBackground
    : theme.colors.otherBadgeBackground;

const personBadge = () =>
  new go.Panel("Auto", {
    alignmentFocus: go.Spot.TopRight,
    alignment: new go.Spot(1, 0, -25, STROKE_WIDTH - 0.5),
  }).add(
    new go.Shape({
      figure: "RoundedRectangle",
      parameter1: CORNER_ROUNDNESS,
      parameter2: 4 | 8, // round only the bottom
      desiredSize: new go.Size(NaN, 22.5),
      stroke: null,
    }).bind("fill", genderProperty, genderToFillColor),
    new go.TextBlock({
      font: theme.fonts.badgeFont,
    })
      .bind("stroke", genderProperty, genderToTextColor)
      .bind("text", genderProperty, (gender: Gender) =>
        gender.toLocaleUpperCase()
      )
  );

export default personBadge;
