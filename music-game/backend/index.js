import { RoomManager } from "./RoomManager.js";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";

const app = express();
const port = 8080;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());
app.use(express.json());

const roomManager = new RoomManager();

app.get("/", (req, res) => {
    res.send("Socket.IO server is running");
});

app.get("/create-room", (req, res) => {
    const roomCode = roomManager.createRoom();
    res.json({ roomCode });
});


app.get("/latest-rankings", (req, res) => {
  const rooms = Object.values(roomManager.rooms);
  if (rooms.length > 0) {
    const room = rooms[0];
    const scores = room.getScores();
    res.json({ success: true, rankings: scores });
  } else {
    res.json({ success: false, message: "Geen actieve kamers gevonden" });
  }
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinRoom", ({ roomCode, teamName }) => {
        const roomJoined = roomManager.joinRoom(roomCode, teamName);
        if (roomJoined) {
            socket.join(roomCode);
            io.to(roomCode).emit("teamJoined", roomManager.getRoomTeams(roomCode));
        }
    });
    
    socket.on("startGame", (roomCode) => {
        const gameStarted = roomManager.startGameInRoom(roomCode);
        if (gameStarted) {
            io.to(roomCode).emit("gameStarted");
        }
    });

    socket.on("submitChoice", ({ roomCode, teamName, timeTaken }) => {
        const success = roomManager.submitChoice(roomCode, teamName, timeTaken);
        if (success) {
            const scores = roomManager.getRoomScores(roomCode);
            console.log(scores);
            io.to(roomCode).emit("updateRankings", scores);
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
