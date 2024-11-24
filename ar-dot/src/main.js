const objectInfo = {
  "chair": {
    description: "This CHAIR has an impact on the environment! Consider encouraging sustainable habits.",
    actionText: "Take action",
    secondaryPopup: {
      title: "Take action",
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
    description: "Every person can reduce their carbon footprint. Take steps to live sustainably!",
    actionText: "Take action",
    secondaryPopup: {
      title: "Take action",
      description:
        "Select an action to minimize your environmental impact.",
      items: [
        { points: "+3 pts", text: "Use public transport instead of driving" },
        { points: "+3 pts", text: "Reduce single-use plastics" },
        { points: "+2 pts", text: "Plant a tree in your community" },
      ],
    },
  },
  "bottle": {
    description: "This BOTTLE impacts the environment. Consider reducing waste and promoting recycling.",
    actionText: "Learn more",
    secondaryPopup: {
      title: "Learn more",
      description:
        "Select actions to minimize waste and improve recycling efforts.",
      items: [
        { points: "+3 pts", text: "Recycle bottles properly" },
        { points: "+2 pts", text: "Switch to reusable bottles" },
        { points: "+2 pts", text: "Support local recycling programs" },
      ],
    },
  },
  "plant": {
    description: "This PLANT contributes to a greener planet. Protect and nurture it!",
    actionText: "Learn more",
    secondaryPopup: {
      title: "Learn more",
      description:
        "Select actions to support plant health and contribute to environmental sustainability.",
      items: [
        { points: "+5 pts", text: "Plant a tree in your backyard or park" },
        { points: "+4 pts", text: "Water plants regularly to maintain their health" },
        { points: "+3 pts", text: "Add compost to enrich soil for better growth" },
      ],
    },
  },
  "tree": {
    description: "TREES are essential for a healthy planet. Protect and grow them for a sustainable future.",
    actionText: "Take action",
    secondaryPopup: {
      title: "Take action",
      description:
        "Trees absorb carbon dioxide and provide oxygen. Select actions to protect and grow trees.",
      items: [
        { points: "+5 pts", text: "Plant a tree to expand green cover" },
        { points: "+4 pts", text: "Avoid cutting down healthy trees" },
        { points: "+3 pts", text: "Join a tree-planting initiative" },
      ],
    },
  },
  "car": {
    description: "CARS contribute to greenhouse gas emissions. Take steps to reduce their environmental impact.",
    actionText: "Take action",
    secondaryPopup: {
      title: "take action",
      description:
        "Select actions to make your car usage more eco-friendly.",
      items: [
        { points: "+5 pts", text: "Switch to an electric or hybrid vehicle" },
        { points: "+4 pts", text: "Carpool to reduce the number of vehicles on the road" },
        { points: "+3 pts", text: "Ensure regular vehicle maintenance to optimize fuel efficiency" },
        { points: "+2 pts", text: "Use public transport or cycle instead of driving short distances" },
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

let totalPoints = 0;
const maxPoints = 100;
const progressBar = document.querySelector(".progress-bar__container");
const progressBarTop = document.querySelector(".progress-bar__top");
const progressBarBottom = document.querySelector(".world-icon__bottom");

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
    console.log(`Class set to: ${className}`);
    return this.dot.getAttribute("data-class");
  }

  init() {
    switch (this.prediction.class) {
      case "person":
      case "chair":
      case "bottle":
      case "cat":
      case "tree":
      case "car":
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
      console.log("Predictions: ", predictions);
      predictions.forEach(prediction => {
        console.log("Prediction: ", prediction);
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

    li.addEventListener("click", () => {
      const points = parseInt(item.points.replace("+", "").replace(" pts", "").trim());  
      totalPoints += points;
      totalPoints = Math.min(totalPoints, maxPoints);
      console.log(`Points Added: ${points}, Total Points: ${totalPoints}`);
      updateTopGlobe(totalPoints, points);
      updateGlobe(totalPoints);
      secondaryPopup.classList.remove("secondary-popup--active");
    });
    secondaryPopupItems.appendChild(li);
  });
  secondaryPopup.classList.add("secondary-popup--active");
};

const updateTopGlobe = (points, now) => {
  const topGlobeFill = document.querySelector("#top-globe-fill"); 
  const topGlobeWrapper = document.querySelector(".top-globe-wrapper");
  const pp = document.querySelector(".progress-bar");
  const pointsNotification = document.createElement("div");

  const fillHeight = (points / maxPoints) * 55;
  const fillY = 55 - fillHeight;

  topGlobeFill.setAttribute("height", fillHeight);
  topGlobeFill.setAttribute("y", fillY);

  topGlobeWrapper.style.opacity = 1;
  topGlobeWrapper.style.visibility = "visible";

  pointsNotification.className = "points-notification";
  pointsNotification.textContent = `+${now} pts`;
  pp.appendChild(pointsNotification);

  setTimeout(() => {
    if (topGlobeFill && pointsNotification) {
      topGlobeWrapper.style.opacity = 0;
      topGlobeWrapper.style.visibility = "hidden";

      pointsNotification.style.opacity = 0;
      setTimeout(() => pointsNotification.remove(), 500);
    }
   }, 4000);

};

const updateGlobe = (points) => {
    const globeFill = document.querySelector("#globe-fill");

    const fillHeight = (points / maxPoints) * 55;
    const fillY = 55 - fillHeight;

    globeFill.setAttribute("height", fillHeight);
    globeFill.setAttribute("y", fillY);
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
