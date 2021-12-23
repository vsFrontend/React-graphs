import React, {useEffect, useState} from "react";
import { DESCENT_OF_HEAD } from "../../utils";
import ReactApexChart from "react-apexcharts";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const DescentOfHead = () => {

  const [barChartData, setBardChartData] = useState([]);

  useEffect(() => {
    const result = localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);
    const convertToArray = Object.values(checkData);

    const array = [] ;

    array.push(convertToArray);

    
   
    setBardChartData(convertToArray);
  }, []);
  return (
    <>
      <h2 className="heading">Descent of head </h2>
      {console.log("sadsad", barChartData)}
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={730}
          height={250}
          data={barChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis />
          <YAxis
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="CDilation"
            stopColor="#3cb371"
            strokeWidth={4}
          />
         
        </LineChart>
      </ResponsiveContainer>
    </>
  );

  // const [pulse, setPulse] = useState([]);

  // useEffect(() => {
  //   let getData = [];

  //   const result = localStorage.getItem("MyData") || "{}";
  //   const checkData = JSON.parse(result);

  //   const convertToArray = Object.values(checkData);
  //   convertToArray.map(item => {
  //     getData.push(item.CDilation);
  //   });

  //   setPulse(getData);
  // }, []);

  // const series = [
  //   {
  //     name: "Pulse Rate",
  //     data: pulse
  //   },
  //   {
  //     data:
  //       [null, null, null, null, null, null, null, null, null, null, null, null, , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, , null]
  //   }
  // ];

  // const options = {
  //   chart: {
  //     height: 350,
  //     type: 'line',
  //     zoom: {
  //       enabled: false
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   stroke: {
  //     curve: 'straight'
  //   },

  //   grid: {
  //     row: {
  //       colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //       opacity: 0.5
  //     },
  //   },

  //   markers: {
  //     size: 1
  //   },
  //   yaxis:{
  //     categories:['1', '2', '3', '4', '5', '6', '7', '8', '9']
  //   },
  //   xaxis: {
  //     categories: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00',
  //       '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00', '24:30'],
  //   }
  // };

  // return (
  //   <div>
  //     <h2 className="heading">Descent of head</h2>
  //     <ReactApexChart
  //       options={options}
  //       series={series}
  //       type="line"
  //       height={350}
  //     />
  //   </div>
  // )
};

export default DescentOfHead;
