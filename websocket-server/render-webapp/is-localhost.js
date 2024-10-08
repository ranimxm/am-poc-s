export const isLocalhost = () => {
    const browserUrl = window.location.href;
    return browserUrl.includes("render-webapp") ? "localhost:8080" : "https://webserver-socketio.onrender.com/";
};
