const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;
const server = require("http").createServer(app);

app.use(cors());

app.get("/", (req, res) => {
    res.send("Socket.IO server is running");
});

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
