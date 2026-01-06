import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import "./StatusPanel.css";

// Status Panel to show DAG validation status to user

interface StatusPanelProps {
  isValid: boolean;
  message: string;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ isValid, message }) => {
  return (
    <div className={`status-panel ${isValid ? "valid" : "invalid"}`}>
      {isValid ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      <span>{message}</span>
    </div>
  );
};
