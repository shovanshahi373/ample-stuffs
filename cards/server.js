const express = require("express");

const app = express();
app.use(express.static("./assets"));
// const Deck = require("./assets/modules/Card");
// const Player = require("./assets/modules/Player");

// const game = new Game(new Deck());
app.listen(3000, () => {
  console.log("server running on 3000...");
});
