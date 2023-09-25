import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_Api_URL}/total-coi/${symbol}`
  //       );
  //       response.data.reverse();
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };
  //   fetchData();
  //   const intervalId = setInterval(fetchData, 60000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [symbol]);

  useEffect(() => {
    let intervalId; // Store the interval ID
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_Api_URL}/total-coi/${symbol}`
        );
        response.data.reverse();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData(); // immediately call when the component is mounted

    const scheduleNextCall = () => {
      const now = DateTime.now().setZone("Asia/Kolkata");
      const minutes = now.minute;

      // Calculate the delay until the next minute immediately following one divisible by 5
      const nextMinuteDivisibleBy5 = (Math.floor(minutes / 5) + 1) * 5;
      const delay = (nextMinuteDivisibleBy5 - minutes) * 60000;

      // Schedule the next call after the calculated delay
      intervalId = setTimeout(() => {
        fetchData();
        // After the call, schedule the next one
        scheduleNextCall();
      }, delay + 20000); // Add 0.5 minute to the delay to call at the next minute
    };

    // Schedule the initial call
    scheduleNextCall();

    // Clear the interval when the component unmounts
    return () => {
      clearTimeout(intervalId);
    };
  }, [symbol]);

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
