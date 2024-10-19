import React, { createContext, useState } from "react";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [roomCode, setRoomCode] = useState("");
  const [teamName, setTeamName] = useState("");

  return (
    <RoomContext.Provider value={{ roomCode, setRoomCode, teamName, setTeamName }}>
      {children}
    </RoomContext.Provider>
  );
};
