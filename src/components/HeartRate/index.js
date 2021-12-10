import React from "react";
import { HEART_RATE_DATA } from "../../utils";
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

const HeartRate = () => {
    return(
        <>
            <h2 className="heading">Fetal Heart Rate </h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={730}
          height={250}
          data={HEART_RATE_DATA}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis />
          <YAxis
            tickCount={25}
            domain={[80, 200]}
            dataKey="value"
            interval={"preserveStartEnd"}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="max"
            stroke="#ff0000"
            strokeWidth={6}
          />
          <Line
            type="monotone"
            dataKey="min"
            stroke="#ffa500"
            strokeWidth={6}
          />
          <Line
            type="monotone"
            dataKey="heartrate"
            stopColor="#3cb371"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
        </>
    )
}
export default HeartRate;