import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ReferenceLine,
} from "recharts";

const CoiLineChart = ({ mode, symbol, type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/total-coi/${symbol}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fill = mode === "light" ? "#8c8c8c" : "#d9d9d9";
  const toolbg =
    mode === "light" ? "rgba(255, 255, 255, 0.2)" : "rgba(56, 56, 56, 0.2)";

  const TooltipStyle = {
    background: toolbg,
    borderRadius: "10px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(200, 200, 200, 0.4)",
  };

  if (type === "pcr") {
    return (
      <LineChart width={800} height={500} data={data}>
        <XAxis dataKey="time" tickLine={false} tick={{ fill: fill }} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: fill }}
          domain={["auto", "auto"]}
        >
          <Label
            value="PCR vs Time"
            angle={-90}
            position={"insideLeft"}
            fill={fill}
          />
        </YAxis>
        <CartesianGrid strokeDasharray="1 1" vertical={false} />
        <Tooltip contentStyle={TooltipStyle} />
        <ReferenceLine
          y={0}
          stroke="purple"
          label="Base"
          strokeDasharray="3 3"
        />
        <Legend iconType="triangle" />
        <Line
          name="PCR"
          dot={false}
          type="monotone"
          dataKey="pcr"
          stroke="#4FC0D0"
          strokeWidth={2}
        />
      </LineChart>
    );
  }

  return (
    <LineChart width={800} height={500} data={data}>
      <XAxis dataKey="time" tickLine={false} tick={{ fill: fill }} />
      <YAxis tickLine={false} axisLine={false} tick={{ fill: fill }}>
        <Label
          value="COI vs Time"
          angle={-90}
          position={"insideLeft"}
          fill={fill}
          domain={["auto", "auto"]}
        />
      </YAxis>
      <CartesianGrid strokeDasharray="1 1" vertical={false} />
      <Tooltip contentStyle={TooltipStyle} />
      <ReferenceLine y={0} stroke="purple" label="Base" strokeDasharray="3 3" />
      <Legend iconType="triangle" />
      <Line
        name="Puts COI"
        dot={false}
        type="monotone"
        dataKey="putsCoi"
        stroke="#03C988"
        strokeWidth={2}
      />
      <Line
        name="Calls COI"
        dot={false}
        type="monotone"
        dataKey="callsCoi"
        stroke="#FF8787"
        strokeWidth={2}
      />
      <Line
        name="Difference"
        dot={false}
        type="monotone"
        dataKey="oidiff"
        stroke="#F3AA60"
        strokeWidth={2}
      />
    </LineChart>
  );
};

export default CoiLineChart;
