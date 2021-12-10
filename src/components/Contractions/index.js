import React from "react";
import{ CONTRACTIONS_DATA } from "../../utils";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
  } from "recharts";

const Contractions = () => {
  return (
    <>
      <h2 className="heading">Conditional bar chart</h2>
      <ResponsiveContainer width="100%" aspect="3">
        <BarChart stackOffset="sign" width={730} height={250} data={CONTRACTIONS_DATA}>
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
