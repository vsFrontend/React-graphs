import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { initialNullArray, xAxisLabels } from '../../utils/constants';

ChartJS.register({
  id: 'linePlugin',
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  afterDraw: (chart) => {
    if (chart.id === 1) {
      const highBpPoints = chart?._metasets?.[0]?.data
        .filter(({ skip }) => !skip)
        .map(({ x, y }) => {
          return {
            x,
            y1: y,
          };
        });
      const lowBpPoints = chart?._metasets?.[1]?.data
        .filter(({ skip }) => !skip)
        .map(({ x, y }) => {
          return {
            x,
            y2: y,
          };
        });

      const syncedPoints = highBpPoints.map((item, i) => Object.assign({}, item, lowBpPoints[i]));
      const ctx = chart.ctx;
      syncedPoints.map(({ x, y1, y2 }) => {
        ctx.beginPath();
        ctx.lineTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.restore();
      });
    }
  },
});

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
  downArrowImage.height = 10;
  downArrowImage.width = 12;

  const upArrowImage = new Image();
  upArrowImage.src = '/assets/images/positions/up-arrow.png';
  upArrowImage.height = 10;
  upArrowImage.width = 12;

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    layout: {
      padding: {
        left: 4,
      },
    },
    plugins: {
      labels: {
        display: true,
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
      x: {
        fontSize: 4,
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
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: 'highBp',
        data: msBpData,

        backgroundColor: 'black',
        spanGaps: true,
        pointStyle: upArrowImage,
        type: 'scatter',
      },
      {
        label: 'lowBP',
        data: mdBpData,
        backgroundColor: 'black',
        spanGaps: true,
        pointStyle: downArrowImage,
        type: 'scatter',
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
    <div id="chart">
      <Line options={options} data={data} height={80} />
    </div>
  );
};

export default PulseRate;
