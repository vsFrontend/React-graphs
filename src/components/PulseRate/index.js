import React, { useEffect, useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";

const PulseRate = () => {
  const [pulse, setPulse] = useState([]);
  const [length, setLength] = useState([]);

  const [actionLine, setActionLine] = useState(false);
  const [nullArrayData, setNullArrayData] = useState([]);
  const [hourAgoData, setHourAgoData] = useState([]);


  const getAllData = async () => {
    let getData = [];
    let lengthData = [];
    let nullArray = [];
    let hourAgoArray = [];
    const result = await localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);
    const convertToArray = Object.values(checkData || []);
    
    convertToArray.map(item => {
      getData.push(item.CDilation);
      lengthData.push(item.PcLength);
    });

    if (getData?.includes(4)) {
      setActionLine(true)
    }
    let actionLineIndex = getData?.findIndex(a => a === 4);
    if (actionLineIndex !== -1) {
      nullArray = new Array(actionLineIndex || 1)?.fill(null);
      // nullArray[actionLineIndex] = null;
      let twoHourAgoIndex = actionLineIndex + 4;
      hourAgoArray = new Array(twoHourAgoIndex || 1).fill(null);
    }
    setPulse(getData);
    setLength(lengthData);
    setNullArrayData(nullArray);
    setHourAgoData(hourAgoArray);
    // setTimeAxisData(timeAxis)
  }

  useEffect(() => {
    getAllData();
  }, [nullArrayData?.length]);


  const seriesSet = [
    {
      name: 'Chart',
      type: 'line',
      data:
        [null, null, null, null, null, null, null, null, null, null, null, null, , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    },
    {
      name: 'Dilation',
      type: 'line',
      data: pulse
    }, {
      name: 'Length',
      type: 'line',
      data: length
    }
    , actionLine ? {
      name: 'Action',
      type: 'line',
      data: [...nullArrayData, 4, 5, 6, 7, 8, 9, 10]
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
        // type: 'xy'
      }
    },
    stroke: {
      width: [4, 6, 5, 5, 3],
      // colors: ['#F44336', '#E91E63', '#9C27B0', '#9C27C0'],
      curve: ['straight', 'straight', 'stepline', 'straight', 'straight']
    },


    annotations: {
      // position: 'front' ,

      points: pulse.map((item, i) => {
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
    // labels: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00',
    //   '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00', '24:30'
    // ],




    // markers: {
    //   discrete: {
    //     seriesIndex: 0,
    //     dataPointIndex: 7,
    //     fillColor: 'red',
    //     strokeColor: '#fff',
    //     size: 5,
    //     shape: "rect" // "circle" | "square" | "rect"
    //   }

    //   // type: 'image',

    //   // image: {
    //   //   src: ['https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'],
    //   //   width: 40,
    //   //   height: 40,
    //   // },

    // },

    // dot:{
    //   type: 'image',

    //   image: {
    //     src: ['https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'],
    //     width: 40,
    //     height: 40,
    //   },
    // },
    // legend: {
    //   position: 'top',
    //   horizontalAlign: 'right',
    //   floating: true,
    //   offsetY: -25,
    //   offsetX: -5
    // },


    xaxis: {
      type: 'categories',
      categories: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00',
        '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00', '24:30'],

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