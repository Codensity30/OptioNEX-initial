import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  TrendingUp,
  TrendingDown,
  East,
  ArrowCircleUp,
  ArrowCircleRight,
  ArrowCircleDown,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";

const bg = {
  default: { light: "#C5DFF8", dark: "#395B64" },
  call: { light: "#FFACAC", dark: "#800000" },
  put: { light: "#E8FFCE", dark: "#448000" },
  neutral: { light: "#FFFAD7", dark: "#807000" },
};

export default function BasicTable({ mode, symbol }) {
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{ background: bg.default[mode], fontWeight: "bold" }}
            >
              Time
            </TableCell>
            <TableCell
              align="center"
              sx={{ background: bg.call[mode], fontWeight: "bold" }}
            >
              Call COI&nbsp;(L)
            </TableCell>
            <TableCell
              align="center"
              sx={{ background: bg.put[mode], fontWeight: "bold" }}
            >
              Put COI&nbsp;(L)
            </TableCell>
            <TableCell
              align="center"
              sx={{ background: bg.default[mode], fontWeight: "bold" }}
            >
              Difference&nbsp;(L)
            </TableCell>
            <TableCell
              align="center"
              sx={{ background: bg.default[mode], fontWeight: "bold" }}
            >
              PCR
            </TableCell>
            <TableCell
              align="center"
              sx={{ background: bg.default[mode], fontWeight: "bold" }}
            >
              SPOT
            </TableCell>
            <TableCell
              align="center"
              sx={{ background: bg.default[mode], fontWeight: "bold" }}
            >
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
              <TableCell align="center" sx={{ color: "#EF6262" }}>
                {row.callsCoi}
              </TableCell>
              <TableCell align="center" sx={{ color: "#03C988" }}>
                {row.putsCoi}
              </TableCell>
              <TableCell align="center">
                {row.oidiff > 0 ? (
                  <KeyboardDoubleArrowUp color="success" />
                ) : (
                  <KeyboardDoubleArrowDown color="error" />
                )}
                {row.oidiff}
              </TableCell>
              <TableCell align="center">
                {row.pcr >= 1.25 ? (
                  <ArrowCircleUp sx={{ marginRight: "4px" }} color="success" />
                ) : row.pcr <= 0.75 ? (
                  <ArrowCircleDown sx={{ marginRight: "4px" }} color="error" />
                ) : (
                  <ArrowCircleRight
                    sx={{ marginRight: "4px" }}
                    color="warning"
                  />
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
                    <TrendingUp sx={{ marginRight: "2px" }} color="success" />
                    Positive
                  </div>
                ) : row.pcr <= 0.75 ? (
                  <div
                    style={{
                      background: bg.call[mode],
                      borderRadius: "20px",
                    }}
                  >
                    <TrendingDown sx={{ marginRight: "2px" }} color="error" />
                    Negative
                  </div>
                ) : (
                  <div
                    style={{
                      background: bg.neutral[mode],
                      borderRadius: "20px",
                    }}
                  >
                    <East sx={{ marginRight: "2px" }} color="warning" />
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
