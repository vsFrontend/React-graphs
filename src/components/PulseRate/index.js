import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const initialNullArray = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
const xAxisLabels = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'];

const PulseRate = () => {
  const [cDilationData, setCDilationData] = useState(initialNullArray);
  const [length, setLength] = useState(initialNullArray);

  const [actionLine, setActionLine] = useState(false);
  const [actionLineData, setActionLineData] = useState([]);
  const [hourAgoData, setHourAgoData] = useState([]);

  const getAllData = async () => {
    let cDilation = [...cDilationData];
    let lengthData = [...length];
    let actionLinePoints = [];
    let hourAgoArray = [];
    const result = await localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);
    
    Object.keys(checkData).map(item => {
      const selectedIndex = xAxisLabels.findIndex(label => item === label)
      cDilation[selectedIndex] = checkData[item].CDilation;
      lengthData[selectedIndex] = checkData[item].PcLength;
    });

    if (cDilation?.includes(4)) {
      setActionLine(true)
    }
    let actionLineIndex = cDilation?.findIndex(a => a === 4);
    if (actionLineIndex !== -1) {
      actionLinePoints = new Array(actionLineIndex || 1)?.fill(null);
      let twoHourAgoIndex = actionLineIndex + 4;
      hourAgoArray = new Array(twoHourAgoIndex || 1).fill(null);
    }
    setCDilationData(cDilation);
    setLength(lengthData);
    setActionLineData(actionLinePoints);
    setHourAgoData(hourAgoArray);
  }

  useEffect(() => {
    getAllData();
  }, [actionLineData?.length]);

  const seriesSet = [
    {
      name: 'Chart',
      type: 'line',
      data: initialNullArray,
    },
    {
      name: 'Dilation',
      type: 'line',
      data: cDilationData
    }, {
      name: 'Length',
      type: 'line',
      data: length
    }
    , actionLine ? {
      name: 'Action',
      type: 'line',
      data: [...actionLineData, 4, 5, 6, 7, 8, 9, 10]
    } : {},
    actionLine ? {
      name: "Alert",
      type: 'line',
      data: [...hourAgoData, 4, 5, 6, 7, 8, 9, 10]
    } : {},
  ];

  const optionsSet = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      zoom: {
        enabled: false,
      }
    },
    stroke: {
      width: [4, 6, 5, 5, 3],
      curve: ['straight', 'straight', 'stepline', 'straight', 'straight']
    },
    annotations: {
      // position: 'front' ,
      points: cDilationData.map((item, i) => {
        return (
          {
            x: item,
            y: item,

            images: {
              path: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
              width: 20,
              height: 20,
              // offsetX: item * 100,
              // offsetY:item * 100,
            }
          }
        )
      })
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
      type: 'categories',
      categories: xAxisLabels,
    },
    yaxis: {
      title: {
        text: 'Centimeter',
      },
      min: 0,
      max: 10
    },
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
      <h2 className="heading">Fetal Pulse Rate </h2>
      <ReactApexChart
        options={optionsSet}
        series={seriesSet}
        type="line"
        height={350}
      />
    </div>
  )
};

export default PulseRate;