import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoaderH from "./LoaderH";

//* function to handle error
function errorHandler(error) {
  console.log("⚠ Error Ocurred");
  console.log(error);
}

// export default function ExpiryBox({
//   handleExpiryChange,
//   symbol,
//   handleCurrentExpiryChange,
// }) {
//   const [expiryDates, setExpiry] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // setLoading(true);
//     const fetchData = async () => {
//       try {
//         const response = await axios
//           .get(`${process.env.REACT_APP_Api_URL}/expiry-dates/${symbol}`)
//           .catch(errorHandler);
//         const temp = response.data;
//         const exp = temp.map((ele) => {
//           return ele.split("T")[0];
//         });
//         handleCurrentExpiryChange(exp[0]);
//         setExpiry(exp);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };
//     fetchData();
//   }, [symbol]);

//   if (loading) {
//     return <LoaderH />;
//   }

//   return (
//     <Autocomplete
//       disablePortal
//       value={expiryDates[0]}
//       options={expiryDates}
//       sx={{ width: 300 }}
//       onChange={handleExpiryChange}
//       renderInput={(params) => <TextField {...params} label="Expiry Date" />}
//     />
//   );
// }

export default function ExpiryBox({
  handleExpiryChange,
  symbol,
  handleCurrentExpiryChange,
}) {
  const [expiryDates, setExpiry] = useState([]);
  const [selectedExpiry, setSelectedExpiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(`${process.env.REACT_APP_Api_URL}/expiry-dates/${symbol}`)
          .catch(errorHandler);
        const temp = response.data;
        const exp = temp.map((ele) => {
          return ele.split("T")[0];
        });

        // Update selectedExpiry when symbol changes
        setSelectedExpiry(exp[0]);
        handleExpiryChange("click", "current");
        handleCurrentExpiryChange(exp[0]);
        setExpiry(exp);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [symbol]);

  if (loading) {
    return <LoaderH />;
  }

  return (
    <Autocomplete
      disablePortal
      value={selectedExpiry} // Use value prop for controlled behavior
      options={expiryDates}
      sx={{ width: 300 }}
      onChange={(event, newValue) => {
        setSelectedExpiry(newValue);
        handleExpiryChange(event, newValue);
      }}
      renderInput={(params) => <TextField {...params} label="Expiry Date" />}
    />
  );
}
