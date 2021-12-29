import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { initialNullArray, xAxisLabels } from '../../utils/constants';

const HeartRate = () => {
  const [pulseRate, setPulseRate] = useState();
  const [arrayCount, setArrayCount] = useState(false);
  const [timeDataSet, setTimeData] = useState([]);
  const getAllData = async () => {
    let pulseData = [];
    const timeData = [];

    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    console.log('result', checkData);

    Object.keys(checkData).map((item) => {
      console.log('maop', checkData[item].Fhr);
      pulseData.push(checkData[item].Fhr);
      timeData.push(item);
      // pulseData.push()
    });

    // Object.keys(checkData).map((item) => {
    //   const selectedIndex = xAxisLabels.findIndex((label) => item === label);
    //   pulseData[selectedIndex] = checkData[item].Fhr;
    // });
    setPulseRate(pulseData);
    setTimeData(timeData);

    // let getCountData = [];
    // getCountData = pulseData?.filter((item) => item !== null);
    // if (getCountData.length > 1) {
    //   setArrayCount(true);
    // }
  };

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
      name: 'bpm',
      type: 'line',
      data: pulseRate,
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
      width: [6, 6],
      curve: ['straight', 'straight'],
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
      categories: timeDataSet,
    },
    yaxis: [
      {
        title: {
          text: 'bpm',
        },
        min: 0,
        max: 140,
      },
    ],

    tooltip: {
      enabled: arrayCount ? true : false,
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
      <h2 className="heading">Fetal Conditon</h2>
      <ReactApexChart options={optionsSet} series={seriesSet} height={400} />
    </div>
  );
};

export default HeartRate;
