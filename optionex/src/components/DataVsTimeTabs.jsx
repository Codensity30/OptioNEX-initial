import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CoiLineChart from "./CoiLineChart";
import DataTable from "./DataTable";

const CustomTabs = ({ mode, symbol }) => {
  const [selectedTab, setSelectedTab] = useState(0); // State to keep track of selected tab index

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab index when a new tab is selected
  };

  return (
    <div style={{ height: "100vh" }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab label="Data" />
        <Tab label="COI vs Time" />
        <Tab label="PCR vs Time" />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 5,
          height: "100%",
        }}
      >
        {selectedTab === 0 && <DataTable symbol={symbol} mode={mode} />}
        {selectedTab === 1 && (
          <CoiLineChart symbol={symbol} type="coi" mode={mode} />
        )}
        {selectedTab === 2 && (
          <CoiLineChart symbol={symbol} type="pcr" mode={mode} />
        )}
      </Box>
    </div>
  );
};

export default CustomTabs;
