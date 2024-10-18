const video = document.getElementById("videoElement");
let net;

const setupCamera = async() => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => resolve(video);
    });
}

const detectPose = async()  => {
    const model = poseDetection.SupportedModels.BlazePose; 
    const detectorConfig = {
        runtime: "mediapipe",
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
        enableSmoothing: true,
        modelType: "full"
    };
    net = await poseDetection.createDetector(model, detectorConfig);
    await setupCamera();
    video.play();
    detectFrame();
}

const detectFrame = async() => {
    const poses = await net.estimatePoses(video, {
        flipHorizontal: true
    });
    const keypoints = poses[0].keypoints;

    const leftWrist = keypoints[15];
    const rightWrist = keypoints[16];
    const leftShoulder = keypoints[11];
    const rightShoulder = keypoints[12];

    const handsAboveShoulders = (leftWrist.y < leftShoulder.y) && (rightWrist.y < rightShoulder.y);
    const horizontalDistance = Math.abs(leftWrist.x - rightWrist.x);

    if (horizontalDistance < 100) {
        console.log("klap klap");
    }
    if (handsAboveShoulders) {
        console.log("beide handen boven schouders");
    }
    if (leftWrist.y < leftShoulder.y && !handsAboveShoulders) {
        console.log("linkerhand boven schouder");
    }
    if (rightWrist.y < rightShoulder.y && !handsAboveShoulders) {
        console.log("rechterhand boven schouder");
    }
    requestAnimationFrame(detectFrame);
}

detectPose();
