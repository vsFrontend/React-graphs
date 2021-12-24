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
          text: 'Blood pressure',
        },
        min: 0,
        max: 200,
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
      <h2 className="heading">Fetal heart rate</h2>
      <ReactApexChart
        options={optionsSet}
        series={seriesSet}
        height={400}
      />
    </div>
  )

//   const [mdBP, setMdbp] = useState([]);
//   const [msBP, setMsBp] = useState([]);

//   useEffect(() => {
//     let getData = [];
//     let getMsBpData = []
//     const result = localStorage.getItem("MyData") || "{}";
//     const checkData = JSON.parse(result);

//     const convertToArray = Object.values(checkData);
//     convertToArray.map(item => {
//       getData.push(item.MdBP);
//     });

//     convertToArray.map(item => {
//       getMsBpData.push(item.MsBP);
//     });

//     setMdbp(getData);
//     setMsBp(getMsBpData);
//   }, []);

//  const series = [
//     {
//       name: "High - BP",
//       data: mdBP
//     },
//     {
//       name: "Low - BP",
//       data: msBP
//     },
//     {
//       data:
//       [null , null, null, null, null, null, null, null,null , null, null, null,, null, null, null, null, null , null, null, null, null, null, null, null,null , null, null, null,, null, null, null, null, null , null, null, null, null, null, null, null,null , null, null, null,, null]
//     }
//   ];

//   const options = {
//     chart: {
//       height: 350,
//       type: 'line',
//       zoom: {
//         enabled: false
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'straight'
//     },
    
//     grid: {
//       row: {
//         colors: ['#f3f3f3', 'transparent'],
//         opacity: 0.5
//       },
//     },

//     markers: {
//       size: 1
//     },
//     yaxis: {
//       title: {
//         text: 'Temperature'
//       },
//       min: 5,
//       max: 40
//     },
//     xaxis: {
//       categories: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30','03:00', '03:30', '04:00', 
//       '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00', '24:30'],
//     }
//   };

//   return (
//     <div>
//       <h2 className="heading">Fetal Heart Rate </h2>
//       <ReactApexChart 
//         options={options} 
//         series={series} 
//         type="line" 
//         height={350} 
//       />
//     </div>
//   )
}
export default HeartRate;