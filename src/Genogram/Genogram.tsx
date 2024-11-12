import { ReactDiagram } from "gojs-react";
import { Person, PersonWithParent } from "../data/types";
import * as go from "gojs";
import { useMemo, useState } from "react";
import createNodeTemplate from "./templates/createNodeTemplate";
import createLinkTemplate from "./templates/createLinkTemplate";
import "./Genogram.css";

// Event handlers
const onMouseEnterPart = (_: unknown, part: go.ObjectData) =>
  (part.isHighlighted = true);
const onMouseLeavePart = (_: unknown, part: go.ObjectData) => {
  if (!part.isSelected) part.isHighlighted = false;
};
const onSelectionChange = (part: go.ObjectData) => {
  part.isHighlighted = part.isSelected;
};

const getParents = (people: Person[]): PersonWithParent[] =>
  people.map((person) => ({
    ...person,
    parent: Array.from(person.relationships.keys())[0],
  }));

export interface GenogramProps {
  people: Person[];
  primaryClient: Person;
}

export default function Genogram({ people, primaryClient }: GenogramProps) {
  const [diagram, setDiagram] = useState<go.Diagram>();

  const peopleWithAParent = useMemo(() => getParents(people), [people]);

  const initDiagram = () => {
    // !TODO: Set license key
    go.Diagram.licenseKey = "INVALID";

    const diagram = new go.Diagram({
      // Model & layout
      model: new go.TreeModel({ nodeKeyProperty: "id" }),
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

      // Rendering logic & properties
      nodeTemplate: createNodeTemplate(
        onMouseEnterPart,
        onMouseLeavePart,
        onSelectionChange
      ),
      linkTemplate: createLinkTemplate(onMouseEnterPart, onMouseLeavePart),
      scale: 0.6,

      // Meta-behavior
      "toolManager.hoverDelay": 100,
      "undoManager.isEnabled": true,
    });

    diagram.model.addNodeDataCollection(peopleWithAParent);

    setDiagram(diagram);
    return diagram;
  };

  return (
    <>
      <ReactDiagram
        divClassName="diagram-component"
        initDiagram={initDiagram}
        nodeDataArray={peopleWithAParent}
      />
      <div className="button-wrapper">
        <button
          className="button button-left"
          onClick={() => diagram?.commandHandler.zoomToFit()}
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
