import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Node,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";

import PipelineNode from "./components/PipelineNode/PipelineNode";
import { Header } from "./components/Header/Header";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { StatusPanel } from "./components/StatusPanel/StatusPanel";
import { JsonPreview } from "./components/JsonPreview/JsonPreview";
import { ContextMenu } from "./components/ContextMenu/ContextMenu";
import { useDAGValidation } from "./hooks/useDAGValidation";
import { getLayoutedElements } from "./utils/layout";

const nodeTypes = {
  custom: PipelineNode,
};

export default function App() {
 
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [menu, setMenu] = useState<{ id: string; top: number; left: number } | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const { isValid, message } = useDAGValidation(nodes, edges);

  const handleAddNode = () => {
    const label = prompt("Enter Node Name:");
    if (!label) return;

    const newNode: Node = {
      id: uuidv4(), // UUID avoids collisions
      type: "custom",
      position: { x: Math.random() * 400, y: Math.random() * 300 },
      data: { label },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  // creating and validating(no-self edge) the edges
  const onConnect = useCallback(
    (params: Connection) => {
      if (params.source === params.target) return;

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed },
            animated: true,
            style: { stroke: "#64748b", strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // on-right-clicking, context menu should open over the node
  const onNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();

    const pane = document.querySelector(".react-flow__pane");
    const bounds = pane?.getBoundingClientRect();

    if (bounds) {
      setMenu({
        id: node.id,
        top: event.clientY - bounds.top,
        left: event.clientX - bounds.left,
      });
    }
  }, []);

  // context menu should close after clicking over empty space
  const onPaneClick = useCallback(() => setMenu(null), []);

  // removing edges after node deletion
  const handleDeleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
      setMenu(null);
    },
    [setNodes, setEdges]
  );

  // Auto-layout recalculates node positions to improve readability of the pipeline
  const handleLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges, setNodes, setEdges]);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingRight: "20px",
          borderBottom: "1px solid #e2e8f0",
          background: "#f8fafc",
        }}
      >
        <Toolbar
          onAddNode={handleAddNode}
          onLayout={handleLayout}
          onToggleDebug={() => setShowDebug(!showDebug)}
        />
        <StatusPanel isValid={isValid} message={message} />
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView 
        >
          <Background color="#cbd5e1" gap={16} />
          <Controls />

          {menu && (
            <ContextMenu
              {...menu}
              onDelete={handleDeleteNode}
              onClose={() => setMenu(null)}
            />
          )}

          {showDebug && (
            <JsonPreview
              data={{
                nodes: nodes.map((n) => ({ id: n.id, label: n.data.label })),
                edges: edges.map((e) => ({ source: e.source, target: e.target })),
              }}
              onClose={() => setShowDebug(false)}
            />
          )}
        </ReactFlow>
      </div>
    </div>
  );
}
