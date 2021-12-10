import React from "react";
import { PULSE_DATA } from "../../utils";
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

const PulseRate = () => {
  return (
    <>
      <h2 className="heading">Fetal Pulse Rate </h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={730}
          height={250}
          data={PULSE_DATA}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis />
          <YAxis
            tickCount={15}
            domain={[60, 200]}
            dataKey="value"
            interval={"preserveStartEnd"}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pulserate"
            stopColor="#3cb371"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default PulseRate;
