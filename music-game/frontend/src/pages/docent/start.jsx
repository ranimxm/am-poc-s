import { useNavigate } from "react-router-dom";

export default function StartScreen() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/docent/musicFragment");
    };

    return (
        <div>
            <div>
                <h3>Join the game using code:</h3>
                <div>00000</div>
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
