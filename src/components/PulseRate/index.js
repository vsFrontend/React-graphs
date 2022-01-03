import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { initialNullArray, positions, xAxisLabels } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const PulseRate = () => {
  const [msBpData, setMsBpData] = useState(initialNullArray);
  const [mdBpData, setMdBpData] = useState(initialNullArray);
  const [pulseRateData, setPulseRateData] = useState(initialNullArray);
  const [isCountArray, setCountArray] = useState(false);
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

    let filteredArray = [];
    filteredArray = msBpDataValue.filter((item) => item !== null);
    if (filteredArray.length > 1) {
      setCountArray(true);
    }
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
  downArrowImage.height = 25;
  downArrowImage.width = 25;

  const upArrowImage = new Image();
  upArrowImage.src = '/assets/images/positions/up-arrow.png';
  upArrowImage.height = 25;
  upArrowImage.width = 25;

  const options = {
    responsive: true,
    tooltips: {
      mode: 'intersect',
    },

    plugins: {
      labels: {
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
        position: 'top',
      },
    },
    scales: {
      y: {
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
      <h2 className="heading">Maternal Condition</h2>
      <Line options={options} data={data} height={80} />
    </div>
  );
};

export default PulseRate;
