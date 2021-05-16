const print = (data) => {
  console.log(JSON.stringify(data, null, 4));
};

const printMessage = (msg) => {
  console.log(msg);
};

const hash = (key = "", size) => {
  let code = 0;
  for (let i = 0; i < key.length; i++) {
    code += key.charCodeAt(i);
  }
  return code % size;
};

module.exports = { print, printMessage, hash };
