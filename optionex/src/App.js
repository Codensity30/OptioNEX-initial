import React from "react";
import { Route, Routes } from "react-router-dom";
import Cockpit from "./components/Cockpit";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cockpit" element={<Cockpit />} />
    </Routes>
  );
}

export default App;
