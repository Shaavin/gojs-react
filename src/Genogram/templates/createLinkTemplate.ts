import * as go from "gojs";
import { theme } from "../constants";

const createLinkTemplate = (
  onMouseEnter: (_: unknown, part: go.ObjectData) => void,
  onMouseLeave: (_: unknown, part: go.ObjectData) => void
) =>
  new go.Link({
    selectionAdorned: false,
    routing: go.Routing.Orthogonal,
    layerName: "Background",
    mouseEnter: onMouseEnter,
    mouseLeave: onMouseLeave,
  })
    .add(
      new go.Shape({
        stroke: theme.colors.link,
        strokeWidth: 1,
      })
    )
    .bindObject("stroke", "isHighlighted", (isHighlighted) =>
      isHighlighted ? theme.colors.selectionStroke : theme.colors.link
    )
    .bindObject("stroke", "isSelected", (isSelected) =>
      isSelected ? theme.colors.selectionStroke : theme.colors.link
    )
    .bindObject("strokeWidth", "isSelected", (selected: boolean) =>
      selected ? 2 : 1
    );

export default createLinkTemplate;
