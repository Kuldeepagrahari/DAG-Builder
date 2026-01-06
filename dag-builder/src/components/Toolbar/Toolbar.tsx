import React from "react";
import { PlusCircle, Layout, Code } from "lucide-react";
import "./Toolbar.css";

// Toolbar Component : to interact with the pipeline
 

interface ToolbarProps {
  onAddNode: () => void;     
  onLayout: () => void;     
  onToggleDebug: () => void;  
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddNode,
  onLayout,
  onToggleDebug,
}) => {
  return (
    <div className="toolbar">

      {/* Button to add a new node  */}
      <button className="btn btn-primary" onClick={onAddNode}>
        <PlusCircle size={18} />
        <span>Add Node</span>
      </button>

      {/* Button for AutoLayout  */}
      <button className="btn btn-secondary" onClick={onLayout}>
        <Layout size={18} />
        <span>Auto Layout</span>
      </button>

      {/* Button for Toggling Debug View */}
      <button className="btn btn-secondary" onClick={onToggleDebug}>
        <Code size={18} />
        <span>Debug JSON</span>
      </button>

    </div>
  );
};
