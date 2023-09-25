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
import MultiStrikeTabs from "./MultiStrikeTabs";

const CustomTabs = ({ mode, symbol, expiryDate, currentExpiry }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "90%",
        margin: "auto",
        marginY: "30px",
        height: "95%",
        minHeight: "600px",
      }}
    >
      <Box display="flex" justifyContent="center" width="100%">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
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
      </Box>
      <Box
        sx={{
          p: 3,
          height: "90%",
          minHeight: "450px",
        }}
      >
        {selectedTab === 0 && (
          <OpenInterestTabs
            symbol={symbol}
            mode={mode}
            expiryDate={expiryDate}
          />
        )}
        {selectedTab === 1 && (
          <DataVsTimeTabs
            symbol={symbol}
            expiryDate={expiryDate}
            mode={mode}
            currentExpiry={currentExpiry}
          />
        )}
        {selectedTab === 2 && (
          <MultiStrikeTabs
            symbol={symbol}
            expiryDate={expiryDate}
            mode={mode}
            currentExpiry={currentExpiry}
          />
        )}
      </Box>
    </Paper>
  );
};

export default CustomTabs;
