import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Luister() {
  const [phase, setPhase] = useState("playMusic");
  const [timeLeft, setTimeLeft] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    switch (phase) {
      case "playMusic":
        setTimeLeft(15);
        break;
      case "discuss":
        setTimeLeft(30);
        break;
      case "choose":
        navigate("/keuze");
        break;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handlePhaseChange();
          return 0;
        }
        return prevTime - 1
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const handlePhaseChange = () => {
    switch (phase) {
      case "playMusic":
        setPhase("discuss");
        break;
      case "discuss":
        setPhase("choose");
        break;
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      {phase === "playMusic" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Luister naar het fragment</h2>
          <div className="text-white text-6xl mb-6">🎵</div>
          <div className="text-4xl font-bold text-white">{timeLeft}</div>
        </div>
      )}
      {phase === "discuss" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Bespreek met je team</h2>
          <div className="text-4xl font-bold text-white">{timeLeft}</div>
        </div>
      )}
    </div>
  );
};
