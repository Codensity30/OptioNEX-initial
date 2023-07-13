const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const port = 8000;
const app = express();

function errorHandler(error) {
  console.log("⚠ Error Ocurred");
  console.log(error);
}

//* endpoint to fetch option chain of any symbol, expiry date

app.get("/oc/:symbol/:expiryDate", async (req, res) => {
  const { symbol, expiryDate } = req.params;
  const url = "https://webapi.niftytrader.in/webapi/option/fatch-option-chain";

  const response = await axios
    .get(url, {
      params: { symbol: symbol, expirydate: expiryDate },
    })
    .catch(errorHandler);

  res.send(response.data);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
