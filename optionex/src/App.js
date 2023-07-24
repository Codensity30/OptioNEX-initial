import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CustomTabs from "./components/CustomTabs";
import InputBox from "./components/InputBox";
import CoiLineChart from "./components/CoiLineChart";
import OiCoiBarChart from "./components/OiCoiBarChart";
import DataTable from "./components/DataTable";
import IconButton from "@mui/material/IconButton";
import LightModeIconRounded from "@mui/icons-material/LightModeRounded";
import DarkModeIconRounded from "@mui/icons-material/DarkModeRounded";

const expiryDate = "current";

function App() {
  const [symbol, setSymbol] = useState("NIFTY");
  const [mode, setMode] = useState("dark");

  function handleChange(e, newValue) {
    if (newValue != null) {
      setSymbol(newValue);
    }
  }

  function handleModeChange() {
    if (mode === "light") setMode("dark");
    else setMode("light");
  }

  const Theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <main>
        <div className="flex justify-center mt-10 gap-5">
          <InputBox handleChange={handleChange} />
          <IconButton aria-label="mode" onClick={handleModeChange}>
            {mode === "light" ? (
              <DarkModeIconRounded />
            ) : (
              <LightModeIconRounded />
            )}
          </IconButton>
        </div>
        <div className="my-10">
          <CustomTabs mode={mode} symbol={symbol} expiryDate={expiryDate} />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
