import React, { useState, useEffect, useRef } from 'react';
import pattern from 'patternomaly';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { initialNullArray, xAxisLabels } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
let backgroundColor = [initialNullArray];

const Contractions = () => {
  const chartRef = useRef();
  const [barChartData, setBardChartData] = useState(initialNullArray);

  const getAllData = async () => {
    let barChartDataValue = [...barChartData];
    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      barChartDataValue[selectedIndex] = checkData[item].Pcfrequency;
      const durationItem = checkData[item].Pcduration;
      if (durationItem < 20) {
        backgroundColor[selectedIndex] = pattern.draw('dot', '#ffffff', '#000000');
      }
      if (durationItem >= 20 && durationItem <= 40) {
        backgroundColor[selectedIndex] = pattern.draw('diagonal-right-left', '#ffffff', '#000000');
      }
      if (durationItem > 40) {
        backgroundColor[selectedIndex] = 'black';
      }
    });

    setBardChartData(barChartDataValue);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const data = {
    labels: xAxisLabels,
    display: true,
    datasets: [
      {
        label: 'Contraction Per 10 Minutes',
        redraw: true,
        data: barChartData,
        backgroundColor: backgroundColor,
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Contraction',
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
    },

    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Contraction Per 10 Minute',
      },
    },
  };

  return (
    <>
      <h2 className="heading">Contraction Per 10 Minute</h2>
      <Bar options={options} data={data} height={60} ref={chartRef} />
    </>
  );
};

export default Contractions;
