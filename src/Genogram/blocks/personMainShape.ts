import * as go from "gojs";
import { CORNER_ROUNDNESS } from "../constants";

const personMainShape = (strokeStyle: (shape: go.Shape) => go.Shape) =>
  new go.Shape({
    figure: "RoundedRectangle",
    desiredSize: new go.Size(215, 110),
    portId: "",
    parameter1: CORNER_ROUNDNESS,
  }).apply(strokeStyle);

export default personMainShape;
