import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

//* function to handle error
function errorHandler(error) {
  console.log("⚠ Error Ocurred");
  console.log(error);
}

export default function ExpiryBox({ handleChange, symbol }) {
  const [expiryDates, setExpiry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(`http://localhost:8000/expiry-dates/${symbol}`)
          .catch(errorHandler);
        const temp = response.data;
        const exp = temp.map((ele) => {
          return ele.split("T")[0];
        });
        setExpiry(exp);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [symbol]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Autocomplete
      disablePortal
      value={expiryDates[0]}
      options={expiryDates}
      sx={{ width: 300 }}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Expiry Date" />}
    />
  );
}
