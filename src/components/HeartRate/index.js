import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const HeartRate = () => {

  const [mdBP, setMdbp] = useState([]);
  const [msBP, setMsBp] = useState([]);

  useEffect(() => {
    let getData = [];
    let getMsBpData = []
    const result = localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);

    const convertToArray = Object.values(checkData);
    convertToArray.map(item => {
      getData.push(item.MdBP);
    });

    convertToArray.map(item => {
      getMsBpData.push(item.MsBP);
    });

    setMdbp(getData);
    setMsBp(getMsBpData);
  }, []);

 const series = [
    {
      name: "Hig - BP",
      data: mdBP
    },
    {
      name: "Low - BP",
      data: msBP
    },
    {
      data:
      [null , null, null, null, null, null, null, null,null , null, null, null,, null, null, null, null, null , null, null, null, null, null, null, null,null , null, null, null,, null, null, null, null, null , null, null, null, null, null, null, null,null , null, null, null,, null]
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },

    markers: {
      size: 1
    },
    xaxis: {
      categories: ['00:00', '00:30', '1:00', '1:30', '2:00', '2:30','3:00', '3:30', '4:00', 
      '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00', '24:30'],
    }
  };

  return (
    <div>
      <h2 className="heading">Fetal Heart Rate </h2>
      <ReactApexChart 
        options={options} 
        series={series} 
        type="line" 
        height={350} 
      />
    </div>
  )
}
export default HeartRate;