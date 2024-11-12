import * as go from "gojs";
import {
  CORNER_ROUNDNESS,
  genderProperty,
  STROKE_WIDTH,
  theme,
} from "../constants";
import { Gender } from "../../data/types";

const personBadge = (strokeStyle: (shape: go.Shape) => go.Shape) =>
  new go.Panel("Auto", {
    alignmentFocus: go.Spot.TopRight,
    alignment: new go.Spot(1, 0, -25, STROKE_WIDTH - 0.5),
  }).add(
    new go.Shape({
      figure: "RoundedRectangle",
      parameter1: CORNER_ROUNDNESS,
      parameter2: 4 | 8, // round only the bottom
      desiredSize: new go.Size(NaN, 22.5),
    })
      .apply(strokeStyle)
      .bindObject("fill", "", (obj) =>
        obj.part.data.id === 0
          ? theme.colors.clientBadgeBackground
          : obj.part.data.fill
      ),
    new go.TextBlock({
      font: theme.fonts.badgeFont,
      stroke: theme.colors.textColor,
    }).bind("text", genderProperty, (gender: Gender) =>
      gender.toLocaleUpperCase()
    )
  );

export default personBadge;
