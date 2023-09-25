import React from "react";
import InputBox from "./InputBox";
import ExpiryBox from "./ExpiryBox";
import Paper from "@mui/material/Paper";

function InputBar({
  symbol,
  handleSymbolChange,
  handleExpiryChange,
  handleCurrentExpiryChange,
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
        minHeight: "80px",
        height: "10%",
        marginTop: "80px",
      }}
      elevation={3}
    >
      <InputBox handleChange={handleSymbolChange} />
      <ExpiryBox
        handleExpiryChange={handleExpiryChange}
        symbol={symbol}
        handleCurrentExpiryChange={handleCurrentExpiryChange}
      />
    </Paper>
  );
}

export default InputBar;
