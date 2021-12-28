import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import { initialNullArray, xAxisLabels } from '../../utils/constants';



const PulseRate = () => {


  const [msBpData, setMsBpData] = useState(initialNullArray);
  const [mdBpData, setMdBpData] = useState(initialNullArray);
  const [isCountArray, setCountArray] = useState(false);
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
    setMdBpData(mdBpDataValue);

    let filteredArray = [];
    filteredArray = msBpDataValue.filter(item => item !== null);
    if (filteredArray.length > 1) {
      setCountArray(true)
    }
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
      name: 'Pulse',
      type: 'line',
      data: msBpData
    },
    {
      name: 'High BP',
      type: 'bar',
      data: mdBpData
    }, 
    // {
    //   name: 'Low BP',
    //   type: 'bar',
    //   data: mdBpData
    // }
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
          text: 'Pulse and BP',
        },
        min: 0,
        max: 220,
      },
    ],
    tooltip: {
      enabled: isCountArray ? true : false,
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
      <h2 className="heading">Maternal Condition</h2>
      {console.log("isCountArray", isCountArray)}
      <ReactApexChart
        options={optionsSet}
        series={seriesSet}
        height={400}
      />
    </div>
  );
};

export default PulseRate;
