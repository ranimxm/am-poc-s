const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const port = 8080;
const io = socketIo(server, {
    cors: {
        origin: "*",
    }
});

app.use(cors());

app.get("/", (req, res) => { 
    res.send("Socket.IO server is running");
});

io.on("connection", (socket) => { 
    console.log("A user connected:", socket.id);

    socket.on("chat message", (msg) => {
        console.log("Message received:", msg);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
