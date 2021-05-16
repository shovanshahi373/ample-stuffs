import Game from "../modules/Game.js";
const pile = document.querySelector(".deckPile");
const playerHandTemplate = document.getElementById("player-hand").content;
const container = document.querySelector(".container");
const deck = [];

const game = new Game();
// game.currentDeck.cards.forEach((card, i) => {
//   const div = document.createElement("div");
//   div.style.backgroundImage = `url(${card.img})`;
//   div.classList.add("card");
//   pile.appendChild(div);
//   deck.push(div);
// });
let currentBidding = 5;

game.enter("sovan");
game.enter("srijan");
game.enter("rajji");
game.enter("comp");

game.start();

game.players.forEach((player, i) => {
  const playerHand = playerHandTemplate.cloneNode(true);
  const handRef = playerHand.querySelector(".hand");
  handRef.classList.add(`hand-player-${i + 1}`);

  player.hand.forEach((card, j) => {
    const slot = playerHand.querySelector(`.hand .slot-${j + 1}`);
    const div = document.createElement("div");
    div.classList.add("card", "decked");
    div.style.backgroundImage = `url(${card.img})`;
    let deltaRotation = Math.random() * 10 - 5;
    if (i === 2 || i === 3) {
      // deltaRotation += 90;
      // slot.style.transform = `rotate(90deg)`;
    }
    div.style.transform = `rotate(${deltaRotation}deg)`;
    slot.appendChild(div);
    setTimeout(() => {
      div.classList.remove("decked");
    }, 3000 + card.playOrder * 500);
  });

  container.appendChild(playerHand);
});

game.reveal();
