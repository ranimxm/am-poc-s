import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartScreen() {
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/create-room", {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => setRoomCode(data.roomCode));
    }, []);

    const handleStart = () => {
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
                <span>Team 1</span>
                <span>Team 2</span>
                <span>Team 3</span>
                <span>Team 4</span>
            </div>
        </div>
    )
}
