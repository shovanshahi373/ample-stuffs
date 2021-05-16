import { generateId } from "./utils.js";

const $listItems = document.querySelector(".list-items");
const $pagination = document.querySelector(".pagination");

const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, nihil sed sit tenetur explicabo molestiae debitis quidem reiciendis in mollitia accusamus repudiandae quae corrupti reprehenderit exercitationem voluptatibus doloribus voluptas animi distinctio facere asperiores adipisci obcaecati quod beatae. Quidem, corporis laborum.";

const size = 10;

const data = Array(500)
  .fill(0)
  .map((_) => {
    const offset = (Math.random() * (text.length - size)) | 0;
    const title = text.slice(offset, offset + 10).trim();
    return {
      title,
      id: generateId(),
    };
  });

// console.log(data);
const limit = 10;
let currentPage = 1;

const RECORDS = data.length;

// const sliced = (page = 0) => data.slice(page * limit, page * limit + limit);

let labels = [];
const MAX_LABELS = 12;

const buildList = (page = 0) => {
  $listItems.innerHTML = "";
  const records = [];
  const sliced = data.slice(page * limit, page * limit + limit);
  for (let i = 0; i < sliced.length; i++) {
    const record = document.createElement("div");
    record.classList.add("record");
    const { title, id } = sliced[i];
    record.id = id;
    record.innerText = title;
    records.push(record);
  }
  $listItems.append(...records);
};

let prevRef = -1;

const buildLabels = (page) => {
  $pagination.innerHTML = "";
  let j = -1;
  const labels = [];
  const index = (LIMIT + 1) / 2;
  for (let i = 0; i < LIMIT; i++) {
    if (
      i < 3 ||
      i > LIMIT - 3 ||
      i === Math.floor(index) - 1 ||
      i === Math.ceil(index) - 1 ||
      (i >= page - 1 && i <= page + 1)
    ) {
      const label = document.createElement("span");
      label.innerText = i + 1;
      label.classList.add("pagination-label");
      if (j !== -1 && j + 1 !== i) {
        const dots = document.createElement("span");
        dots.innerText = "...";
        labels.push(dots);
        dots.classList.add("preceding-dots");
      }
      if (i === page) {
        label.classList.add("selected");
      }
      label.setAttribute("data-page", i + 1);
      label.addEventListener("click", () => render(i));
      labels.push(label);
      j = i;
    }
  }
  $pagination.append(...labels);
};

const render = (i = 0) => {
  if (prevRef !== i) {
    buildList(i);
    // !!labels[prevRef] && labels[prevRef].classList.remove("selected");
    // labels[i].classList.add("selected");
    buildLabels(i);
    prevRef = i;
  }
};

const LIMIT = (RECORDS / limit) | 0;
for (let i = 0; i < LIMIT; i++) {
  const label = document.createElement("span");
  label.innerText = i + 1;
  label.classList.add("pagination-label");
  label.setAttribute("data-page", i + 1);
  label.addEventListener("click", () => render(i));
  labels.push(label);
}

render();

// $pagination.append(...labels);
