import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "@components/Header";
import HomePage from "@pages/HomePage";
import PeoplesPage from "@pages/PeoplesPage";
import ShipsPage from "@pages/ShipsPage";
import PlanetsPage from "@pages/PlanetsPage";
import FilmsPage from "@pages/FilmsPage";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplesPage />} />
        <Route path="/ships" element={<ShipsPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        <Route path="/films" element={<FilmsPage />} />
      </Routes>
    </div>
  );
}

export default App;
