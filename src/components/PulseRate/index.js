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

  const img = new Image();
  img.src = '/assets/images/positions/up-arrow.png';
  img.height = 25;
  img.width = 25;

  const options = {
    responsive: true,

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
      title: {
        display: true,
        text: 'Maternal Condition',
      },

      annotation: {
        annotations: {
          pentagon: {
            type: 'polygon',
            xValue: 1,
            yValue: 60,
            sides: 5,
            radius: 60,
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  const data = {
    labels: xAxisLabels,

    datasets: [
      {
        label: '',
        data: [400],
        borderColor: 'white',
        backgroundColor: 'white',
        pointHoverRadius: 10,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'white',
      },
      {
        label: 'highBp',
        redraw: true,
        data: msBpData,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointHoverRadius: 10,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'red',
        pointBackgroundColor: 'black',
        spanGaps: true,
        pointStyle: img,
      },
      {
        label: 'lowBP',
        data: mdBpData,
        borderColor: 'green',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointHoverRadius: 10,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'green',
        spanGaps: true,
        pointStyle: downArrowImage,
      },
      {
        label: 'Pulse',
        data: pulseRateData,
        borderColor: 'pink',
        backgroundColor: 'pink',
        pointHoverRadius: 6,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'yellow',
        spanGaps: true,
      },
    ],
  };

  const seriesSet = [
    {
      name: 'Chart',
      type: 'line',
      data: initialNullArray,
    },
    {
      name: 'Pulse',
      type: 'line',
      data: pulseRateData,
    },
    {
      name: 'highBp',
      type: 'line',
      data: msBpData,
    },
    {
      name: 'lowBP',
      type: 'line',
      data: mdBpData,
    },
  ];

  const optionsSet = {
    chart: {
      type: 'line',
      stacked: false,
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: [0, 6, 6, 6],
      curve: ['straight', 'straight', 'straight', 'straight'],
    },
    legend: {
      position: 'top',
      showForNullSeries: false,
      showForSingleSeries: false,
      onItemClick: {
        toggleDataSeries: false,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    dataLabels: {
      enabled: true,
      // enabledOnSeries: [2, 3]
    },

    annotations: {
      points: Object.keys(annotationObj).map((item) => {
        return {
          x: annotationObj[item].mdBpDataIndex ? item : null,
          y: annotationObj[item].mdBpDataIndex,
          marker: {
            size: 1,
          },
          image: {
            path: '/assets/images/positions/downarrow.png',
            width: 25,
            height: 25,
            offsetY: 0,
            offsetX: 10,
          },
        };
      }),
    },

    dataLabels: {
      enabled: true,
      enabledOnSeries: [2],
      style: {
        colors: ['#fff'],
        fontSize: '22px',
      },

      background: {
        enabled: true,
        foreColor: '#000',
        padding: 0,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45,
        },
      },

      formatter: function (val, { seriesIndex, dataPointIndex, w }) {
        console.log('w.globals.seriesNames[2]', w.globals.seriesNames, val);
        if (val === null) {
          return '';
        } else if (w.globals.seriesNames[2] === 'highBp') {
          return '↑';
        }
      },
    },

    grid: {
      borderColor: 'gray',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      title: {
        text: 'Time Intervals (24hr)',
      },
      type: 'categories',
      categories: xAxisLabels,
    },
    yaxis: [
      {
        title: {
          text: 'Pulse and BP',
        },
        min: 0,
        max: 220,
      },
    ],
    tooltip: {
      enabledOnSeries: [1, 2, 3, 4],
      enabled: isCountArray ? true : false,
      shared: true,
      intersect: false,

      y: {
        formatter: function (y, x) {
          if (y) {
            return y.toFixed(0) + ' points';
          }
          return y;
        },
      },
    },
  };

  return (
    <div>
      <h2 className="heading">Maternal Condition</h2>
      <Line options={options} data={data} height={80} />
    </div>
  );
};

export default PulseRate;
