import { React, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

function MultiStrikeTabs({ symbol }) {
  const [checkedStrikes, setCheckedStrikes] = useState([]);

  const handleCheckboxChange = (strike) => {
    if (checkedStrikes.includes(strike)) {
      setCheckedStrikes(checkedStrikes.filter((item) => item !== strike));
    } else {
      setCheckedStrikes([...checkedStrikes, strike]);
    }
  };

  console.log(checkedStrikes);

  const [isDataFetched, setIsDataFetched] = useState(false);
  const [strikes, setStrikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/strikes/${symbol}`
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
      {strikes.map((strike) => (
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              checked={checkedStrikes.includes(strike)}
              onChange={() => handleCheckboxChange(strike)}
            />
          }
          label={strike}
        />
      ))}
    </>
  );
}
export default MultiStrikeTabs;
