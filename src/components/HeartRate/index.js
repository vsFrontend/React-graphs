import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { initialNullArray, xAxisLabels } from '../../utils/constants';

const HeartRate = () => {
  const [msBpData, setMsBpData] = useState(initialNullArray);
  const [mdBpData, setMdBpData] = useState(initialNullArray);  
  const getAllData = async () => {
    let msBpDataValue = [...msBpData];
    let mdBpDataValue = [...mdBpData]
    const result = await localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);
    
    Object.keys(checkData).map(item => {
      const selectedIndex = xAxisLabels.findIndex(label => item === label)
      msBpDataValue[selectedIndex] = checkData[item].MsBP;
      mdBpDataValue[selectedIndex] = checkData[item].MdBP;
    });
    setMsBpData(msBpDataValue);
    setMdBpData(mdBpDataValue)
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
      name: 'High BP',
      type: 'line',
      data: msBpData
    },
    {
      name: 'Low BP',
      type: 'line',
      data: mdBpData
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
      width: [0, 6, 6],
      curve: ['straight', 'straight', 'straight']
    },
    legend: {
      position: 'top',
      showForNullSeries: false,
      showForSingleSeries: false
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
          text: 'Blood Pressure',
        },
        min: 0,
        max: 220,
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
      <h2 className="heading">Fetal Heart Rate</h2>
      <ReactApexChart
        options={optionsSet}
        series={seriesSet}
        height={400}
      />
    </div>
  );
};

export default HeartRate;