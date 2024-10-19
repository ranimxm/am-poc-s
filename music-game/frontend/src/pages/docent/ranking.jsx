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
    <div className="screen-container">
      <h3>Eindstand</h3>
      <div className="ranking-list">
        {rankings.map(([team, score], index) => (
          <p key={index}>{index + 1}. {team}: {score}</p>
        ))}
      </div>
      <button className="continue-button" onClick={handleFinish}>Verder</button>
    </div>
  );
}
