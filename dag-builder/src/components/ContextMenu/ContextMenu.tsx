import React, { useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import './ContextMenu.css'; 


interface ContextMenuProps {
  id: string;
  top: number;
  left: number;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ id, top, left, onDelete, onClose }) => {
  
  // To avoid recreation on every render and hence avoiding unnecessary re-renders every-time user right click over the node
  const handleDelete = useCallback(() => {
    onDelete(id); 
    onClose();    
  }, [id, onDelete, onClose]); 

  return (
    <div 
      className="context-menu" 
      style={{ top, left }}
      onMouseLeave={onClose} 
    >
      
      <div style={{ padding: '8px 16px', fontSize: '12px', color: '#94a3b8', borderBottom: '1px solid #f1f5f9' }}>
        Node: {id.slice(0, 3)}
      </div>
      
      {/* Delete Button */}
      <button onClick={handleDelete} className="delete-btn">
        <Trash2 size={14} /> 
        Delete Node
      </button>
    </div>
  );
};