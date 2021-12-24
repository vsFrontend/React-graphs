import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import {initialNullArray, xAxisLabels} from '../../utils/constants'

const Contractions = () => {
  const [barChartData, setBardChartData] = useState(initialNullArray);
  const [gradientColor, setGradientColor] = useState(false)

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

  const filteredBarChartData = barChartData?.filter(barChartRecord => barChartRecord !== null)

  useEffect(() => {
    getAllData();
    barChartData.map(item => {
      if (item === 5) {
        setGradientColor(true)
      } else {
        setGradientColor(false)
      }
    })
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
    colors:['#000'],
    
    xaxis: {
      categories: xAxisLabels,
    },
    yaxis: {
      min: 0,
      max: 100,
    }
  };

  

  return (
    <>
      <h2 className="heading">Contraction per 10 minute</h2>
      {console.log("filter", filteredBarChartData)}
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </>
  );
};
export default Contractions;
