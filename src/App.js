import React from "react";
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import ShipsPage from "./pages/ShipsPage";
import PlanetsPage from "./pages/PlanetsPage";
import FilmsPage from "./pages/FilmsPage";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/ships" element={<ShipsPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        <Route path="/films" element={<FilmsPage />} />
      </Routes>
    </div>
  );
}

export default App;
