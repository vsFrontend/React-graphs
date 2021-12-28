import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import {initialNullArray, xAxisLabels} from '../../utils/constants'

const Contractions = () => {
  const [barChartData, setBardChartData] = useState(initialNullArray);

  const getAllData = async () => {
    let barChartDataValue = [...barChartData];
    const result = await localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);
    
    Object.keys(checkData).map(item => {
      const selectedIndex = xAxisLabels.findIndex(label => item === label)
      barChartDataValue[selectedIndex] = checkData[item].Pcfrequency;
    });
    
    setBardChartData(barChartDataValue);
  }

  useEffect(() => {
    getAllData();
  }, []);

  const series = [{
    data: initialNullArray
  },{
    name: 'Frequency',
    data: barChartData
  }];

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },

    legend: {
      enabled: false,
      showForNullSeries: false,
      showForSingleSeries: false,
      
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: false
      },
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
    colors:['#000'],
    
    xaxis: {
      categories: xAxisLabels,
    },
    yaxis: {
      title: {
        text: 'Contractions'
      },
      min: 0,
      max: 100,
    }
  };

  return (
    <>
      <h2 className="heading">Contraction Per 10 Minute</h2>
      <ReactApexChart
        type="bar"
        options={options}
        series={series}
        height={400}
      />
    </>
  );
};

export default Contractions;