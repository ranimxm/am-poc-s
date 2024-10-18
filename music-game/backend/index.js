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

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
