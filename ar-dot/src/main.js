const objectInfo = {
  "chair": {
    description: "This CHAIR has an impact on the environment! Consider encouraging sustainable habits.",
    actionText: "Take action",
    secondaryPopup: {
      title: "Take Action",
      description:
        "Select any action to add it to your list. On the right you can see the overall impact it will have on the environment.",
      items: [
        { points: "+3 pts", text: "Switch to eco-friendly furniture" },
        { points: "+2 pts", text: "Donate unused chairs" },
        { points: "+1 pts", text: "Repair instead of replace" },
      ],
    },
  },
  "person": {
    description: "Cats are lovely creatures!",
    actionText: "Take action",
    secondaryPopup: {
      title: "Take Action",
      description:
        "Select an action to reduce your personal carbon footprint.",
      items: [
        { points: "+3 pts", text: "Use public transport" },
        { points: "+3 pts", text: "Reduce single-use plastics" },
        { points: "+2 pts", text: "Plant a tree" },
      ],
    },
  },
  "bottle": {
    description: "This BOTTLE has an environmental impact. Consider recycling old devices.",
    actionText: "Learn more",
    secondaryPopup: {
      title: "Learn More",
      description:
        "This bottle has an environmental impact. Learn how you can minimize it.",
      items: [
        { points: "+3 pts", text: "Recycle properly" },
        { points: "+2 pts", text: "Use reusable bottles" },
        { points: "+2 pts", text: "Support recycling initiatives" },
      ],
    },
  },
};

const popup = document.querySelector(".popup");
const popupDescription = document.querySelector(".popup__description");
const closePopup = document.querySelector(".popup__close-btn");
const popupActionBtn = document.querySelector(".popup__action-btn");

const secondaryPopup = document.querySelector(".secondary-popup");
const secondaryPopupTitle = document.querySelector(".secondary-popup__title");
const secondaryPopupDescription = document.querySelector(
    ".secondary-popup__description"
);
const secondaryPopupItems = document.querySelector(".secondary-popup__items");
const secondaryPopupClose = document.querySelector(".secondary-popup__close-btn");

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
        popupActionBtn.setAttribute("data-class", objectClass);
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

const openSecondaryPopup = (objectClass) => {
  const detail = objectInfo[objectClass].secondaryPopup;
  secondaryPopupTitle.textContent = detail.title;
  secondaryPopupDescription.textContent = detail.description;
  secondaryPopupItems.innerHTML = "";

  detail.items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "secondary-popup__item";
    li.innerHTML = `
    <span class="secondary-popup__points">${item.points}</span> 
    <p class="secondary-popup__item.text">${item.text}</p>
    `;
    secondaryPopupItems.appendChild(li);
  });
  secondaryPopup.classList.add("secondary-popup--active");
};

popupActionBtn.onclick = () => {
  const objectClass = popupActionBtn.getAttribute("data-class");
  if (objectClass) {
    openSecondaryPopup(objectClass);
    popup.style.display = "none";
  }
};

secondaryPopupClose.addEventListener("click", () => {
  secondaryPopup.classList.remove("secondary-popup--active");
});
