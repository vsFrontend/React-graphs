import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { positions, initialNullArray, xAxisLabels } from '../../utils/constants';

const ProgressOfLabour = () => {
  const [cDilationData, setCDilationData] = useState(initialNullArray);
  const [length, setLength] = useState(initialNullArray);
  const [position, setPosition] = useState(initialNullArray);

  const [actionLine, setActionLine] = useState(false);
  const [actionLineData, setActionLineData] = useState([]);
  const [hourAgoData, setHourAgoData] = useState([]);

  const getAllData = async () => {
    let cDilation = [...cDilationData];
    let lengthData = [...length];
    let positionData = [...position];
    let actionLinePoints = [];
    let hourAgoArray = [];
    const result = await localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);
    
    Object.keys(checkData).map(item => {
      const selectedIndex = xAxisLabels.findIndex(label => item === label)
      cDilation[selectedIndex] = checkData[item].CDilation;
      positionData[selectedIndex] = checkData[item]?.position;
      lengthData[selectedIndex] = checkData[item].PcLength;
    });

    if (cDilation?.includes(4)) {
      setActionLine(true)
    }
    let actionLineIndex = cDilation?.findIndex(dilationPoint => dilationPoint === 4);
    if (actionLineIndex !== -1) {
      actionLinePoints = new Array(actionLineIndex || 1)?.fill(null);
      let twoHourAgoIndex = actionLineIndex + 4;
      hourAgoArray = new Array(twoHourAgoIndex || 1).fill(null);
    }
    setCDilationData(cDilation);
    setPosition(positionData);
    setLength(lengthData);
    setActionLineData(actionLinePoints);
    setHourAgoData(hourAgoArray);
  }

  useEffect(() => {
    getAllData();
  }, [actionLineData?.length]);

  const annotationObj = {};
  xAxisLabels.map((item, index) => {
    annotationObj[item] = {
      dilation: cDilationData[index],
      position: position[index],
    }
  });

  const seriesSet = [
    {
      name: 'Chart',
      type: 'line',
      data: initialNullArray,
    },
    {
      name: 'Cervical Dilation',
      type: 'line',
      data: cDilationData
    }, {
      name: 'Cervical Length',
      type: 'line',
      data: length
    }
    , actionLine ? {
      name: 'Action Line',
      type: 'line',
      data: [...actionLineData, 4, 5, 6, 7, 8, 9, 10]
    } : {},
    actionLine ? {
      name: "Alert Line",
      type: 'line',
      data: [...hourAgoData, 4, 5, 6, 7, 8, 9, 10]
    } : {},
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
      width: [4, 6, 6, 3, 3],
      curve: ['straight', 'straight', 'stepline', 'straight', 'straight']
    },
    legend: {
      position: 'top'
    },
    annotations: {
      points: Object.keys(annotationObj).map(item => {
        return (
          {
            x: annotationObj[item].dilation ? item : 0,
            y: annotationObj[item].dilation,
            marker: {
              size: 0
            },
            image: {
              path: positions.find(singlePosition => singlePosition.name === annotationObj[item].position)?.image,
              width: 30,
              height: 30,
              offsetY: 10
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
      title: {
        text: 'Time Intervals (24hr)',
      },
      type: 'categories',
      categories: xAxisLabels,
    },
    yaxis: {
      title: {
        text: 'Cervical Dilation (Centimeters)',
      },
      min: 0,
      max: 10,
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
      <h2 className="heading">Progress of Labour</h2>
      {console.log("length", cDilationData, length)}
      <ReactApexChart
        options={optionsSet}
        series={seriesSet}
        height={400}
      />
    </div>
  )
};

export default ProgressOfLabour;