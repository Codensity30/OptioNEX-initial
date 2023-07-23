import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InputBox from "./components/InputBox";
import CoiLineChart from "./components/CoiLineChart";
import OiCoiBarChart from "./components/OiCoiBarChart";
import DataTable from "./components/DataTable";

const Theme = createTheme({
  palette: {
    mode: "light",
  },
});

const expiryDate = "current";

function App() {
  const [symbol, setSymbol] = useState("NIFTY");

  function handleChange(e, newValue) {
    if (newValue != null) {
      setSymbol(newValue);
    }
  }

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <main>
        <div>
          <InputBox handleChange={handleChange} />
          <DataTable mode={Theme.palette.mode} symbol={symbol} />
        </div>
        <div>
          <CoiLineChart
            mode={Theme.palette.mode}
            symbol={symbol}
            type={"coi"}
          />
          <div className="mt-10"></div>
          <CoiLineChart
            mode={Theme.palette.mode}
            symbol={symbol}
            type={"pcr"}
          />
          <div className="mt-10"></div>
          <OiCoiBarChart
            oicoi="OI"
            mode={Theme.palette.mode}
            symbol={symbol}
            expiryDate={expiryDate}
          />
          <div className="mt-10"></div>
          <OiCoiBarChart
            oicoi="COI"
            mode={Theme.palette.mode}
            symbol={symbol}
            expiryDate={expiryDate}
          />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
