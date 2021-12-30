import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import { initialNullArray, xAxisLabels } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Contractions = () => {
  const [barChartData, setBardChartData] = useState(initialNullArray);

  const getAllData = async () => {
    let barChartDataValue = [...barChartData];
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      barChartDataValue[selectedIndex] = checkData[item].Pcfrequency;
    });

    setBardChartData(barChartDataValue);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const series = [
    // {
    //   data: initialNullArray,
    // },
    {
      name: 'Frequency',
      data: barChartData,
    },
  ];

  const data = {
    labels: xAxisLabels,

    datasets: [
      {
        label: '',
        data: [5],
        borderColor: 'white',
        backgroundColor: 'white',
        pointHoverRadius: 10,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'white',
      },
      {
        label: 'Contraction Per 10 Minute',
        redraw: true,
        data: barChartData,
        borderColor: 'red',
        // backgroundColor: ['red', 'yellow', 'green', 'orange'],
        backgroundColor: ['red', 'yellow', 'green', 'orange'],
        pointHoverRadius: 10,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'red',
        pointBackgroundColor: 'black',
        spanGaps: true,
        hoverBackgroundColor: 'black',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    // plugins: [barAvatar],

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
        text: 'Contraction Per 10 Minute',
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

  // const options = {
  //   chart: {
  //     type: 'bar',
  //     // height: 350,
  //     width: '100%',
  //   },
  //   plotOptions: {
  //     bar: {
  //       borderRadius: 4,
  //       horizontal: false,
  //       width: 100,
  //     },
  //   },

  //   stroke: {
  //     show: true,
  //     // curve: 'smooth',
  //     // lineCap: 'butt',
  //     colors: undefined,
  //     width: 1,
  //     // dashArray: 0,
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },

  //   legend: {
  //     enabled: false,
  //     showForNullSeries: false,
  //     showForSingleSeries: false,

  //     onItemClick: {
  //       toggleDataSeries: false,
  //     },
  //     onItemHover: {
  //       highlightDataSeries: false,
  //     },
  //   },

  //   grid: {
  //     borderColor: 'gray',
  //     xaxis: {
  //       lines: {
  //         show: true,
  //       },
  //     },
  //     yaxis: {
  //       lines: {
  //         show: true,
  //       },
  //     },
  //   },
  //   colors: ['#000'],

  //   xaxis: {
  //     categories: xAxisLabels,
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Contractions',
  //     },
  //     min: 0,
  //     max: 5,
  //     tickAmount: 5,
  //   },
  //   fill: {
  //     colors: [
  //       function ({ value, seriesIndex, w }) {
  //         if (value > 30) {
  //           return '#000';
  //         } else {
  //           return '#808080';
  //         }
  //       },
  //     ],
  //     opacity: 1,
  //   },
  // };

  return (
    <>
      <h2 className="heading">Contraction Per 10 Minute</h2>
      <Bar options={options} data={data} height={60} />
      {/* <ReactApexChart type="bar" options={options} series={series} height={400} /> */}
    </>
  );
};

export default Contractions;
