import * as go from "gojs";
import personMainShape from "../blocks/personMainShape";
import personNameTextBlock from "../blocks/personNameTextBlock";
import personBirthDeathTextBlock from "../blocks/personBirthDeathTextBlock";
import personImage from "../blocks/personImage";
import personBadge from "../blocks/personBadge";
import personCounter from "../blocks/personCounter";

const createNodeTemplate = (
  onMouseEnter: (_: unknown, part: go.ObjectData) => void,
  onMouseLeave: (_: unknown, part: go.ObjectData) => void,
  onSelectionChange: (part: go.ObjectData) => void,
  strokeStyle: (shape: go.Shape) => go.Shape
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
