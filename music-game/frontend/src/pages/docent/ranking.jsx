import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Ranking() {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetch("/latest-rankings")
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const sortedRankings = Object.entries(data.rankings)
            .filter(([team]) => team && team !== "null" && team.trim() !== "")
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);
          setRankings(sortedRankings);
        }
      })
      .catch(error => {
        console.error("Error fetching rankings:", error);
      });
  }, []);

  const handleFinish = () => {
    navigate("/docent");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-400">
      <h2 className="text-4xl font-bold text-white mb-6">Eindstand van de Quiz</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {rankings.map(([team, score], index) => (
          <div key={index} className="flex justify-between mb-4">
            <span className="text-xl font-semibold text-gray-800">{index + 1}. {team}</span>
            <span className="text-xl font-semibold text-gray-800">{score} punten</span>
          </div>
        ))}
      </div>
      <button 
        className="mt-8 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        onClick={handleFinish}
      >
        Terug naar Start
      </button>
    </div>
  );
}
