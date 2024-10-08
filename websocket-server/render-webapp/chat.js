import { isLocalhost } from "./is-localhost.js";

const socket = io(isLocalhost());

const sendMessage = (event) => {
    event.preventDefault();
    const message = document.getElementById("message").value;
    socket.emit("chat message", message);
    document.getElementById("message").value = "";
};

socket.on("chat message", (msg) => {
    const item = document.createElement("li");
    item.textContent = msg;
    document.getElementById("messages").appendChild(item);
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("messageForm").addEventListener("submit", sendMessage);
});
