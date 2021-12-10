import React from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
  } from "recharts";

const pulsedata = [
    {
      name: "Page A",
      value: "80",
      min: 280,
      max: 230,
      pulserate: 90,
      changeofValue: 4,
    },
    {
      name: "Page B",
      value: "90",
      min: 380,
      max: 130,
      pulserate: 80,
      changeofValue: 8,
    },
    {
      name: "Page C",
      value: "100",
      min: 290,
      max: 130,
      pulserate: 116,
      changeofValue: 9,
    },
    {
      name: "Page D",
      value: "120",
      min: 80,
      max: 130,
      pulserate: 129,
      changeofValue: 2,
    },
    {
      name: "Page E",
      value: "120",
      min: 80,
      max: 130,
      pulserate: 120,
      changeofValue: 8,
    },
    {
      name: "Page F",
      value: "130",
      min: 80,
      max: 130,
      pulserate: 100,
      changeofValue: 19,
    },
    {
      name: "Page G",
      value: "140",
      min: 80,
      max: 130,
      pulserate: 120,
      changeofValue: 10,
    },
    {
      name: "Page f",
      value: "150",
      min: 80,
      max: 130,
      pulserate: 117,
      changeofValue: 2,
    },
    {
      name: "Page h",
      value: "160",
      min: 80,
      max: 130,
      pulserate: 119,
      changeofValue: 100,
    },
    {
      name: "Page h",
      value: "170",
      min: 80,
      max: 130,
      pulserate: 123,
      changeofValue: 99,
    },
    {
      name: "Page h",
      value: "180",
      min: 80,
      max: 130,
      pulserate: 104,
      changeofValue: 8,
    },
    {
      name: "Page h",
      value: "190",
      min: 80,
      max: 130,
      pulserate: 87,
      changeofValue: 2,
    },
    {
      name: "Page h",
      value: "200",
      min: 80,
      max: 130,
      pulserate: 90,
      changeofValue: 3,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 115,
      changeofValue: 3,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 100,
      changeofValue: 99,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 129,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 110,
      changeofValue: 77,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 112,
      changeofValue: 99,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 120,
      changeofValue: 55,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 130,
      changeofValue: 22,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 80,
      changeofValue: 8,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 100,
      changeofValue: 8,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 120,
      changeofValue: 8,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 130,
      changeofValue: 66,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 90,
      changeofValue: 33,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 119,
      changeofValue: 8,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 116,
      changeofValue: 8,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 88,
      changeofValue: 44,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 99,
      changeofValue: 44,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 122,
      changeofValue: 2,
    },
    {
      name: "Page h",
      value: "210",
      min: 80,
      max: 130,
      pulserate: 118,
      changeofValue: 3,
    },
  ];

const Contractions = () => {
  return (
    <>
      <h2 className="heading">Conditional bar chart</h2>
      <ResponsiveContainer width="100%" aspect="3">
        <BarChart stackOffset="sign" width={730} height={250} data={pulsedata}>
          <CartesianGrid />
          <XAxis />
          <YAxis
            tickCount={80}
            domain={[0, 1000]}
            interval={"preserveStartEnd"}
          />

          <Bar dataKey="min" fill={"green"} />
          <Bar dataKey="max" fill={"lightBlue"} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default Contractions;
