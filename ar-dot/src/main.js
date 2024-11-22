const objectInfo = {
  "chair": {
    description: "This CHAIR has an impact on the environment! Consider encouraging sustainable habits.",
    actionText: "Take action",
  },
  "person": {
    description: "Cats are lovely creatures!",
    actionText: "Take action",
  },
  "bottle": {
    description: "This BOTTLE has an environmental impact. Consider recycling old devices.",
    actionText: "Learn more",
  },
};

const popup = document.querySelector(".popup");
const popupDescription = document.querySelector(".popup__description");
const closePopup = document.querySelector(".popup__close-btn");
const popupActionBtn = document.querySelector(".popup__action-btn");

const setupCamera = async () => {
  const video = document.querySelector("#video");
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment", 
      width: { ideal: 640 },
      height: { ideal: 480 },
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => resolve(video);
  });
}

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

    const normalizedX = (x / this.video.videoWidth) * 4 - 2;
    const normalizedY = -((y / this.video.videoHeight) * 4 - 2) + 1;
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
      case "chair":
      case "bottle":
        this.setPosition();
        return this.setClass(this.prediction.class);
      default:
        return false;
      }
  }
};

const detectPose = async () => {
    const video = await setupCamera();
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
AFRAME.registerComponent("clickhandler", {
  init: function () {
    const showPopup = () => {
      const objectClass = this.el.getAttribute("data-class");
      if (objectClass && objectInfo[objectClass]) {
        const info = objectInfo[objectClass];
        popupDescription.textContent = info.description;
        popupActionBtn.textContent = info.actionText;
        popupActionBtn.onclick = () => {
          alert(`You chose: ${info.actionText}`);
        };
        popup.style.display = "block";
      }
    };
    this.el.addEventListener("click", showPopup);
    this.el.addEventListener("touchstart", showPopup);
  }
});

document.querySelector("#dot").setAttribute("clickhandler", "");

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});
