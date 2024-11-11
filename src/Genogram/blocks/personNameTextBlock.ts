import * as go from "gojs";
import { nameProperty, theme } from "../constants";

const personNameTextBlock = () =>
  new go.TextBlock({
    stroke: theme.colors.personText,
    font: theme.fonts.nameFont,
    desiredSize: new go.Size(160, 50),
    overflow: go.TextOverflow.Ellipsis,
    textAlign: "center",
    verticalAlignment: go.Spot.Center,
    toolTip: (go.GraphObject.build("ToolTip") as unknown as { add: any }).add(
      new go.TextBlock({ margin: 4 }).bind("text", nameProperty)
    ),
    alignmentFocus: go.Spot.Top,
    alignment: new go.Spot(0.5, 0, 0, 25),
  }).bind("text", nameProperty);

export default personNameTextBlock;