import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import { initialNullArray, xAxisLabels } from '../../utils/constants';



const PulseRate = () => {

  const [pulseRate, setPulseRate] = useState(initialNullArray);  
  const getAllData = async () => {
    let pulseData = [...pulseRate];

    const result = await localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);
    
    Object.keys(checkData).map(item => {
      const selectedIndex = xAxisLabels.findIndex(label => item === label)
      pulseData[selectedIndex] = checkData[item].Mpulse;
    });
    setPulseRate(pulseData);
  }

  useEffect(() => {
    getAllData();
  }, []);

  const seriesSet = [
    {
      name: 'Chart',
      type: 'line',
      data: initialNullArray,
    },
    {
      name: 'Pulse Rate',
      type: 'line',
      data: pulseRate
    }
  ];

  const optionsSet = {
    chart: {
      type: 'line',
      stacked: false,
      zoom: {
        enabled: false,
      }
    },
    stroke: {
      width: [0, 6],
      curve: ['straight', 'straight']
    },
    legend: {
      position: 'top'
    },
   
    grid: {
      borderColor: 'gray',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
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
          text: 'Pulse Rate',
        },
        min: 0,
        max: 140,
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y, x) {
          if (y) {
            return y.toFixed(0) + " points";
          }
          return y;
        }
      }
    }
  };

  return (
    <div>
      <h2 className="heading">Pulse Rate</h2>
      <ReactApexChart
        options={optionsSet}
        series={seriesSet}
        height={400}
      />
    </div>
  )
};

export default PulseRate;
