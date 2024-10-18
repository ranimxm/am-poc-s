import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './pages/docent/start';

export default function App() {


  return (
    <Router>
      <Routes>
        {/* docent routes */}
        <Route path="/docent" element={<StartScreen />} />

      </Routes>
    </Router>
  );
};
