import React from 'react';
import './style.css';

const LegendItem = ({ title, color }) => {
  return (
    <div style={{ cursor: 'pointer' }} className="legend-container">
      <div style={{ borderRadius: '3px', background: color, width: '30px', height: '15px', marginRight: '6px' }}></div>
      <div className="legend-title">{title}</div>
    </div>
  );
};

export default LegendItem;
