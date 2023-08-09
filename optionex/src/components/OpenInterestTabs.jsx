import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OiCoiBarChart from "./OiCoiBarChart";
import { BarChartRounded, StackedBarChartRounded } from "@mui/icons-material";

const CustomTabs = ({ mode, symbol, expiryDate }) => {
  const [selectedTab, setSelectedTab] = useState(0); // State to keep track of selected tab index

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab index when a new tab is selected
  };

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab
          label="Total Open Interest"
          icon={<BarChartRounded />}
          iconPosition="start"
        />
        <Tab
          label="Change in Open Interest"
          icon={<StackedBarChartRounded />}
          iconPosition="start"
        />
      </Tabs>
      <Box
        sx={{ display: "flex", justifyContent: "center", py: 5, height: "95%" }}
      >
        {selectedTab === 0 && (
          <OiCoiBarChart
            symbol={symbol}
            expiryDate={expiryDate}
            oicoi="OI"
            mode={mode}
          />
        )}
        {selectedTab === 1 && (
          <OiCoiBarChart
            symbol={symbol}
            expiryDate={expiryDate}
            oicoi="COI"
            mode={mode}
          />
        )}
      </Box>
    </>
  );
};

export default CustomTabs;
