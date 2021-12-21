import React, {useEffect, useState} from "react";
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
};

export default DescentOfHead;
