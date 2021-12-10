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

const descentofData = [
    {
      name: "Page A",
      value: "4",
      min: 0,
      max: null,
      heartrate: 100,
    },
    {
      name: "Page B",
      value: "5",
      min: "1",
      max: null,
      heartrate: 100,
    },
    {
      name: "Page C",
      value: "6",
      min: 2,
      max: null,
      heartrate: 116,
    },
    {
      name: "Page D",
      value: "7",
      min: 3,
      max: null,
      heartrate: 139,
    },
    {
      name: "Page E",
      value: "8",
      min: 4,
      max: null,
      heartrate: 100,
    },
    {
      name: "Page F",
      value: "9",
      min: 5,
      max: null,
      heartrate: 100,
    },
    {
      name: "Page G",
      value: "10",
      min: 6,
      max: 2,
      heartrate: 100,
    },
    {
      name: "Page f",
      value: "11",
      min: 7,
      max: 3,
      heartrate: 177,
    },
    {
      name: "Page h",
      value: "12",
      min: 8,
      max: 4,
      heartrate: 139,
    },
    {
      name: "Page h",
      value: "13",
      min: 9,
      max: 5,
      heartrate: 143,
    },
    {
      name: "Page h",
      value: "14",
      min: 10,
      max: 6,
      heartrate: 134,
    },
    {
      name: "Page h",
      value: "15",
      min: 11,
      max: 7,
      heartrate: 127,
    },
    {
      name: "Page h",
      value: "16",
      min: 12,
      max: 8,
      heartrate: 110,
    },
    {
      name: "Page h",
      value: "17",
      min: 13,
      max: 9,
      heartrate: 115,
    },
    {
      name: "Page h",
      value: "18",
      min: 14,
      max: 10,
      heartrate: 100,
    },
    {
      name: "Page h",
      value: "19",
      min: 15,
      max: 11,
      heartrate: 155,
    },
    {
      name: "Page h",
      value: "20",
      min: 16,
      max: 11,
      heartrate: 140,
    },
    {
      name: "Page h",
      value: "21",
      min: 17,
      max: 12,
      heartrate: 112,
    },
    {
      name: "Page h",
      value: "22",
      min: 18,
      max: 13,
      heartrate: 120,
    },
    {
      name: "Page h",
      value: "23",
      min: 19,
      max: 14,
      heartrate: 130,
    },
    {
      name: "Page h",
      value: "24",
      min: 20,
      max: 15,
      heartrate: 140,
    },
    {
      name: "Page h",
      value: "25",
      min: 21,
      max: 16,
      heartrate: 150,
    },
    {
      name: "Page h",
      value: "26",
      min: 22,
      max: 17,
      heartrate: 135,
    },
    {
      name: "Page h",
      value: "27",
      min: 23,
      max: 18,
      heartrate: 145,
    },
    {
      name: "Page h",
      value: "28",
      min: 24,
      max: 19,
      heartrate: 177,
    },
    {
      name: "Page h",
      value: "29",
      min: 25,
      max: 20,
      heartrate: 166,
    },
    {
      name: "Page h",
      value: "30",
      min: 26,
      max: 21,
      heartrate: 156,
    },
    {
      name: "Page h",
      value: "31",
      min: 27,
      max: 22,
      heartrate: 144,
    },
    {
      name: "Page h",
      value: "32",
      min: 28,
      max: 23,
      heartrate: 143,
    },
    {
      name: "Page h",
      value: "33",
      min: 29,
      max: 24,
      heartrate: 122,
    },
    {
      name: "Page h",
      value: "36",
      min: 30,
      max: 25,
      heartrate: 118,
    },
  ];
  

const DescentOfHead = () => {
  return (
    <>
      <h2 className="heading">Descent of head </h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={730}
          height={250}
          data={descentofData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis dataKey="min" interval={"preserveStartEnd"} />
          <YAxis
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            domain={[0, 10]}
            dataKey="value"
            interval={"preserveStartEnd"}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stopColor="#3cb371"
            strokeWidth={4}
          />
          <Line
            type="monotone"
            dataKey="max"
            stopColor="#3cb371"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default DescentOfHead;
