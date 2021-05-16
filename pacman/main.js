import { objects, level, objectTypes } from "./variables.js";

const imgLeft = document.querySelector("img.left");
const imgRight = document.querySelector("img.right");
const imgBottom = document.querySelector("img.bottom");
const imgTop = document.querySelector("img.top");
let img = imgRight;
const drawObject = (x, y, item) => {
  switch (item) {
    case 0:
      ctx.beginPath();
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      ctx.stroke();
      ctx.closePath();
      break;
    case 1:
      ctx.beginPath();
      ctx.fillStyle = "yellow";
      ctx.arc(
        x * cellSize + 0.5 * cellSize,
        y * cellSize + 0.5 * cellSize,
        2,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
      ctx.closePath();
      break;
    case 2:
      ctx.beginPath();
      ctx.fillStyle = "yellow";
      ctx.arc(
        x * cellSize + 0.5 * cellSize,
        y * cellSize + 0.5 * cellSize,
        5,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
      ctx.closePath();
      break;
    case 3:
      ctx.beginPath();
      ctx.fillStyle = "transparent";
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      ctx.closePath();
      break;
    case 6:
      console.log(x, y);
      ctx.beginPath();
      ctx.drawImage(img, x * cellSize, y * cellSize, 20, 20);
      ctx.closePath();
      break;
    default:
      break;
  }
};
const canvas = document.querySelector("canvas");
const w = (canvas.width = 600);
const h = (canvas.height = 500);
const cellSize = 20;
const ctx = canvas.getContext("2d");

level.forEach((row, y) => {
  row.forEach((cell, x) => {
    drawObject(x, y, cell);
  });
});
console.log(img);
// ctx.scale(8, 8);
ctx.drawImage(img, 40, 20, 20, 20);
let x = 14;
let y = 19;
const acceleration = 0.1;
let vx = 1 * acceleration;
let vy = 0 * acceleration;
let stampedTime = 0;
let timeElapsed = 0;

const move = (e) => {
  console.log(e.key);
  if (e.key === "w") {
    //checkCollisionTop
    vy = -1 * acceleration;
    y = y + vy;
    vx = 0;
    img = imgTop;
  }
  if (e.key === "a") {
    // checkCollisionLeft;
    vx = -1 * acceleration;
    vy = 0;
    img = imgLeft;
  }
  if (e.key === "d") {
    // checkCollisionRight;
    vx = 1 * acceleration;
    vy = 0;
    img = imgRight;
  }
  if (e.key === "s") {
    // checkCollisionBottom;
    vy = 1 * acceleration;
    vx = 0;
    img = imgBottom;
  }
};

const animate = (currentTimeStamp) => {
  // console.log(currentTimeStamp / 1000);
  const diff = Math.floor(currentTimeStamp - stampedTime);
  // console.log(timeElapsed);
  timeElapsed += diff;
  if (timeElapsed >= 10) {
    // console.log("a sec passed");
    ctx.clearRect(0, 0, w, h);
    level.map((row, y) => {
      row.map((cell, x) => {
        drawObject(x, y, cell);
      });
    });
    ctx.drawImage(img, x * cellSize, y * cellSize, 20, 20);
    if (x >= 0.1 && x <= Math.floor(w / cellSize)) {
      x += vx;
    } else {
      vx = 0;
    }
    if (y >= 0.1 && y <= Math.floor(h / cellSize)) {
      y += vy;
    } else {
      vy = 0;
    }
    timeElapsed = 0;
  }
  stampedTime = currentTimeStamp;

  requestAnimationFrame(animate);
};

const init = () => {
  animate((stampedTime = 0));
  requestAnimationFrame(animate);
};

init();

window.addEventListener("keypress", move);
