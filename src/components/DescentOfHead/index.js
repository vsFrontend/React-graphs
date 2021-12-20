import React from "react";
import { DESCENT_OF_HEAD } from "../../utils"
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
  return (
    <>
      <h2 className="heading">Descent of head</h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={730}
          height={250}
          data={DESCENT_OF_HEAD}
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
