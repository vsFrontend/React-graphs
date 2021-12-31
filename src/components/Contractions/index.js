import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import { initialNullArray, xAxisLabels } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
let backgroundColor = [initialNullArray];

const Contractions = () => {
  const chartRef = useRef();
  const [barChartData, setBardChartData] = useState(initialNullArray);
  const [durationValue, setDurationValue] = useState(initialNullArray);
  const [colorData, setColorData] = useState(initialNullArray);

  const getAllData = async () => {
    let barChartDataValue = [...barChartData];
    let durationData = [initialNullArray];
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);
    const convertArrayData = Object.values(checkData);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      barChartDataValue[selectedIndex] = checkData[item].Pcfrequency;
      setColorData[selectedIndex] = checkData[item].Pcduration;
      if (checkData[item].Pcduration > 19) {
        backgroundColor[selectedIndex] = 'gray';
      }
      if (checkData[item].Pcduration < 19) {
        backgroundColor[selectedIndex] = '#424242';
      }
      if (checkData[item].Pcduration > 45) {
        backgroundColor[selectedIndex] = 'black';
      }
      // durationData.push(checkData[item].Pcduration);
    });

    setBardChartData(barChartDataValue);
    setDurationValue(durationData);
    // setColorData(backgroundColor);
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
    display: true,
    datasets: [
      {
        label: 'Contraction Per 10 Minute',
        redraw: true,
        data: barChartData,

        backgroundColor: backgroundColor,
        pointHoverRadius: 10,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'red',
        pointBackgroundColor: 'black',
        hoverBackgroundColor: 'black',
        barPercentage: 1,
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
        min: 0,
        max: 5,
      },
    },
    // plugins: [barAvatar],

    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Contraction',
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
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
      title: {
        display: true,
        text: 'Contraction Per 10 Minute',
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
      {/* {console.log('chart ref', chartRef.current.ctx)} */}
      <Bar options={options} data={data} height={60} ref={chartRef} />
    </>
  );
};

export default Contractions;
