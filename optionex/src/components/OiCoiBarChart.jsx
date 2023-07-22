import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ReferenceLine,
} from "recharts";

const OiCoiBarChart = ({ mode, symbol, expiryDate, oicoi }) => {
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/live-oicoi-ex/${symbol}/${expiryDate}`
        );
        setData(response.data);
        setIsDataFetched(true);
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
    mode === "light" ? "rgba(255, 255, 255, 0.4)" : "rgba(56, 56, 56, 0.4)";
  const TooltipCursor = mode === "light" ? "#f2f2f2" : "#404040";

  const TooltipStyle = {
    background: toolbg,
    borderRadius: "10px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(200, 200, 200, 0.4)",
  };

  if (!isDataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <BarChart width={1000} height={500} data={data} barCategoryGap={"20%"}>
      <XAxis dataKey="strikePrice" tickLine={false} tick={{ fill: fill }} />
      <YAxis
        tickLine={false}
        axisLine={false}
        type="number"
        tick={{ fill: fill }}
      >
        <Label
          value={oicoi === "OI" ? "Open Intrest" : "Change in OI"}
          angle={-90}
          position={"insideLeft"}
          fill={fill}
        />
      </YAxis>
      <CartesianGrid strokeDasharray="1 1" vertical={false} />
      <Tooltip contentStyle={TooltipStyle} cursor={{ fill: TooltipCursor }} />
      <Legend iconType="triangle" />
      <ReferenceLine x={data[0].atm} stroke="grey" strokeDasharray="3 3" />
      <Bar
        name={`PUTS ${oicoi}`}
        dot={false}
        type="monotone"
        dataKey={oicoi === "OI" ? "putsOi" : "putsCoi"}
        fill="#03C988"
        unit={" L"}
      />
      <Bar
        name={`CALLS ${oicoi}`}
        dot={false}
        type="monotone"
        dataKey={oicoi === "OI" ? "callsOi" : "callsCoi"}
        fill="#FF8787"
        unit={" L"}
      />
    </BarChart>
  );
};

export default OiCoiBarChart;
