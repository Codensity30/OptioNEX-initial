import { React, useEffect, useState } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MultiStrikeLineChart from "./MultiStrikeLineChart";
import LoaderH from "./LoaderH";

function MultiStrikeTabs({ symbol, mode, expiryDate, currentExpiry }) {
  const [checkedStrikes, setCheckedStrikes] = useState([]);

  const handleCheckboxChange = (strike) => {
    if (checkedStrikes.includes(strike)) {
      setCheckedStrikes(checkedStrikes.filter((item) => item !== strike));
    } else {
      setCheckedStrikes([...checkedStrikes, strike]);
    }
  };

  const [isDataFetched, setIsDataFetched] = useState(false);
  const [strikes, setStrikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/strikes-list/${symbol}`
        );
        setStrikes(response.data);
        setIsDataFetched(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [symbol]);

  useEffect(() => {
    if (strikes && strikes.length >= 8) {
      const s1 = strikes[3];
      const s2 = strikes[5];
      const s3 = strikes[7];
      setCheckedStrikes([s1, s2, s3]);
    }
  }, [strikes]);

  const disabled =
    (symbol === "NIFTY" || symbol === "BANKNIFTY" || symbol === "FINNIFTY") &&
    (expiryDate === currentExpiry || expiryDate === "current")
      ? false
      : true;

  if (disabled) {
    return (
      <>
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
          currently available for indices and the current expiry.
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "Comic Sans MS, 'Arial Rounded MT Bold', sans-serif",
            color: "grey",
          }}
        >
          Hang tight, we'll get you there soon!
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "Comic Sans MS, 'Arial Rounded MT Bold', sans-serif",
            color: "grey",
          }}
        >
          Try searching for NIFTY, BANKNIFTY, FINIFTY, MIDCPNIFTY or switch to
          Current Expiry
        </div>
      </>
    );
  }

  if (!isDataFetched) {
    return (
      <div className="flex justify-center">
        <LoaderH />
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {strikes.map((strike, index) => (
          <FormControlLabel
            control={
              <Checkbox
                key={index}
                color="secondary"
                checked={checkedStrikes.includes(strike)}
                onChange={() => handleCheckboxChange(strike)}
              />
            }
            label={strike}
          />
        ))}
      </div>
      <div style={{ height: "95%" }}>
        <MultiStrikeLineChart
          symbol={symbol}
          mode={mode}
          checkedStrikes={checkedStrikes}
        />
      </div>
    </>
  );
}
export default MultiStrikeTabs;
