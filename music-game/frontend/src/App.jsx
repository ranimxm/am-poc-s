import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./pages/docent/start-screen";
import MusicFragment from "./pages/docent/muziek-fragment";

export default function App() {
  const musicFragments = [
    { id: 1, src: "" },
  ];

  return (
    <Router>
      <Routes>
        {/* docent routes */}
        <Route path="/docent" element={<StartScreen />} />
        <Route path="/docent/musicFragment" element={<MusicFragment musicFragments={musicFragments} />} />
      </Routes>
    </Router>
  );
};
