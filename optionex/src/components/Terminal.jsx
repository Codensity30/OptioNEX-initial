import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useResponsiveFontSize from "./useResponsiveFontSize";
import CssBaseline from "@mui/material/CssBaseline";
import CustomTabs from "./CustomTabs";
import InputBar from "./InputBar";
import Header from "./LandingPage_Components/Header";

function Terminal() {
  const [symbol, setSymbol] = useState("NIFTY");
  const [expiryDate, setExpiry] = useState("current");
  const [currentExpiry, setCurrentExpiry] = useState("current");
  const [mode, setMode] = useState(getTheme);

  function getTheme() {
    let storedTheme = localStorage.getItem("theme"); // Attempt to get theme from local storage
    return storedTheme ? storedTheme : "dark";
  }

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
    if (mode === "light") {
      localStorage.setItem("theme", "dark");
      setMode("dark");
    } else {
      localStorage.setItem("theme", "light");
      setMode("light");
    }
  }

  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === "light" ? "#efefef" : "#565656",
      },
    },
    typography: {
      fontSize: useResponsiveFontSize(),
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
