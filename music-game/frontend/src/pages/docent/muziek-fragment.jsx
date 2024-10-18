import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export default function MusicFragment({ musicFragments }) {
    const [phase, setPhase] = useState("playMusic");
    const [timeLeft, setTimeLeft] = useState(15);
    const [currentTrack, setCurrentTrack] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const audio = document.getElementById("music-fragment");
        switch (phase) {
            case "playMusic":
                audio.src = musicFragments[currentTrack].src;
                audio.play();
                setTimeLeft(15);
                break;
            case "discuss":
                audio.pause();
                setTimeLeft(30);
                break;
            case "choose":
                setTimeLeft(15);
                break;
        }
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handlePhaseChange();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [phase, currentTrack, musicFragments]);

    const handlePhaseChange = () => { 
        switch (phase) {
            case "playMusic":
                setPhase("discuss");
                break;
            case "discuss":
                setPhase("choose");
                break;
            case "choose":
                if (currentTrack < musicFragments.length - 1) {
                    setPhase("ranking");
                } else {
                    navigate("/docent/rankings");
                }
                break;
            case "ranking":
                setCurrentTrack((prevTrack) => prevTrack + 1);
                setPhase("playMusic");
                break;
        }
    };

    return (
        <div className="screen-container">
            {phase === 'playMusic' && (
                <div>
                <h3>Listening to the music fragment...</h3>
                <div className="emotion-circle">
                    <span>{timeLeft}</span>
                </div>
                </div>
            )}
            {phase === 'discuss' && (
                <div>
                <h3>Discuss the music...</h3>
                <div className="emotion-circle">
                    <span>{timeLeft}</span>
                </div>
                </div>
            )}
            {phase === 'choose' && (
                <div>
                <h3>Choose your feeling in 15 seconds...</h3>
                <div className="emotion-circle">
                    <span>{timeLeft}</span>
                </div>
                </div>
            )}
            {phase === 'ranking' && (
                <div>
                <h3>Showing rankings...</h3>
                <button onClick={handlePhaseChange}>Next Track</button>
                </div>
            )}
            <audio id="music-fragment" preload="auto" />
        </div>
    )
}
