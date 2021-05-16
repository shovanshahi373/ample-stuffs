const divs = document.querySelectorAll("div");

let clickedNode = null;
let clicking = false;
const mouse = {
  x: 0,
  y: 0,
};

const handleMouseDown = (e) => {
  clicking = true;
  console.log("clicking....");
  clickedNode = e.currentTarget;
  mouse.x = e.clientX - e.target.offsetLeft;
  mouse.y = e.clientY - e.target.offsetTop;
};

const hanleMouseUp = (e) => {
  clicking = false;
  clickedNode = null;
  console.log("not clicking....");
};

const handleMouseMove = (e) => {
  e.preventDefault();
  // console.log(clicking);
  if (clicking) {
    e.currentTarget.style.left = mouse.x + e.clientX + "px";
    e.currentTarget.style.top = mouse.y + e.clientY + "px";
    // console.log(mouse);
  }
};

divs.forEach((div) => {
  div.addEventListener("mousedown", handleMouseDown);
  div.addEventListener("mouseup", hanleMouseUp);
  document.body.addEventListener("mousemove", handleMouseMove);
});
