import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LuisterScherm() {
  const [timeLeft, setTimeLeft] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/keuze");
    }
  }, [timeLeft, navigate]);

  return (
    <div className="screen-container">
      <h3>Luisteren...</h3>
      <div className="emotion-circle">
        <span>{timeLeft}</span>
      </div>
    </div>
  );
};
