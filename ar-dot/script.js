const detectPose = async () => { 
    const video = document.querySelector("#video");
    const dot = document.querySelector("#dot");
    const model = await cocoSsd.load();
    let detectPose = false;

    setInterval(async () => {
        const predictions = await model.detect(video);
        console.log(predictions)
        predictions.forEach(prediction => {
            if (prediction.class = "person") {
                detectPose = true;
                const bbox = prediction.bbox;
                // center the bounding boxes
                const x = bbox[0] + bbox[2] / 2;
                const y = bbox[1] + bbox[3] / 2;
                // map to range suitable for AR scene
                const normalizedX = (x / video.videoWidth) * 4 - 2;
                const normalizedY = -((y / video.videoHeight) * 4 - 4);

                dot.setAttribute('position', `${normalizedX} ${normalizedY} -3`);
            }
        });
        dot.setAttribute('visible', detectPose);
    }, 1000);
}    

detectPose();