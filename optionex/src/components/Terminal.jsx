import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CustomTabs from "./CustomTabs";
import InputBar from "./InputBar";
import Header from "./LandingPage_Components/Header";

function Terminal() {
  const [symbol, setSymbol] = useState("NIFTY");
  const [expiryDate, setExpiry] = useState("current");
  const [currentExpiry, setCurrentExpiry] = useState("current");
  const [mode, setMode] = useState("dark");

  function handleSymbolChange(e, newValue) {
    if (newValue != null) {
      setSymbol(newValue);
    }
  }
  function handleExpiryChange(e, newValue) {
    if (newValue != null) {
      setExpiry(newValue);
    }
  }

  function handleCurrentExpiryChange(newValue) {
    if (newValue != null) {
      setCurrentExpiry(newValue);
    }
  }

  function handleModeChange() {
    if (mode === "light") setMode("dark");
    else setMode("light");
  }

  const Theme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === "light" ? "#efefef" : "#565656",
      },
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <div style={{ width: "100%", height: "100%", paddingBottom: "50px" }}>
        <Header
          mode={mode}
          handleModeChange={handleModeChange}
          objective={"terminal"}
        />
        <InputBar
          symbol={symbol}
          handleExpiryChange={handleExpiryChange}
          handleSymbolChange={handleSymbolChange}
          handleCurrentExpiryChange={handleCurrentExpiryChange}
        />
        <CustomTabs
          mode={mode}
          symbol={symbol}
          expiryDate={expiryDate}
          currentExpiry={currentExpiry}
        />
      </div>
    </ThemeProvider>
  );
}

export default Terminal;
