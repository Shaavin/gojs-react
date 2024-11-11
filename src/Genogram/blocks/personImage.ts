import * as go from "gojs";
import { IMAGE_DIAMETER, IMAGE_TOP_MARGIN, STROKE_WIDTH } from "../constants";
import { Gender } from "../../data/types";

const pictureStyle = (pic: go.Picture) =>
  pic
    .bind(
      "source",
      "",
      ({ status, gender }: { status: string; gender: Gender }) => {
        switch (status) {
          case "king":
          case "queen":
            return "../../public/images/king.svg";
          case "prince":
          case "princess":
            return "../../public/images/prince.svg";
          case "civilian":
            return gender === "male"
              ? "../../public/images/male-civilian.svg"
              : "../../public/images/female-civilian.svg";
          default:
            return "../../public/images/male-civilian.svg";
        }
      }
    )
    // The SVG files are different sizes, so this keeps their aspect ratio reasonable
    .bind("desiredSize", "status", (status) => {
      switch (status) {
        case "king":
        case "queen":
          return new go.Size(30, 20);
        case "prince":
        case "princess":
          return new go.Size(28, 20);
        case "civilian":
        default:
          return new go.Size(24, 24);
      }
    });

const personImage = (strokeStyle: (shape: go.Shape) => go.Shape) =>
  new go.Panel("Spot", {
    alignmentFocus: go.Spot.Top,
    alignment: new go.Spot(0, 0, STROKE_WIDTH / 2, IMAGE_TOP_MARGIN),
  }).add(
    new go.Shape({
      figure: "Circle",
      desiredSize: new go.Size(IMAGE_DIAMETER, IMAGE_DIAMETER),
    }).apply(strokeStyle),
    new go.Picture({ scale: 0.9 }).apply(pictureStyle)
  );

export default personImage;
