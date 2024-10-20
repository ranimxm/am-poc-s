import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../util/socket-context";

export default function Start() {
    const socket = useContext(SocketContext);
    const [roomCode, setRoomCode] = useState("");
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/create-room", {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setRoomCode(data.roomCode);
            socket.emit('joinRoom', { roomCode: data.roomCode, teamName: null });
            socket.on("teamJoined", (updatedTeams) => {
                setTeams(updatedTeams);
            });
        });

        return () => socket.off("teamJoined"); 
    }, []);

    const handleStart = () => {
        socket.emit('startGame', roomCode);
        navigate("/docent/musicFragment");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600">
            <div className="w-full max-w-md px-8 py-6 bg-white shadow-md rounded-lg text-center">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Start een nieuwe Quiz</h2>
                <p className="text-gray-700 mb-4">Geef deze code aan je leerlingen:</p>
                <div className="text-5xl font-bold text-blue-600 mb-6">{roomCode}</div>
                <button 
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    onClick={handleStart}
                >
                    Start Quiz
                </button>
            </div>
            <div className="w-full max-w-md mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Teams die meedoen:</h3>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {teams.length > 0 ? (
                        teams.map((team, index) => (
                            <p key={index} className="text-gray-800 mb-2">{team}</p>
                        ))
                    ) : (
                        <p className="text-gray-800">Wachten op teams...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
