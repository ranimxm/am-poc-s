import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../util/socket-context";

export default function StartScreen() {
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
        <div>
            <div>
                <h3>Join the game using code:</h3>
                <div>{roomCode}</div>
                <button onClick={handleStart}>Start</button>
            </div>
            <div>
                <h3>Teams:</h3>
                {teams.map((team, index) => (
                    <div key={index}>{team}</div>
                ))}
            </div>
        </div>
    )
}
