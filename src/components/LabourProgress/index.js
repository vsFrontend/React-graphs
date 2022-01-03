import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { positions, initialNullArray, xAxisLabels } from '../../utils/constants';

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

    const cDilationFilterdData = cDilation.filter((dilation) => dilation >= 4 || dilation === null);
    let checkDilationIndex = cDilationFilterdData.findIndex((dilation) => dilation !== null && dilation >= 4);

    const checkDilationIndexIncrease = checkDilationIndex + 1;

    if (checkDilationIndex !== -1) {
      actionLinePoints = new Array(checkDilationIndexIncrease || 1)?.fill(null);
      let twoHourAgoIndex = checkDilationIndex + 4;
      hourAgoArray = new Array(twoHourAgoIndex || 1).fill(null);
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
    plugins: {
      legend: {
        position: 'top',
        labels: {
          filter: function (item) {
            return item.text !== undefined;
          },
        },
      },
      title: {
        display: true,
        text: 'Progress of Labour',
      },
    },
    scales: {
      y: {
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
      },
      {
        label: 'Cervical Length',
        type: 'bar',
        data: length,
        borderColor: '#BDC918',
        backgroundColor: '#BDC918',
      },
      {
        label: 'Presenting Part',
        type: 'line',
        data: aboveBrim,
        spanGaps: true,
        backgroundColor: 'green',
        borderColor: 'green',
        pointStyle: positionPoints,
      },
      actionLine
        ? {
            label: 'Alert Line',
            type: 'line',
            data: [...actionLineData, 4, 5, 6, 7, 8, 9, 10],
            borderColor: 'black',
            backgroundColor: 'black',
            pointRadius: 0,
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
          }
        : {},
    ],
  };

  return (
    <>
      <div style={{ width: '100%', margin: 'auto' }}>
        <h2 className="heading">Progress of Labour</h2>
        <Line options={options} data={data} height={80} />
      </div>
    </>
  );
};

export default LabourProgress;
