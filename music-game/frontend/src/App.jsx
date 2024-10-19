import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./pages/docent/start";
import MusicFragment from "./pages/docent/muziek-fragment";
import RankingsScreen from "./pages/docent/ranking";
import LuisterScherm from "./pages/leerling/luisteren";
import KeuzeScherm from "./pages/leerling/keuze";
import ResultaatScherm from "./pages/leerling/resultaat";
import StudentScreen from "./pages/leerling/start";
import { RoomProvider } from './util/room-context';
import { SocketContext, socket  } from './util/socket-context';

export default function App() {
  const musicFragments = [
    { id: 1, src: "" },
  ];

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          {/* docent */}
          <Route path="/docent" element={<StartScreen />} />
          <Route path="/docent/musicFragment" element={<MusicFragment musicFragments={musicFragments} />} />
          <Route path="/docent/rankings" element={<RankingsScreen />} />
          
          {/* leerlingen */}
          <Route index path="/*" element={<RoomProvider>
            <Routes>
              <Route path="/" element={<StudentScreen />} />
              <Route path="/luisteren" element={<LuisterScherm />} />
              <Route path="/keuze" element={<KeuzeScherm />} />
              <Route path="/resultaat" element={<ResultaatScherm />} />
            </Routes>
          </RoomProvider>} />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}
