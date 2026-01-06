import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { Server } from 'lucide-react'; 
import './PipelineNode.css'; 

// Defining the custom node component. 

const PipelineNode = ({ id, data, selected }: NodeProps) => {
  return (
    
    <div className={`pipeline-node ${selected ? 'selected' : ''}`}>
      
      {/* Left handle defines where incoming connections attach */}
      <Handle 
        type="target" 
        position={Position.Left} 
        className="handle-custom"
      />
      
      <div className="node-content">
        <div className="icon-box">
          <Server size={20} color="#475569" />
        </div>
        
        <div className="node-text">
          <span className="node-label">{String(data.label)}</span>
          <span className="node-sub">Node ID: {id.slice(0, 3)}</span>
        </div>
      </div>
      
      {/* Right handle defines where outgoing connections attach */}
      <Handle 
        type="source" 
        position={Position.Right} 
        className="handle-custom"
      />
    </div>
  );
};


// To avoid unnecessary re-renders and re-render only when props changes - for making canvas smoother
export default memo(PipelineNode); // memo : to avoid