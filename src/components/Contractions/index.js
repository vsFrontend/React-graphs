import React, {useState, useEffect} from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
  } from "recharts";
import { Tooltip } from "antd";

const Contractions = () => {
  const [barChartData, setBardChartData] = useState([]);

  useEffect(() => {
    const result = localStorage.getItem("MyData") || "{}";
    const checkData = JSON.parse(result);
    const convertToArray = Object.values(checkData);

    const array = [];
    convertToArray.map(item => {
      if (item.Pcfrequency > 40 ){
        array.push({'high': item.Pcfrequency})
      } else {
        array.push({'low': item.Pcfrequency})
      }
    });;
    setBardChartData(array);
  }, []);

  return (
    <>
      <h2 className="heading">Contraction per 10 minute</h2>
      
      <ResponsiveContainer width="100%" aspect="2">
        <BarChart stackOffset="sign" width={730} height={250} data={barChartData}>
          <CartesianGrid   />
          <XAxis />
          <Tooltip/>
          <YAxis
            tickCount={80}
            domain={[1, 100]}
            interval={"preserveStartEnd"}
          />
            <Bar dataKey="low" fill={"green"} /> 
            <Bar dataKey="high" fill={"gray"} /> 
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default Contractions;
