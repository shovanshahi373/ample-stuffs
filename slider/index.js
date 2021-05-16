// import Slider from "./Slider.js";

const frames = document.querySelectorAll(".frame");
const wrapper = document.querySelector(".wrapper");
const container = document.querySelector(".container");

let startX = 0;
let currentX = 0;
let diffX = 0;
let translated = 0;
let clicking = false;
let animationId = null;
let currentIndex = 0;

const { left: cX, width } = container.getBoundingClientRect();

wrapper.addEventListener("mousedown", (e) => {
  wrapper.classList.add("grabbing");
  clicking = true;
  startX = e.offsetX;
  currentX = e.offsetX;
  diffX = startX - currentX + translated;
  animate();
});

wrapper.addEventListener("mouseleave", (e) => {
  wrapper.classList.remove("grabbing");
  clicking = false;
  cancelAnimationFrame(animationId);
  wrapper.style.transform = `translateX(calc(-1px * ${translated}))`;
});

// const slider = new Slider();

wrapper.addEventListener("mouseup", (e) => {
  wrapper.classList.remove("grabbing");
  clicking = false;
  // const movedBy = diffX - translated;
  const movedBy = startX - currentX;
  // console.log("dif", diffX, translated);
  if (movedBy >= 100 && currentIndex < 2) {
    currentIndex += 1;
  } else if (movedBy <= -100 && currentIndex > 0) {
    currentIndex -= 1;
  }
  translated = currentIndex * width;
  cancelAnimationFrame(animationId);
  wrapper.style.transform = `translateX(calc(-1px * ${translated}))`;
});

wrapper.addEventListener("mousemove", (e) => {
  if (clicking) {
    currentX = e.offsetX;
    diffX = startX - currentX + translated;
  }
});

const animate = () => {
  wrapper.style.transform = `translateX(calc(-1px * ${diffX}))`;
  animationId = requestAnimationFrame(animate);
};
