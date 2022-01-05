import React, { useState, useEffect, useRef } from 'react';
import pattern from 'patternomaly';
import { Bar, Line } from 'react-chartjs-2';
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
        backgroundColor[selectedIndex] = pattern.draw('dot', '#ffffff', '#000000', 10);
      }
      if (durationItem >= 20 && durationItem <= 40) {
        backgroundColor[selectedIndex] = pattern.draw('diagonal-right-left', '#ffffff', '#000000', 10);
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
        type: 'bar',
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
    layout: {
      padding: {
        left: 12,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
            color: 'rgba(255,99,132,0.2)',
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            color: 'rgba(255,99,132,0.2)',
          },
        },
      ],
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Contractions',
        },
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
  };

  return (
    <>
      <div style={{ width: '100%', margin: 'auto' }}>
        {/* <h2 className="heading">Contraction Per 10 Minutes</h2> */}
        <Line options={options} data={data} height={80} ref={chartRef} />
      </div>
    </>
  );
};

export default Contractions;
