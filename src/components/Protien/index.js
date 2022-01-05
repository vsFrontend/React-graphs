import React, { useEffect, useState } from 'react';

import { initialNullArray, xAxisLabels } from '../../utils/constants';
import './style.css';

const Protien = () => {
  const [protienData, setProtienData] = useState(initialNullArray);
  const [volData, setVolumeData] = useState(initialNullArray);
  const [ketonesData, setKetonesData] = useState(initialNullArray);
  const [bloodData, setBloodData] = useState(initialNullArray);
  const [checkDataState, setCheckDataState] = useState();

  const getAllData = async () => {
    let protienValue = [...protienData];
    let volumeValue = [...volData];
    let ketonesValue = [...ketonesData];
    let bloodValue = [...bloodData];
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      console.log('selected index', selectedIndex);
      protienValue[selectedIndex] = checkData[item].MUprotein;
      volumeValue[selectedIndex] = checkData[item].MUvolume;
      ketonesValue[selectedIndex] = checkData[item].MUketones;
      bloodValue[selectedIndex] = checkData[item].blood;
    });

    setProtienData(protienValue);
    setVolumeData(volumeValue);
    setKetonesData(ketonesValue);
    setBloodData(bloodValue);
    setCheckDataState(checkData);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div style={{ width: '99.3%', margin: 'auto' }}>
      <div style={{ display: 'flex' }}>
        <div className="table-heading">UrinVol</div>
        {protienData.map((item, i) => {
          return (
            <div className="box-container" style={{ display: 'flex', alignItems: 'center' }}>
              {item === null ? <span className="data-box"></span> : <span className="data-box gray-back">{item}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex' }}>
        <div className="table-heading">Protien</div>
        {volData.map((item, i) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>{item === null ? <span className="data-box"></span> : <span className="data-box gray-back">{item}</span>}</div>
          );
        })}
      </div>

      <div style={{ display: 'flex' }}>
        <div className="table-heading">Ketones</div>
        {ketonesData.map((item, i) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>{item === null ? <span className="data-box"></span> : <span className="data-box gray-back">{item}</span>}</div>
          );
        })}
      </div>
      <div style={{ display: 'flex' }}>
        <div className="table-heading">Blood</div>
        {bloodData.map((item, i) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item === null ? <span className="data-box data-box-last"></span> : <span className="data-box data-box-last gray-back">{item}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Protien;
