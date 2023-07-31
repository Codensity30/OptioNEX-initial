import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CoiLineChart from "./CoiLineChart";
import DataTable from "./DataTable";
import {
  InsightsRounded,
  TableChartOutlined,
  TimelineRounded,
} from "@mui/icons-material";

const CustomTabs = ({ mode, symbol }) => {
  const [selectedTab, setSelectedTab] = useState(0); // State to keep track of selected tab index

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab index when a new tab is selected
  };

  const disabled =
    symbol === "NIFTY" ||
    symbol === "BANKNIFTY" ||
    symbol === "FINNIFTY" ||
    symbol === "MIDCPNIFTY"
      ? false
      : true;

  if (disabled) {
    return (
      <>
        <div style={{ height: "80%" }}>
          <img
            src={require("../images/unavailable.png")}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              margin: "auto",
              objectFit: "contain",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          Currently this feature is available only for indices. Try searching
          for NIFTY, BANKNIFTY, FINIFTY
        </div>
      </>
    );
  }

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
          label="Buildup"
          icon={<TableChartOutlined />}
          iconPosition="start"
        />
        <Tab
          label="COI vs Time"
          icon={<InsightsRounded />}
          iconPosition="start"
        />
        <Tab
          label="PCR vs Time"
          icon={<TimelineRounded />}
          iconPosition="start"
        />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 5,
          height: "95%",
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
    </>
  );
};

export default CustomTabs;
