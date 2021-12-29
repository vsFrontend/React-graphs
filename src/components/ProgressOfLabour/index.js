import React, { useEffect, useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { positions, initialNullArray, xAxisLabels } from '../../utils/constants';

const ProgressOfLabour = () => {
  const chartRef = useRef();
  const [cDilationData, setCDilationData] = useState(initialNullArray);
  const [length, setLength] = useState(initialNullArray);
  const [aboveBrim, setAboveBrimData] = useState(initialNullArray);
  const [position, setPosition] = useState(initialNullArray);

  const [actionLine, setActionLine] = useState(false);
  const [actionLineData, setActionLineData] = useState([]);
  const [hourAgoData, setHourAgoData] = useState([]);

  const getAllData = async () => {
    let cDilation = [...cDilationData];
    let lengthData = [...length];
    let aboveBrimData = [...aboveBrim];
    let positionData = [...position];
    let actionLinePoints = [];
    let hourAgoArray = [];
    const result = await localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);

    Object.keys(checkData).map(item => {
      const selectedIndex = xAxisLabels.findIndex(label => item === label)
      cDilation[selectedIndex] = checkData[item].CDilation;
      aboveBrimData[selectedIndex] = checkData[item]?.Pfheadfifths;
      positionData[selectedIndex] = checkData[item]?.position;
      lengthData[selectedIndex] = checkData[item].PcLength;
    });

    if (cDilation.some(dilation => dilation >= 4)) {
      setActionLine(true);
    }

    const cDilationFilterdData =
      cDilation.filter(dilation => dilation >= 4 || dilation === null);
    const checkDilationIndex =
      cDilationFilterdData.findIndex(dilation => dilation !== null && dilation >= 4);

    if (checkDilationIndex !== -1) {
      actionLinePoints = new Array(checkDilationIndex || 1)?.fill(null);
      let twoHourAgoIndex = checkDilationIndex + 4;
      hourAgoArray = new Array(twoHourAgoIndex || 1).fill(null);
    }
    setCDilationData(cDilation);
    setAboveBrimData(aboveBrimData);
    setPosition(positionData);
    setLength(lengthData);
    setActionLineData(actionLinePoints);
    setHourAgoData(hourAgoArray);
  }

  const checkDataa = () => {
    for(let i = 1; i <= chartRef.current.chart.ctx.w.globals.series[0].length; i++){
      
      chartRef.current.chart.addPointAnnotation({
          x: chartRef.current.chart.w.config.series[0].data[i - 1],
          y: chartRef.current.chart.w.config.series[0].data[i - 1],
          image: '/assets/images/positions/OA.png'
      })
    }
  }

  useEffect(() => {
    getAllData();

    chartRef.current.chart.render().then(() => {
      for (let i = 1; i <= chartRef.current.chart.ctx.w.globals.series[1].length; i++) {
        const datapoint = chartRef.current.chart.ctx.w.config.series[1].data[i];

        console.log("datapoint", xAxisLabels[datapoint])
    
        const img1 =
          "https://upload.wikimedia.org/wikipedia/commons/f/f2/Pinterest_Shiny_Icon.svg";
    
        const img2 =
          "/assets/images/positions/cancel.png";
    
          chartRef.current.chart.addPointAnnotation({
          x: xAxisLabels[datapoint] -1,
          y: datapoint,
          marker: {
            size: 1
          },
          image: {
            path:  img2,
            offsetY: 3
          }
        });
      }
    });
  }, [actionLineData?.length]);

  const annotationObj = {};
  xAxisLabels.map((item, index) => {
    annotationObj[item] = {
      aboveBrim: aboveBrim[index],
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
      type: 'bar',
      data: length
    },
    {
      name: 'Presenting Part',
      type: 'line',
      data: aboveBrim
    },
    actionLine ? {
      name: 'Alert Line',
      type: 'line',
      data: [...actionLineData, 4, 5, 6, 7, 8, 9, 10]
    } : {},
    actionLine ? {
      name: "Action Line",
      type: 'line',
      data: [...hourAgoData, 4, 5, 6, 7, 8, 9, 10]
    } : {},
  ];

  const optionsSet = {
    chart: {
      stacked: false,
      zoom: {
        enabled: false,
      }
    },

    stroke: {
      width: [4, 6, 0, 4, 3, 3],
      colors: ['#57AB27', '#57AB27', '#D9B91B', '#0A17B8', '#000000', '#FF0000'],
      curve: ['straight', 'straight', 'straight', 'straight', 'straight', 'straight']
    },
    colors: ['#57AB27', '#57AB27', '#D9B91B', '#0A17B8', '#000000', '#FF0000'],
    
    legend: {
      position: 'top',
      width: 0,
      height: 0,

      showForNullSeries: false,
      showForSingleSeries: false,
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: false
      },
      formatter: function (seriesName, opts) {
        if (seriesName === "Presenting Part") {
          return [`<img style="height: 20px; width: 20px;" src="/assets/images/positions/OA.png" />`, seriesName,]
        }
        else {
          return [seriesName]
        }
      }
    },
    annotations: {
      points: Object.keys(annotationObj).map(item => {
        console.log("item------------->", item)
        return (
          {
            x: annotationObj[item].aboveBrim ? item : 0,
            y: annotationObj[item].aboveBrim,
            marker: {
              size: 1
            },
            image: {
              path: positions.find(singlePosition => singlePosition.name === annotationObj[item].position)?.image,
              width: 25,
              height: 25,
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
        text: 'Centimeters',
      },
      min: 0,
      max: 10,
    },
    markers: {
      size: [0, 7],
      colors: undefined,
      strokeColors: '#fff',
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
     
      shape: ["","square"],
      radius: 0,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: false,
      hover: {
        size: undefined,
        sizeOffset: 3
      }
  },
    tooltip: {
      enabledOnSeries: [1, 2, 3],
      shared: false,
      intersect: true,
      y: {
        formatter: y => {
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
      {/* {checkDataa()} */}
      

      <ReactApexChart
        options={optionsSet}
        series={seriesSet}
        height={400}
        ref={chartRef}
      />
    </div>
  )
};

export default ProgressOfLabour;