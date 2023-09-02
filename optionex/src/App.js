import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage_Components/LandingPage";
import Terminal from "./components/Terminal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/terminal" element={<Terminal />} />
    </Routes>
  );
}

export default App;
