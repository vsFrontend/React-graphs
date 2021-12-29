import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { initialNullArray, xAxisLabels } from '../../utils/constants';

const PulseRate = () => {
  const [msBpData, setMsBpData] = useState([]);
  const [mdBpData, setMdBpData] = useState([]);
  const [timeValue, setTimeValue] = useState([]);
  const [pulseRateData, setPulseRateData] = useState([]);
  const [isCountArray, setCountArray] = useState(false);
  const getAllData = async () => {
    let msBpDataValue = [];
    let mdBpDataValue = [];
    let timeDataArray = [];
    let pulseRateValue = [...pulseRateData];
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      msBpDataValue.push(checkData[item].MsBP);
      mdBpDataValue.push(checkData[item].MdBP);
      timeDataArray.push(item);
    });

    // Object.keys(checkData).map((item) => {
    //   const selectedIndex = xAxisLabels.findIndex((label) => item === label);
    //   msBpDataValue[selectedIndex] = checkData[item].MsBP;
    //   mdBpDataValue[selectedIndex] = checkData[item].MdBP;
    //   pulseRateValue[selectedIndex] = checkData[item].Mpulse;
    // });
    setMsBpData(msBpDataValue);
    setMdBpData(mdBpDataValue);
    setPulseRateData(pulseRateValue);
    setTimeValue(timeDataArray);

    // let filteredArray = [];
    // filteredArray = msBpDataValue.filter((item) => item !== null);
    // if (filteredArray.length > 1) {
    //   setCountArray(true);
    // }
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

  const seriesSet = [
    // {
    //   name: 'Chart',
    //   type: 'line',
    //   data: initialNullArray,
    // },
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
      categories: timeValue,
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
      <ReactApexChart options={optionsSet} series={seriesSet} height={400} />
    </div>
  );
};

export default PulseRate;
