import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function InputBox({ handleChange }) {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/symbol-list`);
        const temp = response.data;
        temp.sort();
        setSymbols(temp);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Autocomplete
      disablePortal
      defaultValue={"NIFTY"}
      options={symbols}
      sx={{ width: 300 }}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Symbols" />}
    />
  );
}
