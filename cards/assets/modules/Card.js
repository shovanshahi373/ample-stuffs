import { cards, suits } from "../constants.js";

// const { cards, suits } = require("../constants");

class Card {
  constructor(number, suit) {
    this.num = number;
    this.suit = suit;
    this.name = this.num + " of " + this.suit;
    this.id = this.num + this.suit[0];
    this.img = `../images/${this.id}.png`;
    this.playOrder = "";
  }
}

export default class Deck {
  constructor() {
    this.cards = [];
    this.size = this.cards.length;
    this.build();
    this.shuffle();
  }
  build() {
    for (const i of cards) {
      for (const j of suits) {
        this.cards.push(new Card(i, j));
      }
    }
  }
  shuffle() {
    const clone = [...this.cards];
    const shuffledCards = [];
    for (let i = 0; i < this.cards.length; i++) {
      const rng = Math.floor(Math.random() * clone.length);
      const el = clone.splice(rng, 1).pop();
      shuffledCards.push(el);
    }
    this.cards = shuffledCards;
    return this.cards;
    // shuffledCards.push(clone.splice(rng, 1).pop());
    // for (let i = 0; i < this.cards.length; i++) {
    //   const rng = Math.floor(Math.random() * this.cards.length);
    //   const draw = this.cards[rng];
    //   const temp = this.cards.pop();
    //   this.cards[rng] = temp;
    //   this.cards.push(draw);
    //   return this.cards;
    // }
    // console.log(this.cards);
  }
}

// const deck = new Deck();

// deck.shuffle();
