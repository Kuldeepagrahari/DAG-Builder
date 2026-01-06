import React from 'react';
import './Header.css';
import logo from "../../assets/logo.png"

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-title">DAG Builder</div>

      <div className="header-right">
        <span className="logo-text">Intern Project</span>
        <img 
          src={logo}
          alt="My Logo" 
          className="logo-image"
        />
      </div>
    </div>
  );
};