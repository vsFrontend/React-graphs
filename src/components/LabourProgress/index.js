import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { positions, initialNullArray, xAxisLabels } from '../../utils/constants';
import { LegendItem } from '../../components';
import { Col, Row } from 'antd';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const LabourProgress = () => {
  const [cDilationData, setCDilationData] = useState(initialNullArray);
  const [length, setLength] = useState(initialNullArray);
  const [aboveBrim, setAboveBrimData] = useState(initialNullArray);
  const [position, setPosition] = useState(initialNullArray);

  const [actionLine, setActionLine] = useState(false);
  const [actionLineData, setActionLineData] = useState([]);
  const [hourAgoData, setHourAgoData] = useState([]);

  const getAllData = async () => {
    let cDilation = [...cDilationData];
    let lengthData = [...length];
    let aboveBrimData = [...aboveBrim];
    let positionData = [...position];
    let actionLinePoints = [];
    let hourAgoArray = [];
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      cDilation[selectedIndex] = checkData[item].CDilation;
      aboveBrimData[selectedIndex] = checkData[item]?.Pfheadfifths;
      positionData[selectedIndex] = checkData[item]?.position;
      lengthData[selectedIndex] = checkData[item].PcLength;
    });

    if (cDilation.some((dilation) => dilation >= 4)) {
      setActionLine(true);
    }

    let checkDilationIndex = cDilation.findIndex((dilation) => dilation !== null && dilation >= 4);

    const checkDilationIndexIncrease = checkDilationIndex + 1;

    if (checkDilationIndex !== -1) {
      actionLinePoints = new Array(checkDilationIndexIncrease - 1)?.fill(null);
      let twoHourAgoIndex = checkDilationIndex + 4;
      hourAgoArray = new Array(twoHourAgoIndex).fill(null);
    }
    setCDilationData(cDilation);
    setAboveBrimData(aboveBrimData);
    setPosition(positionData);
    setLength(lengthData);
    setActionLineData(actionLinePoints);
    setHourAgoData(hourAgoArray);
  };

  useEffect(() => {
    getAllData();
  }, [actionLineData?.length]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,

    layout: {
      padding: {
        top: 10,

        left: 9,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          filter: function (item) {
            return item.text !== undefined;
          },
        },
      },
      title: {
        display: false,
        text: 'Progress of Labour',
      },
    },
    scales: {
      'left-y-axis': {
        display: false,
        position: 'right',
      },
      x: {
        ticks: {
          display: false,
        },
        drawTicks: true,
      },

      y: {
        title: {
          display: true,
          text: 'Cervical Dilations & Cervical Length (cm)',
        },

        min: 0,
        max: 10,
      },
    },
  };

  const positionPoints = position.map((positionImage) => {
    const yourImage = new Image();
    yourImage.width = 25;
    yourImage.height = 25;
    yourImage.src = positions.find((singlePosition) => singlePosition.name === positionImage)?.image;
    return yourImage;
  });

  const dilationPoint = new Image();
  dilationPoint.width = 10;
  dilationPoint.height = 10;
  dilationPoint.src = '/assets/images/positions/cancel.png';

  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: `Cervical Dilation`,
        type: 'line',
        data: cDilationData,
        borderColor: 'gray',
        backgroundColor: '#808080',
        spanGaps: true,
        pointStyle: dilationPoint,
        order: 1,
      },
      {
        label: 'Cervical Length',
        type: 'bar',
        data: length,
        borderColor: '#BDC918',
        backgroundColor: '#BDC918',
        order: 2,
      },
      {
        label: 'Presenting Part',
        type: 'line',
        data: aboveBrim,
        spanGaps: true,
        backgroundColor: 'green',
        borderColor: 'transparent',
        pointStyle: positionPoints,
        order: 0,
      },
      actionLine
        ? {
            label: 'Alert Line',
            type: 'line',
            data: [...actionLineData, 4, 5, 6, 7, 8, 9, 10],
            borderColor: 'black',
            backgroundColor: 'black',
            pointRadius: 0,
            order: 3,
          }
        : {},
      actionLine
        ? {
            label: 'Action Line',
            type: 'line',
            data: [...hourAgoData, 4, 5, 6, 7, 8, 9, 10],
            pointRadius: 0,
            borderColor: 'red',
            backgroundColor: 'red',
            order: 4,
          }
        : {},
    ],
  };

  return (
    <>
      <div style={{ width: '80%', margin: 'auto', marginTop: 20 }}></div>
      <Line options={options} data={data} height={80} />
    </>
  );
};

export default LabourProgress;
