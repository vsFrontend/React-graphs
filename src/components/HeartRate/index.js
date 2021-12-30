import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { initialNullArray, xAxisLabels } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HeartRate = () => {
  const [pulseRate, setPulseRate] = useState(initialNullArray);
  const [arrayCount, setArrayCount] = useState(false);
  const getAllData = async () => {
    let pulseData = [...pulseRate];

    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      pulseData[selectedIndex] = checkData[item].Fhr;
    });
    setPulseRate(pulseData);

    let getCountData = [];
    getCountData = pulseData?.filter((item) => item !== null);
    if (getCountData.length > 1) {
      setArrayCount(true);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
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
        data: [200],
        borderColor: 'white',
        backgroundColor: 'white',
        pointHoverRadius: 10,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'white',
      },
      {
        label: 'Fetal Heart',
        data: pulseRate,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointHoverRadius: 10,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'green',
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
      width: [0, 6],
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
      categories: xAxisLabels,
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
      <Line options={options} data={data} height={80} />
      {/* <ReactApexChart options={optionsSet} series={seriesSet} height={400} /> */}
    </div>
  );
};

export default HeartRate;
