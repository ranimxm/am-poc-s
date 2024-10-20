import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/docent/start";
import MusicFragment from "./pages/docent/muziek-fragment";
import Rankings from "./pages/docent/ranking";
import Luister from "./pages/leerling/luisteren";
import Keuze from "./pages/leerling/keuze";
import Resultaat from "./pages/leerling/resultaat";
import Student from "./pages/leerling/start";
import { RoomProvider } from './util/room-context';
import { SocketContext, socket  } from './util/socket-context';

export default function App() {
  const musicFragments = [
    { id: 1, src: "./assets/music/wii.mp3" },
  ];

  return (
    <SocketContext.Provider value={socket}>
      <RoomProvider>
        <Router>
          <Routes>
            {/* docent */}
            <Route path="/docent" element={<Start />} />
            <Route path="/docent/musicFragment" element={<MusicFragment musicFragments={musicFragments} />} />
            <Route path="/docent/rankings" element={<Rankings />} />
            {/* leerlingen */}
            <Route index element={<Student />} />
            <Route path="/luisteren" element={<Luister />} />
            <Route path="/keuze" element={<Keuze />} />
            <Route path="/resultaat" element={<Resultaat />} />
          </Routes>
        </Router>
      </RoomProvider>
    </SocketContext.Provider>
  );
}
