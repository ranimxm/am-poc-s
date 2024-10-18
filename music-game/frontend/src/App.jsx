import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./pages/docent/start";
import MusicFragment from "./pages/docent/muziek-fragment";
import RankingsScreen from "./pages/docent/ranking";
import LuisterScherm from "./pages/leerling/luisteren";
import KeuzeScherm from "./pages/leerling/keuze";
import ResultaatScherm from "./pages/leerling/resultaat";

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
        <Route path="/docent/rankings" element={<RankingsScreen />} />
        {/* leerlingen routes */}
        <Route index element={<LuisterScherm />} />
        <Route path="/keuze" element={<KeuzeScherm />} />
        <Route path="/resultaat" element={<ResultaatScherm />} />
      </Routes>
    </Router>
  );
};
