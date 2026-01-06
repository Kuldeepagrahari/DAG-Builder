import React from "react";
import { X } from "lucide-react";
import "./JsonPreview.css";

interface JsonPreviewProps {
  data: { nodes: any[]; edges: any[] };
  onClose: () => void;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ data, onClose }) => {
  // Shorten long IDs to keep the debug output readable
  const shorten = (id: string) => id.slice(0, 3);

  // Formatting graph data into human-readable structure
  const formattedData = {
    nodes: data.nodes.map((n) => ({
      id: shorten(n.id),
      label: n.label,
    })),
    edges: data.edges.map((e) => ({
      source: shorten(e.source),
      target: shorten(e.target),
    })),
  };

  return (
    <div className="json-preview">
      <div className="json-header">
        <span>Debug JSON</span>

        {/* Close button to hide the debug panel */}
        <button onClick={onClose} className="close-btn">
          <X size={14} />
        </button>
      </div>

      <div className="json-body">
        <pre>{JSON.stringify(formattedData, null, 2)}</pre>
      </div>
    </div>
  );
};
