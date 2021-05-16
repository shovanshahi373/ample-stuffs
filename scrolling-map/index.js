const element = document.getElementById("progress-bar");
const vertical = document.getElementById("advanced-progress-bar");
const $sections = document.querySelectorAll("body > section");
const arrowHandle = document.getElementById("arrow-handle");
let timerId = null;
let bool = true;
let prev = null;
let current = null;
const totalHeight = document.body.clientHeight - innerHeight;

const elementHeight = parseInt(
  getComputedStyle(vertical, null).getPropertyValue("height")
);

const drawMapAreas = () => {
  const stripes = [];
  const length = $sections.length;
  const height = elementHeight / length;
  $sections.forEach((section) => {
    const div = document.createElement("div");
    div.classList.add("region");
    div.style.setProperty("--height", height);
    div.dataset.target = section.dataset.title;
    stripes.push(div);
  });
  vertical.append(...stripes);
};

drawMapAreas();

const hideBar = () => {
  vertical.classList.remove("hidden");
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    vertical.classList.add("hidden");
  }, 5000);
};

hideBar();

const getScrollHeight = (event) => {
  hideBar();
  if (!bool) return;
  id = setTimeout(() => {
    const percentage = (window.pageYOffset / totalHeight) * 100;
    element.style.setProperty("--progress", percentage);
    vertical.style.setProperty("--arrow-offsetY", percentage);
    bool = true;
  }, 0);
  bool = false;
};

getScrollHeight();

window.addEventListener("scroll", getScrollHeight);

vertical.addEventListener("click", function (e) {
  const { y } = vertical.getBoundingClientRect();
  const posY = (e.clientY - y) / elementHeight;
  scrollTo({ top: posY * totalHeight, behavior: "smooth" });
});

window.addEventListener("mousemove", hideBar);

arrowHandle.addEventListener("drag", function (e) {
  // e.preventDefault();
  const { y, height } = vertical.getBoundingClientRect();
  const ymin = 0;
  const ymax = y + height;
  const current = e.clientY - y;
  if (current >= ymin && e.clientY <= ymax) {
    scrollTo({
      top: (current / elementHeight) * totalHeight,
      behavior: "auto",
    });
  }
});

document.body.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.style.cursor = "dragging";
});
