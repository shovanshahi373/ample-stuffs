const target = document.querySelector(".target");

import TextWriter from "./textWriter.js";

const skills = [
  "developer",
  "enthusiast",
  "problem solver",
  "mathematician",
  "logician",
];

const text = ["Build TypeWriter Effect In Pure JS"];

// const writer = new TextWriter(target, skills, 200);
const writer = new TextWriter(target, text, 200);
