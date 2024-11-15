const detectPose = async () => { 
    const video = document.getElementById("video");
    const model = await cocoSsd.load();

    setInterval(async () => {
        const predictions = await model.detect(video);
        console.log(predictions)
    }, 1000);
}    

detectPose();