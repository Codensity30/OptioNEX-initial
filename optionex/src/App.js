import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CustomTabs from "./components/CustomTabs";
import InputBar from "./components/InputBar";

function App() {
  const [symbol, setSymbol] = useState("NIFTY");
  const [expiryDate, setExpiry] = useState("current");
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

  function handleModeChange() {
    if (mode === "light") setMode("dark");
    else setMode("light");
  }

  const Theme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === "light" ? "#efefef" : "#444444",
      },
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <main>
        <div style={{ width: "100%", height: "100vh" }}>
          <InputBar
            symbol={symbol}
            mode={mode}
            handleExpiryChange={handleExpiryChange}
            handleSymbolChange={handleSymbolChange}
            handleModeChange={handleModeChange}
          />
          <CustomTabs mode={mode} symbol={symbol} expiryDate={expiryDate} />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
