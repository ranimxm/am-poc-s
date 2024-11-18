import { objectInfo } from "./objectInfo.js";

const popup = document.querySelector("#popup");
const popupTitle = document.querySelector("#popup-title");
const popupDescription = document.querySelector("#popup-description");
const closePopup = document.querySelector("#close-popup");

class objectHandler {
    constructor(prediction, video, dot) {
        this.prediction = prediction;
        this.video = video;
        this.dot = dot;
    }

    setPosition() {
        const bbox = this.prediction.bbox;
        const x = bbox[0] + bbox[2] / 2;
        const y = bbox[1] + bbox[3] / 2;
        const videoAspectRatio = this.video.videoWidth / this.video.videoHeight;
        const normalizedX = (x / this.video.videoWidth - 0.5) * videoAspectRatio * 2;
        const normalizedY = -(y / this.video.videoHeight - 0.5) * 2;
        this.dot.setAttribute("position", `${normalizedX} ${normalizedY} -3`);
        return this.dot.getAttribute("position");
    } 

    setClass(className) {
        this.dot.setAttribute("data-class", className);
        return this.dot.getAttribute("data-class");
    }

    init() {
        switch (this.prediction.class) {
            case "person":
            case "cat":
            case "Cell phone":
                this.setPosition();
                return this.setClass(this.prediction.class);
            default:
                return false;
        }
    }
};

const detectPose = async () => {
    const video = document.querySelector("#video");
    const dot = document.querySelector("#dot");
    const model = await cocoSsd.load();
    let detectPose = false;

    setInterval(async () => {
        const predictions = await model.detect(video);        
        predictions.forEach(prediction => {
            const handler = new objectHandler(prediction, video, dot);
            if (handler.init()) {
                detectPose = true;
            }
            });
        dot.setAttribute("visible", detectPose);
    }, 1000);
};

detectPose();

// register A-frame
AFRAME.registerComponent("popup-handler", {
    init: function () {
        const dot = this.el;
        dot.addEventListener("click", () => {
            const objectClass = dot.getAttribute("data-class");
            if (objectClass && objectInfo[objectClass]) {
                popupTitle.textContent = objectInfo[objectClass].title;
                popupDescription.textContent = objectInfo[objectClass].description;
                popup.style.display = "block";
            }
        });
    }
});

document.querySelector("#dot").setAttribute("popup-handler", "");

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});
