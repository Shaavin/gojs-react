import { ReactDiagram } from "gojs-react";
import { Person, PersonRelationships } from "../data/types";
import * as go from "gojs";
import { useMemo, useState } from "react";
import createNodeTemplate from "./templates/createNodeTemplate";
import createLinkTemplate from "./templates/createLinkTemplate";
import { statusProperty, STROKE_WIDTH, theme } from "./constants";
import "./Genogram.css";

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

export interface GenogramProps {
  people: Person[];
  primaryClient: Person;
}

export default function Genogram({ people, primaryClient }: GenogramProps) {
  const [diagram, setDiagram] = useState<go.Diagram>();

  const onMouseEnterPart = (_: unknown, part: go.ObjectData) =>
    (part.isHighlighted = true);
  const onMouseLeavePart = (_: unknown, part: go.ObjectData) => {
    if (!part.isSelected) part.isHighlighted = false;
  };
  const onSelectionChange = (part: go.ObjectData) => {
    part.isHighlighted = part.isSelected;
  };

  const initDiagram = () => {
    // !TODO: Set license key
    go.Diagram.licenseKey = "INVALID";

    const diagram = new go.Diagram({
      layout: new go.TreeLayout({
        angle: 90,
        nodeSpacing: 20,
        layerSpacing: 50,

        // For compaction, make the last parents place their children in a bus
        treeStyle: go.TreeStyle.LastParents,
        alternateAngle: 90,
        alternateLayerSpacing: 35,
        alternateNodeSpacing: 20,
      }),
      "toolManager.hoverDelay": 100,
      "undoManager.isEnabled": true,
      linkTemplate: createLinkTemplate(onMouseEnterPart, onMouseLeavePart),
      model: new go.TreeModel({ nodeKeyProperty: "id" }),
    });

    diagram.nodeTemplate = createNodeTemplate(
      onMouseEnterPart,
      onMouseLeavePart,
      onSelectionChange,
      strokeStyle
    );
    const nodes = people;
    diagram.model.addNodeDataCollection(nodes);

    diagram.scale = 0.6;

    setDiagram(diagram);
    return diagram;
  };

  const peopleNodeData = useMemo(
    () =>
      people.map((person) => ({
        id: person.id,
        text: person.name,
      })),
    [people]
  );

  const peopleLinkData = useMemo(
    () =>
      people
        .map(
          (person) =>
            [person.id, person.relationships] as [number, PersonRelationships]
        )
        .flatMap(([fromPid, relationships]: [number, PersonRelationships]) =>
          Array.from(relationships.entries()).map(([toPid, _]) => ({
            id: `${fromPid}-${toPid}`,
            from: fromPid,
            to: toPid,
          }))
        ),
    [people]
  );

  return (
    <>
      <ReactDiagram
        divClassName="diagram-component"
        initDiagram={initDiagram}
        modelData={people}
        linkDataArray={peopleLinkData}
        nodeDataArray={peopleNodeData}
      />
      <div className="button-wrapper">
        <button
          className="button button-left"
          onClick={() => diagram?.commandHandler?.zoomToFit?.()}
        >
          Zoom to fit
        </button>
        <button
          className="button"
          onClick={() => {
            if (!diagram) return;
            const root = diagram.findNodeForKey(primaryClient.id);
            if (!root) return;
            diagram.scale = 0.6;
            diagram.scrollToRect(root.actualBounds);
          }}
        >
          Center on root
        </button>
      </div>
    </>
  );
}
