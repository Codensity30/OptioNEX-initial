import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OpenInterestTabs from "./OpenInterestTabs";
import DataVsTimeTabs from "./DataVsTimeTabs";
import { Paper } from "@mui/material";
import {
  InsertChartOutlinedRounded,
  QueryStatsRounded,
  StackedLineChartRounded,
} from "@mui/icons-material";

const CustomTabs = ({ mode, symbol, expiryDate }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ width: "full", display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ width: "90%" }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab
            label="Open Interest"
            icon={<InsertChartOutlinedRounded />}
            iconPosition="start"
          />
          <Tab
            label="Buildup vs Time"
            icon={<QueryStatsRounded />}
            iconPosition="start"
          />
          <Tab
            label="Multistrike COI"
            icon={<StackedLineChartRounded />}
            iconPosition="start"
          />
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
