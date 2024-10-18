import { isLocalhost } from "./is-localhost.js";

const socket = io(isLocalhost());
const piano = document.getElementById("piano");

piano.addEventListener("click", (event) => {
    const note = event.target.dataset.note;
    if (note) {
        console.log("note playing", note);
        socket.emit("play_note", {instrument: "note played", note});
    }
});
socket.on("note_played", (data) => {
    const note = data.note;
    const instrument = data.instrument;
    console.log(`Received note: ${note} and ${instrument}`);
});
