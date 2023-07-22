import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CoiLineChart from "./components/CoiLineChart";
import OiCoiBarChart from "./components/OiCoiBarChart";
import DataTable from "./components/DataTable";

const Theme = createTheme({
  palette: {
    mode: "light",
  },
});

const symbol = "NIFTY";
const expiryDate = "current";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {/* <main>
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
      </main> */}
      <div>
        <DataTable mode={Theme.palette.mode} symbol={symbol} />
      </div>
    </ThemeProvider>
  );
}

export default App;
