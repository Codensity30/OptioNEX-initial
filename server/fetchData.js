//! IMPORTING REQUIRED MODULES ---------------------
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

//* function to handle error
function errorHandler(error) {
  console.log("⚠ Error Ocurred");
  console.log(error);
}

//! INTIALIZING REQUIREMENTS ------------------------

//* connecting to database
mongoose
  .connect("mongodb://127.0.0.1/optionex")
  .then("Connected to database")
  .catch(errorHandler);

//* intializing express server
const port = 8000;
const app = express();

//! MONGOOSE SCHEMA ----------------------------------

//* type of object within the oiArray
const oiSchema = {
  puts_change_oi: Number,
  calls_change_oi: Number,
};
//* schema of documents
const spDataSchema = new mongoose.Schema({
  strikePrice: Number,
  oiArray: [oiSchema],
});

//! ROUTING -------------------------------------------------------

//* endpoint to fetch option chain of any symbol, expiry date
app.get("/oc/:symbol/:expiryDate", async (req, res) => {
  const { symbol, expiryDate } = req.params;
  const url = "https://webapi.niftytrader.in/webapi/option/fatch-option-chain";

  const response = await axios
    .get(url, {
      params: { symbol: symbol, expirydate: expiryDate },
    })
    .catch(errorHandler);

  //* creating mongoose model with collection name same as symbol
  const Symbol = mongoose.model(symbol, spDataSchema, symbol);

  //* parsing response from api to get the option data
  const opDatas = response.data.resultData.opDatas;

  //* important vaiables required
  const spot = opDatas[0].index_close;
  const currentStrike = Math.ceil(spot / 50) * 50;
  let total_puts_change_oi = 0;
  let total_calls_change_oi = 0;

  //* entry of all sp lying in range of 1000 points up and down
  opDatas.forEach(async (element) => {
    const sp = element.strike_price;
    //suming up only 10 strikes up and down for total ois
    if (Math.abs(sp - currentStrike) <= 500) {
      total_puts_change_oi += element.puts_change_oi;
      total_calls_change_oi += element.calls_change_oi;
    }
    if (Math.abs(sp - currentStrike) <= 1000) {
      const doc = await Symbol.findOne({ strikePrice: sp });
      // if doc is not present then create
      if (!doc) {
        await Symbol.create({
          strikePrice: sp,
          oiArray: {
            puts_change_oi: element.puts_change_oi,
            calls_change_oi: element.calls_change_oi,
          },
        });
      }
      // if present then update
      else {
        await Symbol.updateOne(
          { strikePrice: sp },
          {
            $push: {
              oiArray: {
                puts_change_oi: element.puts_change_oi,
                calls_change_oi: element.calls_change_oi,
              },
            },
          }
        );
      }
    }
  });

  //* special entry to keep track of the total put and call oi
  const doc = await Symbol.findOne({ strikePrice: 0 });
  // if doc is not present then create
  if (!doc) {
    await Symbol.create({
      strikePrice: 0,
      oiArray: {
        puts_change_oi: total_puts_change_oi,
        calls_change_oi: total_calls_change_oi,
      },
    });
  }
  // if present then update
  else {
    await Symbol.updateOne(
      { strikePrice: 0 },
      {
        $push: {
          oiArray: {
            puts_change_oi: total_puts_change_oi,
            calls_change_oi: total_calls_change_oi,
          },
        },
      }
    );
  }

  res.send(opDatas);
});

//* listening on port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
