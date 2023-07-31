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
  ResponsiveContainer,
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
  }, [symbol]);

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

  return (
    <ResponsiveContainer width="98%" height={500}>
      <LineChart data={data}>
        <XAxis
          dataKey="time"
          type="category"
          tickLine={false}
          tick={{ fill: fill }}
          padding={{ left: 30, right: 30 }}
        />
        <YAxis
          yAxisId="left"
          domain={["auto", "auto"]}
          tickLine={false}
          axisLine={false}
          tick={{ fill: fill }}
        >
          <Label
            value={type === "pcr" ? "PCR vs Time" : "COI vs Time"}
            style={{ textAnchor: "middle" }}
            angle={-90}
            position={"insideLeft"}
            fill={fill}
          />
        </YAxis>
        <CartesianGrid strokeDasharray="1 1" vertical={false} />
        <Tooltip contentStyle={TooltipStyle} />

        <Legend iconType="triangle" />

        {type === "pcr" ? (
          <>
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={["auto", "auto"]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: fill }}
            />
            <Line
              yAxisId="right"
              name="Spot"
              dot={false}
              type="monotone"
              dataKey="spot"
              stroke="#F1C93B"
              strokeWidth={2}
            />
            <Line
              yAxisId="left"
              name="PCR"
              dot={false}
              type="monotone"
              dataKey="pcr"
              stroke="#33a3e3"
              strokeWidth={2}
            />
          </>
        ) : (
          <>
            <ReferenceLine
              yAxisId="left"
              y={0}
              stroke="purple"
              label="Base"
              strokeDasharray="3 3"
            />
            <Line
              yAxisId="left"
              name="Puts COI"
              dot={false}
              type="monotone"
              dataKey="putsCoi"
              stroke="#63d168"
              strokeWidth={2}
              unit=" L"
            />
            <Line
              yAxisId="left"
              name="Calls COI"
              dot={false}
              type="monotone"
              dataKey="callsCoi"
              stroke="#e96767"
              strokeWidth={2}
              unit=" L"
            />
            <Line
              yAxisId="left"
              name="Difference"
              dot={false}
              type="monotone"
              dataKey="oidiff"
              stroke="#33a3e3"
              strokeWidth={2}
              unit=" L"
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CoiLineChart;
