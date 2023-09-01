import React from "react";
import InputBox from "./InputBox";
import ExpiryBox from "./ExpiryBox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

function InputBar({
  symbol,
  mode,
  handleSymbolChange,
  handleExpiryChange,
  handleCurrentExpiryChange,
  handleModeChange,
}) {
  return (
    <Paper
      sx={{
        width: "90%",
        margin: "auto",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        p: 3,
        gap: 7,
        height: "10%",
        marginTop: "30px",
      }}
      elevation={3}
    >
      <InputBox handleChange={handleSymbolChange} />
      <ExpiryBox
        handleExpiryChange={handleExpiryChange}
        symbol={symbol}
        handleCurrentExpiryChange={handleCurrentExpiryChange}
      />
      <IconButton aria-label="mode" onClick={handleModeChange}>
        {mode === "light" ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </Paper>
  );
}

export default InputBar;
