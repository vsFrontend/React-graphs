import React, { useState, useEffect } from "react";
import {initialNullArray, xAxisLabels} from '../../utils/constants'
import ReactApexChart from "react-apexcharts";

const Contractions = () => {
  const [barChartData, setBardChartData] = useState([]);

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
  }, [])

  const series = [{
    data: initialNullArray
  },{
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
      categories: xAxisLabels,
    },
    yaxis: {
      min: 0,
      max: 100,
    }
  };

  useEffect(() => {
    const result = localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);
    const convertToArray = Object.values(checkData);

    const array = [];
    convertToArray.map(item => {
      if (item.Pcfrequency > 40) {
        array.push({ 'high': item.Pcfrequency })
      } else {
        array.push({ 'low': item.Pcfrequency })
      }
    });;
    setBardChartData(array);
  }, []);

  return (
    <>
      <h2 className="heading">Contraction per 10 minute</h2>


      <ReactApexChart options={options} series={series} type="bar" height={350} />

      {/* <ResponsiveContainer width="100%" aspect="2">
        <BarChart stackOffset="sign" width={730} height={250} data={barChartData}>
          <CartesianGrid />
          <XAxis />
          <Tooltip />
          <YAxis
            tickCount={80}
            domain={[1, 100]}
            interval={"preserveStartEnd"}
          />
          <Bar dataKey="low" fill={"green"} />
          <Bar dataKey="high" fill={"gray"} />
        </BarChart>
      </ResponsiveContainer> */}
    </>
  );
};
export default Contractions;
