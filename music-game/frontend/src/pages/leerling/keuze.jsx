import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KeuzeScherm() { 
    const [timeLeft, setTimeLeft] = useState(15);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
            }
            return prevTime - 1;
        });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    useEffect(() => {
        if (timeLeft === 0) {
            navigate("/resultaat");
        }
     }, [timeLeft, navigate]);

    return (
        <div className="screen-container">
        <h3>Kies je optie:</h3>
        <div className="grid-options">
            <div className="option" style={{ backgroundColor: "#ccc" }}>2</div>
            <div className="option" style={{ backgroundColor: "#666" }}>2</div>
            <div className="option" style={{ backgroundColor: "#333" }}>2</div>
            <div className="option" style={{ backgroundColor: "#999" }}>2</div>
        </div>
        <div className="emotion-circle">
            <span>{timeLeft}</span>
        </div>
        </div>
    );
}
