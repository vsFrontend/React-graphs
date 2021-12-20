import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";

const PulseRate = () => {
  
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
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },

    markers: {
      size: 1
    },
    xaxis: {
      categories: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30','03:00', '03:30', '04:00', 
      '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00', '24:30'],
    }
  };

  return (
    <div>
      <h2 className="heading">Fetal Heart Rate</h2>
      <ReactApexChart 
        options={options} 
        series={series} 
        type="line" 
        height={350} 
      />
    </div>
  )
};
export default PulseRate;
