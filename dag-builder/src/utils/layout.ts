import dagre from "dagre";
import { type Node, type Edge, Position } from "reactflow";

/**
Auto Layout
Improve the visual clarity of the pipeline with an Auto Layout button.
When triggered, nodes should be automatically rearranged to a clean flow
(e.g., top-down or left-right).
Use a layout library like dagre to implement this.
Call fitView() (or similar) to automatically zoom to fit all elements after layout.
 **/

export const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {

  const autoWidth = 180
  const autoHeight = 50

  // creating a new directed graph for Dagre
  const dagreGraph = new dagre.graphlib.Graph();

  // edge labels are optional but must exist
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // configuring layout direction - left to right
  dagreGraph.setGraph({
    rankdir: "LR", 
  });

  /* ======================================================================================
     Step 1: copying all nodes of original graph into new dagreGraph with a fixed dimension 
     ======================================================================================
  */
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: autoWidth,
      height: autoHeight,
    });
  });

  /* ===============================================================
     Step 2: copying all edges of original graph into new dagreGraph
     =============================================================== */
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  /* =========================
     Step 3: compute Layout
     ========================= */
  dagre.layout(dagreGraph);

  /* =====================================================
     Step 4: positioning the nodes after all modifications
     ===================================================== */
  const layoutedNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);

    return {
      ...node,
      targetPosition: Position.Left,
      sourcePosition: Position.Right,

      // dagre gives center position of a node but react-flow expects top-left position, so needs a shift to align both
      position: {
        x: x - autoWidth / 2,
        y: y - autoHeight / 2,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
};
