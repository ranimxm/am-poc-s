import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../util/room-context";
import { SocketContext } from "../../util/socket-context";

export default function StudentScreen() {
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
        <div>
            {step === 0 ? (
                <div>
                    <input 
                        type="text" 
                        placeholder="Game code" 
                        value={roomCode} 
                        onChange={(e) => setRoomCode(e.target.value)} 
                    />
                    <button onClick={handleJoinRoom}>Enter</button>
                </div>
            ) : (
                <div>
                    <input 
                        type="text" 
                        placeholder="Team naam" 
                        value={teamName} 
                        onChange={(e) => setTeamName(e.target.value)} 
                    />
                    <button onClick={handleJoinRoom}>Enter</button>
                </div>
            )}
        </div>
    );
}
