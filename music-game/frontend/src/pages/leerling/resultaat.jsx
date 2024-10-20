import React from "react";
import { useLocation } from "react-router-dom";

export default function Resultaat() {
    const location = useLocation();
    const { rankings } = location.state;

    const filteredRankings = Object.entries(rankings)
        .filter(([team]) => team && team !== "null" && team.trim() !== "");
    const sortedRankings = filteredRankings.sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-400">
            <h2 className="text-4xl font-bold text-white mb-6">Eindstand</h2>
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                {sortedRankings.map(([team, score], index) => (
                    <div key={index} className="flex justify-between mb-4">
                        <span className="text-xl font-semibold text-gray-800">{index + 1}. {team}</span>
                        <span className="text-xl font-semibold text-gray-800">{score} punten</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
