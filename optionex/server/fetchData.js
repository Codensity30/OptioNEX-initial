//! IMPORTING REQUIRED MODULES ---------------------
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const schedule = require("node-schedule");
const cors = require("cors");

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
app.use(cors());

//! MONGOOSE SCHEMA ----------------------------------

//* schema of docs for symbol list
const symbolListSchema = new mongoose.Schema({
  symbolName: String,
  lotSize: Number,
});

//* type of object within the oiArray
const oi = {
  spot: Number,
  time: String,
  putsCoi: Number,
  callsCoi: Number,
};
//* schema of documents for coi change with time
const oiDataSchema = new mongoose.Schema({
  strikePrice: Number,
  oiArray: [oi],
});

//! SCHEDULING THE JOBS------------------------------------------

//* important functions to store the and clear db in daily routine

function getCurrentISTTime() {
  const currentTime = new Date();

  const currentOffset = currentTime.getTimezoneOffset();

  const ISTOffset = 330; // IST offset UTC +5:30

  const ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  // ISTTime now represents the time in IST coordinates

  const hoursIST = ISTTime.getHours();
  const minutesIST = ISTTime.getMinutes();

  return `${hoursIST}:${minutesIST}`;
}

async function getAndStore(symbol) {
  const url = "https://webapi.niftytrader.in/webapi/option/fatch-option-chain";

  const response = await axios
    .get(url, {
      params: { symbol: symbol },
    })
    .catch(errorHandler);

  //* creating mongoose model with collection name same as symbol
  const Symbol = mongoose.model(symbol, oiDataSchema, symbol);

  //* parsing response from api to get the option data
  const opDatas = response.data.resultData.opDatas;

  //* important vaiables required
  const spot = opDatas[0].index_close;

  opDatas.sort((a, b) => {
    return a.strike_price < b.strike_price;
  });

  const atmIndex = opDatas.findIndex((obj) => obj.strike_price > spot);
  let total_puts_change_oi = 0;
  let total_calls_change_oi = 0;

  //* entry of all sp lying in range of 1000 points up and down
  const start = Math.max(0, atmIndex - 20);
  const end = Math.min(opDatas.length - 1, atmIndex + 20);
  for (let i = start; i <= end; i++) {
    const element = opDatas[i];
    const sp = element.strike_price;

    //* suming up coi of 10 strikes up-down
    if (Math.abs(i - atmIndex) <= 10) {
      total_puts_change_oi += element.puts_change_oi;
      total_calls_change_oi += element.calls_change_oi;
    }
    //* storing coi of 20 strikes up-down in db
    const doc = await Symbol.findOne({ strikePrice: sp }).catch(errorHandler);
    const oiArray = {
      spot: spot,
      time: getCurrentISTTime(),
      putsCoi: element.puts_change_oi,
      callsCoi: element.calls_change_oi,
    };

    if (!doc) {
      await Symbol.create({ strikePrice: sp, oiArray }).catch(errorHandler);
    } else {
      await Symbol.updateOne({ strikePrice: sp }, { $push: { oiArray } }).catch(
        errorHandler
      );
    }
  }

  //* special entry to keep track of the total put and call oi
  const doc = await Symbol.findOne({ strikePrice: 0 }).catch(errorHandler);
  const oiArray = {
    spot: spot,
    time: getCurrentISTTime(),
    putsCoi: total_puts_change_oi,
    callsCoi: total_calls_change_oi,
  };
  if (!doc) {
    await Symbol.create({ strikePrice: 0, oiArray }).catch(errorHandler);
  } else {
    await Symbol.updateOne({ strikePrice: 0 }, { $push: { oiArray } }).catch(
      errorHandler
    );
  }
}

async function updateOi() {
  await axios.get("http://localhost:8000/update-oiData").catch(errorHandler);
}

async function clearDb() {
  await mongoose.connection.db.dropDatabase().catch(errorHandler);
}

//* sheduling jobs to run at certain interval and time

process.env.TZ = "Asia/Kolkata";
const dailyDbClearCron = "14 9 * * 1-5";
const daily5minCron = "*/5 9-15 * * 1-5";
//const canceldaily5minCron = "31 3 * * 1-5";

const daily5Min = schedule.scheduleJob(daily5minCron, () => {
  console.log("job is running");
  updateOi();
});

//const canceldaily5min = schedule.cancelJob(daily5Min);

const dailyDbClear = schedule.scheduleJob(dailyDbClearCron, () => {
  console.log("db is cleared");
  clearDb();
});

//! ROUTING -------------------------------------------------------

//* endpoint for internal purposes
app.get("/update-oiData", async (req, res) => {
  const symList = ["NIFTY", "BANKNIFTY", "FINNIFTY"];

  const requests = symList.map((element) => {
    return getAndStore(element);
  });

  await Promise.all(requests).catch(errorHandler);

  res.send("Initialize the database");
});

//* endpoint to record symbols lists in database
app.get("/symbol-list", async (req, res) => {
  const url = "https://webapi.niftytrader.in/webapi/symbol/psymbol-list";

  const response = await axios.get(url).catch(errorHandler);
  const data = response.data.resultData;

  const Symbol = mongoose.model("symbol_list", symbolListSchema);

  data.forEach(async (element) => {
    const doc = await Symbol.findOne({ symbolName: element.symbol_name }).catch(
      errorHandler
    );
    if (!doc) {
      await Symbol.create({
        symbolName: element.symbol_name,
        lotSize: element.lot_size,
      });
    } else {
      await Symbol.updateOne(
        { symbolName: element.symbol_name },
        {
          lotSize: element.lot_size,
        }
      );
    }
  });

  const symObj = await Symbol.find({}).catch(errorHandler);
  const symList = [];
  symObj.forEach((element) => {
    symList.push(element.symbolName);
  });

  res.send(symList);
});

//* endpoint to fetch the live oi data of the specified expiry
app.get("/live-oicoi-ex/:symbol/:exiryDate", async (req, res) => {
  const { symbol, expiryDate } = req.params;

  const url = "https://webapi.niftytrader.in/webapi/option/fatch-option-chain";

  const response = await axios
    .get(url, {
      params: { symbol: symbol, expiryDate: expiryDate },
    })
    .catch(errorHandler);

  const opDatas = response.data.resultData.opDatas;
  const oiData = [];
  const spot = opDatas[0].index_close;

  let strikeDiff = 1e9;

  for (let i = 11; i < opDatas.length; i++) {
    strikeDiff = Math.min(
      strikeDiff,
      Math.abs(opDatas[10].strike_price - opDatas[i].strike_price)
    );
  }

  const atm = Math.ceil(spot / strikeDiff) * strikeDiff;
  oiData.push({ atm: atm });

  opDatas.forEach((element) => {
    const sp = element.strike_price;
    if (Math.abs(sp - atm) <= strikeDiff * 10) {
      oiData.push({
        strikePrice: sp,
        callsOi: parseFloat((element.calls_oi / 100000).toFixed(2)),
        callsCoi: parseFloat((element.calls_change_oi / 100000).toFixed(2)),
        putsOi: parseFloat((element.puts_oi / 100000).toFixed(2)),
        putsCoi: parseFloat((element.puts_change_oi / 100000).toFixed(2)),
      });
    }
  });
  res.send(oiData);
});

app.get("/total-coi/:symbol", async (req, res) => {
  const symbol = req.params.symbol;

  const Total = mongoose.model(symbol, oiDataSchema, symbol);

  const data = await Total.findOne({ strikePrice: 0 }).catch(errorHandler);
  if (data !== null) {
    const oi = data.oiArray;
    const oiLacs = oi.map((element) => {
      const time = element.time;
      const spot = element.spot;
      const putLac = parseFloat((element.putsCoi / 100000).toFixed(2));
      const callLac = parseFloat((element.callsCoi / 100000).toFixed(2));
      const pcr = parseFloat((putLac / callLac).toFixed(2));
      const oidiff = parseFloat((putLac - callLac).toFixed(2));
      const eleLacs = {
        spot: spot,
        pcr: pcr,
        oidiff: oidiff,
        time: time,
        putsCoi: putLac,
        callsCoi: callLac,
      };
      return eleLacs;
    });
    res.send(oiLacs);
  }
});

//* listening on port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
