import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const Contractions = () => {
  const [barChartData, setBardChartData] = useState([]);
  const [timeValue, setTimeValue] = useState([]);

  const getAllData = async () => {
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    let timeData = [];
    let frequencyData = [];

    Object.keys(checkData).map((item) => {
      frequencyData.push(checkData[item].Pcfrequency);
      timeData.push(item);
    });
    setBardChartData(frequencyData);
    setTimeValue(timeData);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const series = [
    {
      name: 'Frequency',
      data: barChartData,
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      width: '100%',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        width: 100,
      },
    },

    stroke: {
      show: true,
      // curve: 'smooth',
      // lineCap: 'butt',
      colors: undefined,
      width: 1,
      // dashArray: 0,
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      enabled: false,
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
    colors: ['#000'],

    xaxis: {
      categories: timeValue,
    },
    yaxis: {
      title: {
        text: 'Contractions',
      },
      min: 0,
      max: 5,
      tickAmount: 5,
    },
    fill: {
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value > 30) {
            return '#000';
          } else {
            return '#808080';
          }
        },
      ],
      opacity: 1,
    },
  };

  return (
    <>
      <h2 className="heading">Contraction Per 10 Minute</h2>
      <ReactApexChart type="bar" options={options} series={series} height={400} />
    </>
  );
};

export default Contractions;
