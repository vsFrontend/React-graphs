import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar, Line, Chart } from 'react-chartjs-2';
import { initialNullArray, positions, xAxisLabels } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const PulseRate = () => {
  const [msBpData, setMsBpData] = useState(initialNullArray);
  const [mdBpData, setMdBpData] = useState(initialNullArray);
  const [pulseRateData, setPulseRateData] = useState(initialNullArray);

  const getAllData = async () => {
    let msBpDataValue = [...msBpData];
    let mdBpDataValue = [...mdBpData];
    let pulseRateValue = [...pulseRateData];
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      msBpDataValue[selectedIndex] = checkData[item].MsBP;
      mdBpDataValue[selectedIndex] = checkData[item].MdBP;
      pulseRateValue[selectedIndex] = checkData[item].Mpulse;
    });
    setMsBpData(msBpDataValue);
    setMdBpData(mdBpDataValue);
    setPulseRateData(pulseRateValue);
  };

  const annotationObj = {};
  xAxisLabels.map((item, index) => {
    annotationObj[item] = {
      msBpDataIndex: msBpData[index],
      mdBpDataIndex: mdBpData[index],
    };
  });

  const annotationObjData = {};
  xAxisLabels.map((item, index) => {
    annotationObjData[item] = {
      mdBpDataIndex: mdBpData[index],
    };
  });

  useEffect(() => {
    getAllData();
  }, []);

  const downArrowImage = new Image();
  downArrowImage.src = '/assets/images/positions/down-arrow.png';
  downArrowImage.height = 15;
  downArrowImage.width = 12;

  const upArrowImage = new Image();
  upArrowImage.src = '/assets/images/positions/up-arrow.png';
  upArrowImage.height = 15;
  upArrowImage.width = 12;

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: {
      labels: {
        display: false,
        render: 'image',
        textMargin: 10,
        images: [
          {
            src: '/assets/images/positions/cancel.png',
            width: 20,
            height: 20,
          },
          null,
          {
            src: '/assets/images/positions/cancel.png',
            width: 20,
            height: 20,
          },
          null,
        ],
      },
      legend: {
        display: false,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: false,
          },
        },
      ],
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Pulse and Blood Pressure',
        },
        min: 60,
        max: 180,
      },
    },
  };

  const data = {
    labels: xAxisLabels,

    datasets: [
      {
        label: 'highBp',
        data: msBpData,
        borderColor: 'black',
        backgroundColor: 'black',
        spanGaps: true,
        pointStyle: upArrowImage,

        fill: '+1',
      },
      {
        label: 'lowBP',
        data: mdBpData,
        borderColor: 'black',
        backgroundColor: 'black',
        spanGaps: true,
        pointStyle: downArrowImage,
        fill: true,
      },
      {
        label: 'Pulse',
        data: pulseRateData,
        borderColor: 'black',
        backgroundColor: 'black',
        spanGaps: true,
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} height={80} />
    </div>
  );
};

export default PulseRate;
