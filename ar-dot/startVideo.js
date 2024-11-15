const setupCamera = async () => {
    const video = document.getElementById("video");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
};
setupCamera();
