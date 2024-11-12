import * as go from "gojs";
import personMainShape from "../blocks/personMainShape";
import personNameTextBlock from "../blocks/personNameTextBlock";
import personBirthDeathTextBlock from "../blocks/personBirthDeathTextBlock";
import personImage from "../blocks/personImage";
import personBadge from "../blocks/personBadge";
import personCounter from "../blocks/personCounter";
import { genderProperty, STROKE_WIDTH, theme } from "../constants";

const strokeStyle = (mainCard: boolean) => (shape: go.Shape) =>
  shape
    .bind("fill", genderProperty, (gender) => {
      if (mainCard) {
        return gender === "male"
          ? theme.colors.maleCardBackground
          : gender === "female"
          ? theme.colors.femaleCardBackground
          : theme.colors.otherCardBackground;
      } else {
        return gender === "male"
          ? theme.colors.maleBadgeBackground
          : gender === "female"
          ? theme.colors.femaleBadgeBackground
          : theme.colors.otherBadgeBackground;
      }
    })
    .set({
      strokeWidth: STROKE_WIDTH,
    })
    .bindObject("stroke", "isHighlighted", (isHighlighted: boolean) =>
      isHighlighted ? theme.colors.selectionStroke : theme.colors.defaultStroke
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
      personMainShape(strokeStyle(true)),
      personNameTextBlock(),
      personBirthDeathTextBlock()
    ),
    personImage(strokeStyle(false)),
    personBadge(strokeStyle(false)),
    personCounter()
  );

export default createNodeTemplate;
