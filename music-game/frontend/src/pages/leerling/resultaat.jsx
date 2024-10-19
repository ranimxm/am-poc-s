import React from "react";
import { useLocation } from "react-router-dom";

export default function Resultaat() {
    const location = useLocation();
    const { rankings } = location.state;

    const filteredRankings = Object.entries(rankings)
        .filter(([team]) => team && team !== "null" && team.trim() !== "");
    const sortedRankings = filteredRankings.sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

    return (
        <div>
            <h3>Jij bent nummer:</h3>
            <div>
                {sortedRankings.map(([team, score], index) => (
                    <p key={index}>{index + 1}. {team}: {score}</p>
                ))}
            </div>
        </div>
    );
}
