import { useNavigate } from "react-router-dom";

export default function Ranking() { 
    const navigate = useNavigate();
    
    const handleFinish = () => {
        navigate("/docent");
    };

    return (
        <div className="screen-container">
        <h3>Final Rankings</h3>
        <div className="ranking-list">
            <p>Team 1: 50</p>
            <p>Team 2: 25</p>
            <p>Team 3: 10</p>
        </div>
        <button className="continue-button" onClick={handleFinish}>Continue</button>
        </div>
    );   
}
