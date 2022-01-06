import React, { useEffect, useState } from 'react';
import { initialNullArray, xAxisLabels } from '../../utils/constants';
import './style.css';

const Temprature = () => {
  const [tempratureData, setTempratureData] = useState(initialNullArray);

  const getAllData = async () => {
    let tempratureValue = [...tempratureData];
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      tempratureValue[selectedIndex] = checkData[item].Mtemp;
    });
    setTempratureData(tempratureValue);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div style={{ width: '99.3%', margin: 'auto' }}>
      <div style={{ display: 'flex' }}>
        <div className="table-heading">Temp C</div>
        {tempratureData.map((item, i) => {
          return (
            <div className="box-container last" style={{ display: 'flex', alignItems: 'center' }}>
              {item === null ? null : <span className="tooltip">{item}</span>}
              {item === null ? <span className="data-box data-box-last"></span> : <span className="data-box gray-back data-box-last">{item}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Temprature;
