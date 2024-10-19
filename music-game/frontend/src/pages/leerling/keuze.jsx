import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../util/socket-context";
import { RoomContext } from "../../util/room-context";

export default function KeuzeScherm() {
    const socket = useContext(SocketContext);
    const { roomCode, teamName } = useContext(RoomContext);
    const [timeLeft, setTimeLeft] = useState(10);
    const [hasChosen, setHasChosen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        socket.emit('joinRoom', { roomCode, teamName });
    }, [socket, roomCode, teamName]);

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
    }, []);

    const handleChoice = () => {
        const timeTaken = 10 - timeLeft;
        socket.emit('submitChoice', { roomCode, teamName, timeTaken });
        setHasChosen(true); 
    };

    useEffect(() => {
        const handleUpdateRankings = (updatedScores) => {
            navigate("/resultaat", { state: { rankings: updatedScores } });
        };
        socket.on('updateRankings', handleUpdateRankings);

        return () => {
            socket.off('updateRankings', handleUpdateRankings);
        };
    }, [socket, navigate]);

    return (
        <div className="screen-container">
            {hasChosen ? (
                <div>
                    <h3>Wacht tot de countdown is afgelopen...</h3>
                    <div className="emotion-circle">
                        <span>{timeLeft}</span>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>Kies je optie:</h3>
                    <div className="grid-options">
                        <div className="option" style={{ backgroundColor: "#ccc" }} onClick={handleChoice}>2</div>
                        <div className="option" style={{ backgroundColor: "#666" }} onClick={handleChoice}>2</div>
                        <div className="option" style={{ backgroundColor: "#333" }} onClick={handleChoice}>2</div>
                        <div className="option" style={{ backgroundColor: "#999" }} onClick={handleChoice}>2</div>
                    </div>
                    <div className="emotion-circle">
                        <span>{timeLeft}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
