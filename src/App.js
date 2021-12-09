import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceArea,
  Legend,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Cell,
  ReferenceLine,
} from "recharts";
import "./App.css";

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

const pulsedata = [
  {
    name: "Page A",
    value: "80",
    min: 80,
    max: 130,
    pulserate: 90,
  },
  {
    name: "Page B",
    value: "90",
    min: 80,
    max: 130,
    pulserate: 80,
  },
  {
    name: "Page C",
    value: "100",
    min: 80,
    max: 130,
    pulserate: 116,
  },
  {
    name: "Page D",
    value: "120",
    min: 80,
    max: 130,
    pulserate: 129,
  },
  {
    name: "Page E",
    value: "120",
    min: 80,
    max: 130,
    pulserate: 120,
  },
  {
    name: "Page F",
    value: "130",
    min: 80,
    max: 130,
    pulserate: 100,
  },
  {
    name: "Page G",
    value: "140",
    min: 80,
    max: 130,
    pulserate: 120,
  },
  {
    name: "Page f",
    value: "150",
    min: 80,
    max: 130,
    pulserate: 117,
  },
  {
    name: "Page h",
    value: "160",
    min: 80,
    max: 130,
    pulserate: 119,
  },
  {
    name: "Page h",
    value: "170",
    min: 80,
    max: 130,
    pulserate: 123,
  },
  {
    name: "Page h",
    value: "180",
    min: 80,
    max: 130,
    pulserate: 104,
  },
  {
    name: "Page h",
    value: "190",
    min: 80,
    max: 130,
    pulserate: 87,
  },
  {
    name: "Page h",
    value: "200",
    min: 80,
    max: 130,
    pulserate: 90,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 115,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 100,
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
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 112,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 120,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 130,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 80,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 100,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 120,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 130,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 90,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 119,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 116,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 88,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 99,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 122,
  },
  {
    name: "Page h",
    value: "210",
    min: 80,
    max: 130,
    pulserate: 118,
  },
];

function App() {
  return (
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

      <h2 className="heading">Fetal Pulse Rate </h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={730}
          height={250}
          data={pulsedata}
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

      <h2 className="heading">Conditional bar chart</h2>
      <ResponsiveContainer width="100%" aspect="3">
        <BarChart width={730} height={250} data={pulsedata}>
        <CartesianGrid />
          <XAxis />
          <YAxis
            tickCount={80}
            domain={[0, 1000]}
            interval={"preserveStartEnd"}
          />
          <Bar dataKey="value" fill="#00aeff" 
                {...pulsedata.map((entry, index) => (
                  <Cell fill={entry.value === "5" ? '#290a0a' : '#005599' }/>
              ))}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default App;
