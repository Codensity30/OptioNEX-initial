import { React, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MultiStrikeLineChart from "./MultiStrikeLineChart";
import axios from "axios";

function MultiStrikeTabs({ symbol, mode }) {
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
    const intervalId = setInterval(fetchData, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [symbol]);

  if (!isDataFetched) {
    return "Loading...";
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
      <MultiStrikeLineChart
        symbol={symbol}
        mode={mode}
        checkedStrikes={checkedStrikes}
      />
    </>
  );
}
export default MultiStrikeTabs;
