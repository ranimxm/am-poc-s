import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../util/room-context";
import { SocketContext } from "../../util/socket-context";

export default function Student() {
    const socket = useContext(SocketContext);
    const { roomCode, setRoomCode, teamName, setTeamName } = useContext(RoomContext);
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("gameStarted", () => {
            navigate("/luisteren"); 
        });

        return () => socket.off("gameStarted");
    }, [navigate]);

    const handleJoinRoom = () => {
        socket.emit("joinRoom", { roomCode, teamName });
        setStep(1); 
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600">
            <div className="w-full max-w-md px-8 py-6 bg-white shadow-md rounded-lg">
                {step === 0 ? (
                    <>
                        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Doe mee met de Quiz!</h2>
                        <p className="text-center text-gray-700 mb-4">Voer de gamecode in die je van de leraar hebt gekregen.</p>
                        <input 
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            type="text" 
                            placeholder="Gamecode" 
                            value={roomCode} 
                            onChange={(e) => setRoomCode(e.target.value)} 
                        />
                        <button 
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                            onClick={handleJoinRoom}
                        >
                            Volgende
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Kies een teamnaam</h2>
                        <input 
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            type="text" 
                            placeholder="Teamnaam" 
                            value={teamName} 
                            onChange={(e) => setTeamName(e.target.value)} 
                        />
                        <button 
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                            onClick={handleJoinRoom}
                        >
                            Doe Mee
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
