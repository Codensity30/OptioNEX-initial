import React from "react";
import InputBox from "./InputBox";
import ExpiryBox from "./ExpiryBox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import LightModeIconRounded from "@mui/icons-material/LightModeRounded";
import DarkModeIconRounded from "@mui/icons-material/DarkModeRounded";

function InputBar({
  symbol,
  mode,
  handleSymbolChange,
  handleExpiryChange,
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
      <ExpiryBox handleChange={handleExpiryChange} symbol={symbol} />
      <IconButton aria-label="mode" onClick={handleModeChange}>
        {mode === "light" ? <DarkModeIconRounded /> : <LightModeIconRounded />}
      </IconButton>
    </Paper>
  );
}

export default InputBar;
