import React, { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import Loader from "./Loader";
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
  ResponsiveContainer,
} from "recharts";

const OiCoiBarChart = ({ mode, symbol, expiryDate, oicoi }) => {
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsDataFetched(false);
        const response = await axios.get(
          `${config.apiurl}/live-oicoi-ex/${symbol}/${expiryDate}`
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
  }, [symbol, expiryDate]);

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
    return (
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Loader />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="98%" height="100%">
      <BarChart data={data} barCategoryGap={"20%"}>
        <XAxis dataKey="strikePrice" tickLine={false} tick={{ fill: fill }} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={["auto", "auto"]}
          type="number"
          tick={{ fill: fill }}
        >
          <Label
            style={{ textAnchor: "middle" }}
            value={oicoi === "OI" ? "Open Intrest" : "Change in OI"}
            angle={-90}
            position={"insideLeft"}
            fill={fill}
          />
        </YAxis>
        <CartesianGrid strokeDasharray="1 1" vertical={false} />
        <Tooltip contentStyle={TooltipStyle} cursor={{ fill: TooltipCursor }} />
        <Legend iconType="triangle" />
        <ReferenceLine x={data[0].atm} stroke={fill} strokeDasharray="2 3" />
        <Bar
          name={`Put ${oicoi}`}
          dot={false}
          type="monotone"
          dataKey={oicoi === "OI" ? "putsOi" : "putsCoi"}
          fill="#63d168"
          unit={" L"}
        />
        <Bar
          name={`Call ${oicoi}`}
          dot={false}
          type="monotone"
          dataKey={oicoi === "OI" ? "callsOi" : "callsCoi"}
          fill="#e96767"
          unit={" L"}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OiCoiBarChart;
