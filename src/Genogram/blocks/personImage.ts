import * as go from "gojs";
import {
  IMAGE_DIAMETER,
  IMAGE_TOP_MARGIN,
  STROKE_WIDTH,
  theme,
} from "../constants";
import { Gender } from "../../data/types";

const pictureStyle = (pic: go.Picture) =>
  pic
    .bind("source", "gender", (gender: Gender) =>
      gender === "male"
        ? "/images/male.svg"
        : gender === "female"
        ? "/images/female.svg"
        : Math.random() < 0.5
        ? "/images/male.svg"
        : "/images/female.svg"
    )
    .set({ desiredSize: new go.Size(24, 24) });

const personImage = (strokeStyle: (shape: go.Shape) => go.Shape) =>
  new go.Panel("Spot", {
    alignmentFocus: go.Spot.Top,
    alignment: new go.Spot(0, 0, STROKE_WIDTH / 2, IMAGE_TOP_MARGIN),
  }).add(
    new go.Shape({
      figure: "Circle",
      desiredSize: new go.Size(IMAGE_DIAMETER, IMAGE_DIAMETER),
    })
      .apply(strokeStyle)
      .bindObject("fill", "", (obj) =>
        obj.part.data.id === 0
          ? theme.colors.clientBadgeBackground
          : obj.part.data.fill
      ),
    new go.Picture({ scale: 0.9 }).apply(pictureStyle),
    new go.Shape("Circle", {
      desiredSize: new go.Size(IMAGE_DIAMETER, IMAGE_DIAMETER),
      strokeWidth: STROKE_WIDTH,
      fill: "transparent",
    }).bindObject("stroke", "isHighlighted", (isHighlighted: boolean) =>
      isHighlighted ? theme.colors.selectionStroke : theme.colors.defaultStroke
    )
  );

export default personImage;
