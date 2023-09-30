import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Loader from "./Loader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  SouthRounded,
  EastRounded,
  NorthRounded,
  KeyboardDoubleArrowDownRounded,
  KeyboardDoubleArrowUpRounded,
  TrendingUpRounded,
  TrendingDownRounded,
} from "@mui/icons-material";

const bg = {
  default: { light: "#C5DFF8", dark: "#395B64" },
  call: { light: "#FFD1DA", dark: "#800000" },
  put: { light: "#E8FFCE", dark: "#448000" },
  neutral: { light: "#FFFAD7", dark: "#807000" },
  callText: { light: "#ef5350", dark: "#d32f2f" },
  putText: { light: "#2e7d32", dark: "#4caf50" },
};

export default function BasicTable({ mode, symbol }) {
  const [data, setData] = useState([]);
  const [early, setEarly] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsDataFetched(false);
        let storedData = sessionStorage.getItem(symbol); // Attempt to get data from local storage
        let parsedData = storedData ? JSON.parse(storedData) : null;

        // Check if data is in local storage and meets the conditions for freshness
        if (
          parsedData &&
          parsedData.length > 0 &&
          isDataFresh(parsedData[0]) // Check the freshness of the first data element
        ) {
          // Data is in local storage and fresh, use it
          setData(parsedData);
        } else {
          // Data is not in local storage or not fresh, fetch from API
          const response = await axios.get(
            `${process.env.REACT_APP_Api_URL}/total-coi/${symbol}`
          );
          if (response.data && response.data === "Wait for market opening") {
            setIsDataFetched(true);
            setEarly(true);
            return;
          }
          response.data.reverse();
          setData(response.data);
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

    // to check whether trading is open or not
    function isWithinTradingTime(currentTime) {
      return (
        !(currentTime.weekday === 6 || currentTime.weekday === 7) &&
        currentTime.hour >= 9 &&
        currentTime.minute >= 15 &&
        (currentTime.hour < 15 ||
          (currentTime.hour === 15 && currentTime.minute <= 30))
      );
    }

    function isWithinFiveMinutes(currentTime, dataTime) {
      const timeDifference = currentTime.diff(dataTime, "minutes").minutes;
      return Math.abs(timeDifference) < 5;
    }

    // to check the data freshness
    function isDataFresh(data) {
      if (!data || !data.time) {
        return false;
      }
      const dataTime = DateTime.fromFormat(data.time, "HH:mm", {
        zone: "Asia/Kolkata",
      });
      const currentTime = DateTime.now().setZone("Asia/Kolkata");
      return (
        (!isWithinTradingTime(currentTime) &&
          dataTime.hour === 15 &&
          dataTime.minute === 30) ||
        isWithinFiveMinutes(currentTime, dataTime)
      );
    }
  }, [symbol]);

  if (!isDataFetched) {
    return (
      <div style={{ display: "flex", alignItems: "center", height: "500px" }}>
        <Loader />
      </div>
    );
  }

  if (early) {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ background: bg.default[mode] }}>
              Time
            </TableCell>
            <TableCell align="center" sx={{ background: bg.put[mode] }}>
              Put COI&nbsp;(L)
            </TableCell>
            <TableCell align="center" sx={{ background: bg.call[mode] }}>
              Call COI&nbsp;(L)
            </TableCell>
            <TableCell align="center" sx={{ background: bg.default[mode] }}>
              Difference&nbsp;(L)
            </TableCell>
            <TableCell align="center" sx={{ background: bg.default[mode] }}>
              PCR
            </TableCell>
            <TableCell align="center" sx={{ background: bg.default[mode] }}>
              SPOT
            </TableCell>
            <TableCell align="center" sx={{ background: bg.default[mode] }}>
              Signal
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.time}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center" sx={{ color: bg.putText[mode] }}>
                {row.putsCoi}
              </TableCell>
              <TableCell align="center" sx={{ color: bg.callText[mode] }}>
                {row.callsCoi}
              </TableCell>
              <TableCell align="center">
                {row.oidiff > 0 ? (
                  <KeyboardDoubleArrowUpRounded color="success" />
                ) : (
                  <KeyboardDoubleArrowDownRounded color="error" />
                )}
                {row.oidiff}
              </TableCell>
              <TableCell align="center">
                {row.pcr >= 1.25 ? (
                  <NorthRounded sx={{ marginRight: "4px" }} color="success" />
                ) : row.pcr <= 0.75 ? (
                  <SouthRounded sx={{ marginRight: "4px" }} color="error" />
                ) : (
                  <EastRounded sx={{ marginRight: "4px" }} color="warning" />
                )}
                {row.pcr}
              </TableCell>
              <TableCell align="center">{row.spot}</TableCell>
              <TableCell align="center">
                {row.pcr >= 1.25 ? (
                  <div
                    style={{
                      background: bg.put[mode],
                      borderRadius: "20px",
                    }}
                  >
                    <TrendingUpRounded
                      sx={{ marginRight: "2px" }}
                      color="success"
                    />
                    Positive
                  </div>
                ) : row.pcr <= 0.75 ? (
                  <div
                    style={{
                      background: bg.call[mode],
                      borderRadius: "20px",
                    }}
                  >
                    <TrendingDownRounded
                      sx={{ marginRight: "2px" }}
                      color="error"
                    />
                    Negative
                  </div>
                ) : (
                  <div
                    style={{
                      background: bg.neutral[mode],
                      borderRadius: "20px",
                    }}
                  >
                    <EastRounded sx={{ marginRight: "2px" }} color="warning" />
                    Neutral
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
