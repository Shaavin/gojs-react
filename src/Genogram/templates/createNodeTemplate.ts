import * as go from "gojs";
import personMainShape from "../blocks/personMainShape";
import personNameTextBlock from "../blocks/personNameTextBlock";
import personBirthDeathTextBlock from "../blocks/personBirthDeathTextBlock";
import personImage from "../blocks/personImage";
import personBadge from "../blocks/personBadge";
import personCounter from "../blocks/personCounter";
import { statusProperty, STROKE_WIDTH, theme } from "../constants";

const getStrokeForStatus = (status: string) => {
  switch (status) {
    case "king":
    case "queen":
      return theme.colors.kingQueenBorder;
    case "prince":
    case "princess":
      return theme.colors.princePrincessBorder;
    case "civilian":
    default:
      return theme.colors.civilianBorder;
  }
};

const strokeStyle = (shape: go.Shape) =>
  shape
    .set({
      fill: theme.colors.personNodeBackground,
      strokeWidth: STROKE_WIDTH,
    })
    .bind("stroke", statusProperty, (status: string) =>
      getStrokeForStatus(status)
    )
    .bindObject(
      "stroke",
      "isHighlighted",
      (isHighlighted: boolean, obj: go.ObjectData) =>
        isHighlighted
          ? theme.colors.selectionStroke
          : getStrokeForStatus(obj.part.data.status)
    );

const createNodeTemplate = (
  onMouseEnter: (_: unknown, part: go.ObjectData) => void,
  onMouseLeave: (_: unknown, part: go.ObjectData) => void,
  onSelectionChange: (part: go.ObjectData) => void
) =>
  new go.Node("Spot", {
    selectionAdorned: false,
    mouseEnter: onMouseEnter,
    mouseLeave: onMouseLeave,
    selectionChanged: onSelectionChange,
  }).add(
    new go.Panel("Spot").add(
      personMainShape(strokeStyle),
      personNameTextBlock(),
      personBirthDeathTextBlock()
    ),
    personImage(strokeStyle),
    personBadge(),
    personCounter()
  );

export default createNodeTemplate;
