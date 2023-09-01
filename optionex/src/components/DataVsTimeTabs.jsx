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

const CustomTabs = ({ mode, expiryDate, symbol, currentExpiry }) => {
  const [selectedTab, setSelectedTab] = useState(0); // State to keep track of selected tab index

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab index when a new tab is selected
  };

  const disabled =
    (symbol === "NIFTY" ||
      symbol === "BANKNIFTY" ||
      symbol === "FINNIFTY" ||
      symbol === "MIDCPNIFTY") &&
    (expiryDate === currentExpiry || expiryDate === "current")
      ? false
      : true;

  if (disabled) {
    return (
      <div style={{ height: "95%", marginTop: "5%" }}>
        <div style={{ height: "80%" }}>
          <img
            src={require(`../images/unavailable_${mode}.png`)}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              margin: "auto",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "Comic Sans MS, 'Arial Rounded MT Bold', sans-serif",
            color: "grey",
          }}
        >
          Uh-oh! It seems like the feature you're attempting to access is
          currently available for indices and the current expiry. Hang tight,
          we'll get you there soon!
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "Comic Sans MS, 'Arial Rounded MT Bold', sans-serif",
            color: "grey",
          }}
        >
          Try searching for NIFTY, BANKNIFTY, FINIFTY or switch to Current
          Expiry
        </div>
      </div>
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
          label="Put vs Call"
          icon={<InsightsRounded />}
          iconPosition="start"
        />
        <Tab
          label="PCR vs Spot"
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
