import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { initialNullArray, xAxisLabels } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HeartRate = () => {
  const [pulseRate, setPulseRate] = useState(initialNullArray);
  const getAllData = async () => {
    let pulseData = [...pulseRate];

    const result = (await localStorage.getItem('MyData')) || '{}';
    const checkData = JSON.parse(result);

    Object.keys(checkData).map((item) => {
      const selectedIndex = xAxisLabels.findIndex((label) => item === label);
      pulseData[selectedIndex] = checkData[item].Fhr;
    });
    setPulseRate(pulseData);
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
    },
    scales: {
      y: {
        title: {
          text: 'Pulse',
        },
        suggestedMin: 100,
        suggestedMax: 200,
      },
    },
  };

  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: 'Fetal Heart',
        data: pulseRate,
        borderColor: '#000000',
        backgroundColor: '#000000',
        spanGaps: true,
      },
    ],
  };

  return (
    <div>
      <h2 className="heading">Fetal Conditon</h2>
      <Line options={options} data={data} height={80} />
    </div>
  );
};

export default HeartRate;
