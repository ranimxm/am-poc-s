import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../util/socket-context";
import { RoomContext } from "../../util/room-context";

export default function Keuze() {
    const socket = useContext(SocketContext);
    const { roomCode, teamName } = useContext(RoomContext);
    const [timeLeft, setTimeLeft] = useState(10);
    const [hasChosen, setHasChosen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        socket.emit("joinRoom", { roomCode, teamName });
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
        socket.emit("submitChoice", { roomCode, teamName, timeTaken });
        setHasChosen(true); 
    };

    useEffect(() => {
        const handleUpdateRankings = (updatedScores) => {
            navigate("/resultaat", { state: { rankings: updatedScores } });
        };
        socket.on("updateRankings", handleUpdateRankings);

        return () => {
            socket.off("updateRankings", handleUpdateRankings);
        };
    }, [socket, navigate]);

    const emotions = [
        { color: "bg-yellow-400" },
        { color: "bg-blue-400" },
        { color: "bg-red-400" },
        { color: "bg-green-400" },
    ];

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            {hasChosen ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <h2 className="text-3xl font-bold text-white">Bedankt voor je keuze!</h2>
                </div>
            ) : (
                    <>
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                            {emotions.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`${item.color} flex items-center justify-center`}
                                    onClick={() => handleChoice()}
                                >
                                </div>
                            ))}
                        </div>

                        <div className="absolute">
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-blue-600">{timeLeft}</span>
                                </div>
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle 
                                        className="text-white" 
                                        strokeWidth="8" 
                                        stroke="currentColor" 
                                        fill="white" 
                                        r="46" 
                                        cx="50" 
                                        cy="50" 
                                    />
                                    <circle
                                        className="text-blue-600"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="46"
                                        cx="50" 
                                        cy="50"
                                        strokeDasharray={Math.PI * 2 * 46}
                                        strokeDashoffset={(1 - timeLeft / 10) * Math.PI * 2 * 46}
                                    />
                                </svg>
                            </div>
                        </div>
                    </>
            )}
        </div>
    );
}
