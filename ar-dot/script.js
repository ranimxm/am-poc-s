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
        console.log(this.prediction)
        const x = bbox[0] + bbox[2] / 2;
        const y = bbox[1] + bbox[3] / 2;
        const normalizedX = (x / this.video.videoWidth) * 4 - 2;
        const normalizedY = -((y / this.video.videoHeight) * 4 - 4);
        this.dot.setAttribute("position", `${normalizedX} ${normalizedY} -3`);
        return true;
    } 

    handlePerson() {
        return this.setPosition();
    }
    handleCat() {
        return this.setPosition();
    }
    handleCellPhone() {
        return this.setPosition();
    }
    handleDefault() {
        return false;
    }

    execute() {
        switch (this.prediction.class) {
            case "person":
                return this.handlePerson();
            case "cat":
                return this.handleCat();
            case "Cell phone":
                return this.handleCellPhone();
            default:
                return this.handleDefault();
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
            detectPose = handler.execute();
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
            console.log("Dot clicked!");
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
