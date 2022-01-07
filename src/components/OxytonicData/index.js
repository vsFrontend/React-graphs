import React, { useEffect, useState } from 'react';

import { initialNullArray, xAxisLabels } from '../../utils/constants';
import './style.css';

const OxytonicData = () => {
  const [contractionData, setContractionData] = useState(initialNullArray);
  const [dropMinData, setDropMinData] = useState(initialNullArray);

  const getAllData = async () => {
    let contractionValue = [...contractionData];
    let dropMinValue = [...dropMinData];

    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      contractionValue[selectedIndex] = checkData[item].PoxytonicUL;
      dropMinValue[selectedIndex] = checkData[item].PoxytonicDM;
    });

    setContractionData(contractionValue);
    setDropMinData(dropMinValue);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className="table-heading">Oxytocin</div>
        {contractionData.map((item, i) => {
          return (
            <div className="box-container" style={{ display: 'flex', alignItems: 'center' }}>
              {item === null ? null : <span className="tooltip">{item}</span>}
              {item === null ? <span className="data-box"></span> : <span className="data-box gray-back">{item}</span>}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex' }}>
        <div className="table-heading">Drops</div>
        {dropMinData.map((item, i) => {
          return (
            <div className="box-container" style={{ display: 'flex', alignItems: 'center' }}>
              {item === null ? null : <span className="tooltip">{item}</span>}
              {item === null ? (
                <span className="data-box data-box-last"></span>
              ) : (
                <span className="data-box data-box-last gray-back">
                  <span>{item}</span>{' '}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OxytonicData;
