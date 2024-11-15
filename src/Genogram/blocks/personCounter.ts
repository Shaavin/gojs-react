import * as go from "gojs";
import { STROKE_WIDTH, theme } from "../constants";

const personCounter = () =>
  new go.Panel("Auto", {
    visible: false,
    alignmentFocus: go.Spot.Center,
    alignment: go.Spot.Bottom,
  })
    .bindObject("visible", "", (obj) => obj.findLinksOutOf().count > 0)
    .add(
      new go.Shape("Circle", {
        desiredSize: new go.Size(29, 29),
        strokeWidth: STROKE_WIDTH,
        fill: theme.colors.counterBackground,
      }).bindObject("stroke", "isHighlighted", (isHighlighted: boolean) =>
        isHighlighted
          ? theme.colors.selectionStroke
          : theme.colors.defaultStroke
      ),
      new go.TextBlock({
        alignment: new go.Spot(0.5, 0.5, 0, 1),
        stroke: theme.colors.textColor,
        font: theme.fonts.counterFont,
        textAlign: "center",
      }).bindObject("text", "", (obj) => obj.findNodesOutOf().count)
    );

export default personCounter;
