// const Deck = require("./Card");
// const Player = require("./Player");

import Deck from "./Card.js";
import Player from "./Player.js";

export default class Game {
  constructor(mode) {
    this.players = [];
    this.currentDeck = new Deck();
    this.isRunning = false;
    this.Currentbidding = 5;
    this.turn = 0;
    this.mode = mode || "seen";
    this.sum = 0;
  }
  enter(player) {
    if (this.isRunning)
      return console.log("game is curently running, wait to finish...");
    if (!this.players.length === 4) return console.log("max players exceeded!");
    this.players.push(new Player(player));
  }
  start() {
    if (this.players.length < 2) return console.log("no players found...");
    this.isRunning = true;
    const rounds = 3;
    let counter = 1;
    for (let i = 0; i < rounds; i++) {
      for (let j = 0; j < this.players.length; j++) {
        this.players[j].conjure({
          ...this.currentDeck.cards.pop(),
          playOrder: counter,
        });
        // console.log(this.currentDeck.cards.length);
        counter++;
      }
    }
    this.players = this.players.map((player) => ({
      ...player,
      money: player.money - this.Currentbidding,
    }));
  }
  reveal() {
    if (this.mode !== "blind") return null;
    this.players.forEach((player) =>
      console.log(player.name + "'s hand:\n ", player.hand)
    );
  }
  next() {
    if (!this.isRunning) return;
    const currentPlayer = this.players[this.turn];
    if (currentPlayer && currentPlayer.hand.length) {
      currentPlayer.play();
      this.turn = (this.turn + 1) % this.players.length;
    }
  }
  stop() {
    this.isRunning = false;
    this.currentDeck = new Deck();
    this.players = [];
    this.turn = 0;
  }
}
