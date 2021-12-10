import React from "react";

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

const heartRateData = [
    {
      name: "Page A",
      value: "4",
      min: 100,
      max: 180,
      heartrate: 100,
    },
    {
      name: "Page B",
      value: "8",
      min: 100,
      max: 180,
      heartrate: 100,
    },
    {
      name: "Page C",
      value: "2",
      min: 100,
      max: 180,
      heartrate: 116,
    },
    {
      name: "Page D",
      value: "3",
      min: 100,
      max: 180,
      heartrate: 139,
    },
    {
      name: "Page E",
      value: "2",
      min: 100,
      max: 180,
      heartrate: 100,
    },
    {
      name: "Page F",
      value: "5",
      min: 100,
      max: 180,
      heartrate: 100,
    },
    {
      name: "Page G",
      value: "1.3",
      min: 100,
      max: 180,
      heartrate: 100,
    },
    {
      name: "Page f",
      value: "1.5",
      min: 100,
      max: 180,
      heartrate: 177,
    },
    {
      name: "Page h",
      value: "2.2",
      min: 100,
      max: 180,
      heartrate: 139,
    },
    {
      name: "Page h",
      value: "2.5",
      min: 100,
      max: 180,
      heartrate: 143,
    },
    {
      name: "Page h",
      value: "1",
      min: 100,
      max: 180,
      heartrate: 134,
    },
    {
      name: "Page h",
      value: "6",
      min: 100,
      max: 180,
      heartrate: 127,
    },
    {
      name: "Page h",
      value: "1.3",
      min: 100,
      max: 180,
      heartrate: 110,
    },
    {
      name: "Page h",
      value: "1.2",
      min: 100,
      max: 180,
      heartrate: 115,
    },
    {
      name: "Page h",
      value: "1.9",
      min: 100,
      max: 180,
      heartrate: 100,
    },
    {
      name: "Page h",
      value: "2.4",
      min: 100,
      max: 180,
      heartrate: 155,
    },
    {
      name: "Page h",
      value: "4.2",
      min: 100,
      max: 180,
      heartrate: 140,
    },
    {
      name: "Page h",
      value: "5",
      min: 100,
      max: 180,
      heartrate: 112,
    },
    {
      name: "Page h",
      value: "3.9",
      min: 100,
      max: 180,
      heartrate: 120,
    },
    {
      name: "Page h",
      value: "3.3",
      min: 100,
      max: 180,
      heartrate: 130,
    },
    {
      name: "Page h",
      value: "6",
      min: 100,
      max: 180,
      heartrate: 140,
    },
    {
      name: "Page h",
      value: "10",
      min: 100,
      max: 180,
      heartrate: 150,
    },
    {
      name: "Page h",
      value: "110",
      min: 100,
      max: 180,
      heartrate: 135,
    },
    {
      name: "Page h",
      value: "10",
      min: 100,
      max: 180,
      heartrate: 145,
    },
    {
      name: "Page h",
      value: "10.3",
      min: 100,
      max: 180,
      heartrate: 177,
    },
    {
      name: "Page h",
      value: "210",
      min: 100,
      max: 180,
      heartrate: 166,
    },
    {
      name: "Page h",
      value: "210",
      min: 100,
      max: 180,
      heartrate: 156,
    },
    {
      name: "Page h",
      value: "210",
      min: 100,
      max: 180,
      heartrate: 144,
    },
    {
      name: "Page h",
      value: "210",
      min: 100,
      max: 180,
      heartrate: 143,
    },
    {
      name: "Page h",
      value: "210",
      min: 100,
      max: 180,
      heartrate: 122,
    },
    {
      name: "Page h",
      value: "210",
      min: 100,
      max: 180,
      heartrate: 118,
    },
  ];

const HeartRate = () => {
    return(
        <>
            <h2 className="heading">Fetal Heart Rate </h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={730}
          height={250}
          data={heartRateData}
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