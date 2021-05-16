export default class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.score = 0;
    this.money = 100;
    this.seen = false;
    this.chargePerRound = 5;
    //players who have seen the hand and continue to play is locked to reveal themselves
    this.locked = this.seen === true;
  }
  play(move, cost, currentBidding) {
    if (!this.isMoveValid(cost, currentBidding)) return false;
    if (!this.seen && move === "show hand") {
      this.viewHand();
    }
    if (move === "reveal") {
      if (this.money < currentBidding * 2) {
      }
    }
    return Math.max(cost, currentBidding);
  }
  isMoveValid(cost) {
    return this.money >= cost && cost >= currentBidding;
  }

  wrap() {}
  // play(id) {
  //   let index;
  //   if (id) {
  //     if (!this.hand.length) return console.log("no cards to play");
  //     index = this.hand.findIndex((card) => card.id === id);
  //   } else {
  //     index = this.hand[Math.floor(Math.random() * this.hand.length)];
  //   }
  //   return this.hand.splice(index, 1);
  // }
  conjure(card) {
    this.hand.push(card);
    return card.name;
  }
  viewHand() {
    this.seen = true;
    this.chargePerRound = this.chargePerRound * 2;
    return this.chargePerRound;
  }
}
