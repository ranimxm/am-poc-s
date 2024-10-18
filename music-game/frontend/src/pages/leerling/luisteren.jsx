import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LuisterScherm() {
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
    <div className="screen-container">
      {phase === "playMusic" && (
        <div>
          <h3>Luisteren...</h3>
          <div className="emotion-circle">
            <span>{timeLeft}</span>
            </div>
        </div>
      )}
      {phase === "discuss" && (
        <div>
          <h3>Discuss the music...</h3>
          <div className="emotion-circle">
            <span>{timeLeft}</span>
          </div>
        </div>
            )}
    </div>
  );
};
