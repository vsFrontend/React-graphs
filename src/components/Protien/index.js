import React, { useEffect, useState } from 'react';

import { initialNullArray, xAxisLabels } from '../../utils/constants';
import './style.css';

const Protien = () => {
  const [protienData, setProtienData] = useState(initialNullArray);
  const [volData, setVolumeData] = useState(initialNullArray);
  const [ketonesData, setKetonesData] = useState(initialNullArray);
  const [bloodData, setBloodData] = useState(initialNullArray);

  const getAllData = async () => {
    let protienValue = [...protienData];
    let volumeValue = [...volData];
    let ketonesValue = [...ketonesData];
    let bloodValue = [...bloodData];
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    console.log('checkData', checkData);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      protienValue[selectedIndex] = checkData[item].MUprotein;
      volumeValue[selectedIndex] = checkData[item].MUvolume;
      ketonesValue[selectedIndex] = checkData[item].MUketones;
      bloodValue[selectedIndex] = checkData[item].blood;
    });

    setProtienData(protienValue);
    setVolumeData(volumeValue);
    setKetonesData(ketonesValue);
    setBloodData(bloodValue);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div style={{ width: '91.3%', margin: 'auto' }}>
      <div style={{ display: 'flex' }}>
        {protienData.map((item, i) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item === null ? (
                <span className="data-box"></span>
              ) : (
                <span style={{ color: 'green' }} className="data-box">
                  {item}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex' }}>
        {volData.map((item, i) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item === null ? (
                <span className="data-box"></span>
              ) : (
                <span style={{ color: 'blue' }} className="data-box">
                  {item}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex' }}>
        {ketonesData.map((item, i) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item === null ? (
                <span className="data-box"></span>
              ) : (
                <span style={{ color: 'orange' }} className="data-box">
                  {item}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex' }}>
        {bloodData.map((item, i) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item === null ? (
                <span className="data-box data-box-last"></span>
              ) : (
                <span style={{ color: 'red' }} className="data-box data-box-last">
                  {item}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Protien;
