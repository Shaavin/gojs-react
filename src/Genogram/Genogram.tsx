import * as go from "gojs";

import { ReactDiagram } from "gojs-react";
import { Person } from "../data/types";
import { useState } from "react";

export interface GenogramProps {
  people: Person[];
}

export default function Genogram({ people }: GenogramProps) {
  const [nodeDataArray, setNodeDataArray] = useState<go.ObjectData[]>(
    people.map((person) => ({ ...person }))
  );
  const [linkDataArray, setLinkDataArray] = useState<go.ObjectData[]>([]);
  const [skipsDiagramUpdate, setSkipsDiagramUpdate] = useState<boolean>(false);

  // maps for faster state modification
  const mapNodeKeyIdx = new Map();
  const mapLinkKeyIdx = new Map();
  refreshNodeIndex(nodeDataArray);
  refreshLinkIndex(linkDataArray);

  function initDiagram(): go.Diagram {
    const diagram = new go.Diagram("genogramDiv", {
      "undoManager.isEnabled": true, // must be set to allow for model change listening
      "themeManager.changesDivBackground": true,
      allowCopy: false,
      allowDelete: false,
      initialAutoScale: go.AutoScale.UniformToFill,
      maxSelectionCount: 1, // user can select only one part at a time
      validCycle: go.CycleMode.DestinationTree, // make sure users can only create trees
      layout: new go.TreeLayout({
        treeStyle: go.TreeStyle.LastParents,
        arrangement: go.TreeArrangement.Horizontal,
        // Properties for most of the tree:
        angle: 90,
        layerSpacing: 35,
        // Properties for the "last parents":
        alternateAngle: 90,
        alternateLayerSpacing: 35,
        alternateAlignment: go.TreeAlignment.Bus,
        alternateNodeSpacing: 20,
      }),
    });

    diagram.themeManager.set("light", {
      colors: {
        background: "#fff",
        text: "#111827",
        textHighlight: "#11a8cd",
        subtext: "#6b7280",
        badge: "#f0fdf4",
        badgeBorder: "#16a34a33",
        badgeText: "#15803d",
        divider: "#6b7280",
        shadow: "#9ca3af",
        tooltip: "#1f2937",
        levels: [
          "#AC193D",
          "#2672EC",
          "#8C0095",
          "#5133AB",
          "#008299",
          "#D24726",
          "#008A00",
          "#094AB2",
        ],
        dragOver: "#f0f9ff",
        link: "#9ca3af",
        div: "#f3f4f6",
      },
      fonts: {
        name: "500 0.875rem InterVariable, sans-serif",
        normal: "0.875rem InterVariable, sans-serif",
        badge: "500 0.75rem InterVariable, sans-serif",
        link: "600 0.875rem InterVariable, sans-serif",
      },
    });

    diagram.themeManager.set("dark", {
      colors: {
        background: "#111827",
        text: "#fff",
        subtext: "#d1d5db",
        badge: "#22c55e19",
        badgeBorder: "#22c55e21",
        badgeText: "#4ade80",
        shadow: "#111827",
        dragOver: "#082f49",
        link: "#6b7280",
        div: "#1f2937",
      },
    });

    diagram.nodeTemplate = new go.Node(go.Panel.Spot, {
      isShadowed: true,
      shadowOffset: new go.Point(0, 2),
      selectionObjectName: "BODY",
      // mouseEnter: (e, node) => (node.findObject('BUTTON').opacity = node.findObject('BUTTONX').opacity = 1),
      // mouseLeave: (e, node) => {
      //     if (node.isSelected) return;
      //     node.findObject('BUTTON').opacity = node.findObject('BUTTONX').opacity = 0;
      // },
    });

    return diagram;
  }

  function refreshNodeIndex(nodeArr: go.ObjectData[]) {
    mapNodeKeyIdx.clear();
    nodeArr.forEach((n, idx) => {
      mapNodeKeyIdx.set(n.key, idx);
    });
  }

  function refreshLinkIndex(linkArr: go.ObjectData[]) {
    mapLinkKeyIdx.clear();
    linkArr.forEach((l, idx) => {
      mapLinkKeyIdx.set(l.key, idx);
    });
  }

  function handleModelChange(obj: go.IncrementalData) {
    if (obj === null) return;

    const insertedNodeKeys = obj.insertedNodeKeys;
    const modifiedNodeData = obj.modifiedNodeData;
    const removedNodeKeys = obj.removedNodeKeys;
    const insertedLinkKeys = obj.insertedLinkKeys;
    const modifiedLinkData = obj.modifiedLinkData;
    const removedLinkKeys = obj.removedLinkKeys;

    // copy data to new array, but maintain references
    let nodeArr = nodeDataArray.slice();
    let linkArr = linkDataArray.slice();
    // maintain maps of modified data so insertions don't need slow lookups
    const modifiedNodeMap = new Map();
    const modifiedLinkMap = new Map();
    // only update state if we've actually made a change
    let arrChanged = false;

    // handle node changes
    if (modifiedNodeData) {
      modifiedNodeData.forEach((nd) => {
        modifiedNodeMap.set(nd.key, nd);
        const idx = mapNodeKeyIdx.get(nd.key);
        if (idx !== undefined && idx >= 0) {
          nodeArr.splice(idx, 1, nd);
          arrChanged = true;
        }
      });
    }
    if (insertedNodeKeys) {
      insertedNodeKeys.forEach((key) => {
        const nd = modifiedNodeMap.get(key);
        const idx = mapNodeKeyIdx.get(key);
        if (nd && idx === undefined) {
          mapNodeKeyIdx.set(nd.key, nodeArr.length);
          nodeArr.push(nd);
          arrChanged = true;
        }
      });
    }
    if (removedNodeKeys) {
      nodeArr = nodeArr.filter((nd) => {
        if (removedNodeKeys.includes(nd.key)) {
          arrChanged = true;
          return false;
        }
        return true;
      });
      refreshNodeIndex(nodeArr);
    }
    // handle link changes
    if (modifiedLinkData) {
      modifiedLinkData.forEach((ld) => {
        modifiedLinkMap.set(ld.key, ld);
        const idx = mapLinkKeyIdx.get(ld.key);
        if (idx !== undefined && idx >= 0) {
          linkArr.splice(idx, 1, ld);
          arrChanged = true;
        }
      });
    }
    if (insertedLinkKeys) {
      insertedLinkKeys.forEach((key) => {
        const ld = modifiedLinkMap.get(key);
        const idx = mapLinkKeyIdx.get(key);
        if (ld && idx === undefined) {
          mapLinkKeyIdx.set(ld.key, linkArr.length);
          linkArr.push(ld);
          arrChanged = true;
        }
      });
    }
    if (removedLinkKeys) {
      linkArr = linkArr.filter((ld) => {
        if (removedLinkKeys.includes(ld.key)) {
          arrChanged = true;
          return false;
        }
        return true;
      });
      refreshLinkIndex(linkArr);
    }

    if (arrChanged) {
      setNodeDataArray(nodeArr);
      setLinkDataArray(linkArr);
      setSkipsDiagramUpdate(true);
    }
  }

  return (
    <ReactDiagram
      divClassName="diagram-component"
      initDiagram={initDiagram}
      nodeDataArray={nodeDataArray}
      linkDataArray={linkDataArray}
      skipsDiagramUpdate={skipsDiagramUpdate}
      onModelChange={handleModelChange}
    />
  );
}
