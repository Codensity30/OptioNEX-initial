import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Loader from "./Loader";
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
  const [early, setEarly] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    setIsDataFetched(false);
  }, [symbol]);

  useEffect(() => {
    let intervalId;
    let fetchedStrikeCnt = 0;
    const fetchDataForStrike = async (strike) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_Api_URL}/sp-data/${symbol}/${strike}`
        );
        if (response.data && response.data === "Wait for market opening") {
          setIsDataFetched(true);
          setEarly(true);
          return;
        }
        setStrikeData((prevData) => ({ ...prevData, [strike]: response.data }));
        fetchedStrikeCnt++;
        if (fetchedStrikeCnt === checkedStrikes.length) {
          setIsDataFetched(true);
        }
      } catch (error) {
        console.error(`Error fetching data for ${strike}:`, error);
      }
    };

    const scheduleNextCall = () => {
      const now = DateTime.now().setZone("Asia/Kolkata");
      const minutes = now.minute;

      // Calculate the delay until the next minute immediately following one divisible by 5
      const nextMinuteDivisibleBy5 = (Math.floor(minutes / 5) + 1) * 5;
      const delay = (nextMinuteDivisibleBy5 - minutes) * 60000;

      // Schedule the next call after the calculated delay
      intervalId = setTimeout(() => {
        checkedStrikes.forEach((strike) => fetchDataForStrike(strike));
        // After the call, schedule the next one
        scheduleNextCall();
      }, delay + 20000); // Add 1 minute to the delay to call at the next minute
    };

    // Call fetchDataForStrike for each checked strike when the component is mounted
    checkedStrikes.forEach((strike) => fetchDataForStrike(strike));

    // Schedule the initial call
    scheduleNextCall();

    // Clear the timeout when the component unmounts
    return () => {
      clearTimeout(intervalId);
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

  if (!isDataFetched) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (early) {
    setEarly(false);
    return (
      <div style={{ height: "95%", marginTop: "5%" }}>
        <div style={{ height: "80%" }}>
          <img
            src={require(`../images/early_${mode}.png`)}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              margin: "auto",
              objectFit: "contain",
              opacity: 0.7,
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "Comic Sans MS, 'Arial Rounded MT Bold', sans-serif",
            color: "gray",
          }}
        >
          Just hold on! Our OI buildup data starts pouring in just 5 minutes
          after the opening bell rings.
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="98%" height="100%">
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
            unit=" L"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CoiLineChart;
