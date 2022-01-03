import React from 'react';
import './style.css';

const LegendItem = ({ title, color }) => {
  return (
    <div style={{ cursor: 'pointer' }} className="legend-container">
      <div style={{ background: color, width: 30, height: 10, marginRight: 6 }}></div>
      <div className="legend-title">{title}</div>
    </div>
  );
};

export default LegendItem;
