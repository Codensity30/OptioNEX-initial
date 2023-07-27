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

const CoiLineChart = ({ mode, symbol, checkedStrikes }) => {
  const [strikeData, setStrikeData] = useState({});

  useEffect(() => {
    // Define a function to fetch data for a specific strike
    const fetchDataForStrike = async (strike) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/sp-data/${symbol}/${strike}`
        );
        setStrikeData((prevData) => ({ ...prevData, [strike]: response.data }));
      } catch (error) {
        console.error(`Error fetching data for ${strike}:`, error);
      }
    };

    // Fetch data for all checked strikes
    checkedStrikes.forEach((strike) => fetchDataForStrike(strike));

    const intervalId = setInterval(() => {
      checkedStrikes.forEach((strike) => fetchDataForStrike(strike));
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [symbol, checkedStrikes]);

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
      <LineChart data={Object.values(strikeData)}>
        <XAxis
          dataKey="time"
          type="category"
          allowDuplicatedCategory={false}
          tickLine={false}
          tick={{ fill: fill }}
          padding={{ left: 30 }}
        />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: fill }}>
          <Label
            value={"PE - CE COI"}
            angle={-90}
            position={"insideLeft"}
            style={{ textAnchor: "middle" }}
            fill={fill}
          />
        </YAxis>
        <CartesianGrid strokeDasharray="1 1" vertical={false} />
        <Tooltip contentStyle={TooltipStyle} />
        <Legend iconType="triangle" />
        <ReferenceLine
          y={0}
          stroke="purple"
          label="Base"
          strokeDasharray="3 3"
        />

        {checkedStrikes.map((strike, index) => (
          <Line
            key={index}
            strokeWidth={2}
            type="monotone"
            dataKey="oidiff"
            data={strikeData[strike] || []}
            name={strike}
            stroke={`hsl(${(index * 80) % 360}, 70%, 50%)`}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CoiLineChart;
