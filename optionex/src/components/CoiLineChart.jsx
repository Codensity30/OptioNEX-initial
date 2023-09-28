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

const CoiLineChart = ({ mode, symbol, type }) => {
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedData = sessionStorage.getItem(symbol); // Attempt to get data from local storage
        let parsedData = storedData ? JSON.parse(storedData) : null;
        // Check if data is in local storage and meets the conditions for freshness
        if (
          parsedData &&
          parsedData.length > 0 &&
          isDataFresh(parsedData[0]) // Check the freshness of the first data element
        ) {
          // Data is in local storage and fresh, use it
          parsedData.reverse();
          setData(parsedData);
        } else {
          // Data is not in local storage or not fresh, fetch from API
          const response = await axios.get(
            `${process.env.REACT_APP_Api_URL}/total-coi/${symbol}`
          );
          setData(response.data);
          response.data.reverse();
          sessionStorage.setItem(symbol, JSON.stringify(response.data));
        }
        setIsDataFetched(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); // immediately call when the component is mounted
    const intervalId = setInterval(fetchData, 60000); // Fetch data every minute

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [symbol]);

  // Define a function to check if the data is fresh based on conditions
  function isDataFresh(data) {
    if (!data || !data.time) {
      // If there's no "time" property in the data, consider it not fresh
      return false;
    }

    // Convert the "time" string to a Luxon DateTime object in the "Asia/Kolkata" time zone
    const dataTime = DateTime.fromFormat(data.time, "HH:mm", {
      zone: "Asia/Kolkata",
    });
    // Get the current time in the "Asia/Kolkata" time zone
    const currentTime = DateTime.now().setZone("Asia/Kolkata");

    // Check if the data is fresh based on conditions
    return (
      (dataTime.hour === 15 && dataTime.minute === 30) ||
      isWithinFiveMinutes(currentTime, dataTime)
    );
  }

  function isWithinFiveMinutes(currentTime, dataTime) {
    const timeDifference = currentTime.diff(dataTime, "minutes").minutes;
    return Math.abs(timeDifference) < 5;
  }

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
      <div style={{ display: "flex", alignItems: "center", height: "500px" }}>
        <Loader />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="98%" height="100%">
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
