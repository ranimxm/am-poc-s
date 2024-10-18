import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KeuzeScherm() { 
    const [timeLeft, setTimeLeft] = useState(10);
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
            <div className="option" style={{ backgroundColor: "#ccc" }}></div>
            <div className="option" style={{ backgroundColor: "#666" }}></div>
            <div className="option" style={{ backgroundColor: "#333" }}></div>
            <div className="option" style={{ backgroundColor: "#999" }}></div>
        </div>
        <div className="emotion-circle">
            <span>{timeLeft}</span>
        </div>
        </div>
    );
}
