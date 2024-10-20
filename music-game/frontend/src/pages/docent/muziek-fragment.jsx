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
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
            {phase === 'playMusic' && (
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Muziekfragment {currentTrack + 1}</h2>
                    <div className="text-white text-6xl mb-6">🎵</div>
                    <div className="text-4xl font-bold text-white">{timeLeft}</div>
                </div>
            )}
            {phase === 'discuss' && (
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Bespreek met de klas</h2>
                    <div className="text-4xl font-bold text-white">{timeLeft}</div>
                </div>
            )}
            {phase === 'choose' && (
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Leerlingen maken hun keuze</h2>
                    <div className="text-4xl font-bold text-white">{timeLeft}</div>
                </div>
            )}
            {phase === 'ranking' && (
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Bekijk de resultaten</h2>
                    <button 
                        className="mt-6 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                        onClick={handlePhaseChange}
                    >
                        Volgende Fragment
                    </button>
                </div>
            )}
            <audio id="music-fragment" preload="auto" />
        </div>
    )
}
