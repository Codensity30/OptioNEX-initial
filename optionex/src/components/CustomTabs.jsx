import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OpenInterestTabs from "./OpenInterestTabs";
import DataVsTimeTabs from "./DataVsTimeTabs";
import { Paper } from "@mui/material";

const CustomTabs = ({ mode, symbol, expiryDate }) => {
  const [selectedTab, setSelectedTab] = useState(0); // State to keep track of selected tab index

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab index when a new tab is selected
  };

  return (
    <div style={{ width: "full", display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ width: "90%" }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Open Interest" />
          <Tab label="COI vs Time" />
          <Tab label="Multistrike COI" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {selectedTab === 0 && (
            <OpenInterestTabs
              symbol={symbol}
              mode={mode}
              expiryDate={expiryDate}
            />
          )}
          {selectedTab === 1 && <DataVsTimeTabs symbol={symbol} mode={mode} />}
        </Box>
      </Paper>
    </div>
  );
};

export default CustomTabs;
