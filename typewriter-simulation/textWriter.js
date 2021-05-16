let stampedTime = 0;
let elapsed = 0;
let second = 0;

export const typeWordsST = (sentence) => {
  const max = elapsed % sentence.length;
  const cc = sentence.slice(0, max);
  console.log(cc);
  p.innerText = cc;
  elapsed++;
};

export const typeWordsAM = (currentTime) => {
  const sentence = s;
  const diff = Math.floor(currentTime - stampedTime);
  elapsed += Math.round(diff);
  if (elapsed >= 100) {
    const max = second % sentence.length;
    const c = sentence.slice(0, max);
    p.innerText = c;
    elapsed = 0;
    second++;
  }
  stampedTime = currentTime;
  requestAnimationFrame(typeWordsAM);
};

export default class TextWriter {
  constructor(destination, texts, speed, phaser) {
    this.texts = texts.map((text) => text + "...");
    this.counter = 0;
    this.currentText = this.texts[0];
    this.stampedTime = 0;
    this.timer = 0;
    this.elapsed = 0;
    this.destination = destination;
    this.speed = speed || 100;
    this.originalSpeed = this.speed;
    this.isWriting = true;
    this.textspan = document.createElement("span");
    this.phaserspan = document.createElement("span");
    this.phaserspan.classList.add("phaser");
    this.destination.appendChild(this.phaserspan);
    this.instanceId = undefined;
    this.phaserspan.innerText = phaser || "|";
    this.cutSentence(this.stampedTime);
  }
  getSentence() {
    this.counter++;
    this.currentText = this.texts[this.counter % this.texts.length];
  }
  writeAnimation(s, l) {
    return s.slice(0, l);
  }
  deleteAnimation(s, l) {
    return s.slice(0, this.currentText.length - l);
  }
  cutSentence(currentTime) {
    const sentence = this.currentText || "";
    const diff = Math.floor(currentTime - this.stampedTime);
    this.elapsed += Math.round(diff);

    if (this.elapsed >= this.speed) {
      const limit = this.timer % (sentence.length + 1);
      if (limit === sentence.length) {
        this.speed = 0.1 * this.speed;
        this.isWriting = false;
      }
      if (this.isWriting) {
        this.print(this.writeAnimation(sentence, limit));
      } else {
        this.print(this.deleteAnimation(sentence, limit));
        if (this.timer === 2 * sentence.length + 1) {
          this.stop();
          this.reset();
          this.getSentence();
          return;
        }
      }
      this.elapsed = 0;
      this.timer++;
    }
    this.stampedTime = currentTime;
    this.instanceId = requestAnimationFrame(this.cutSentence.bind(this));
  }
  print(data) {
    this.textspan.innerText = data;
    this.destination.insertBefore(this.textspan, this.phaserspan);
  }
  stop() {
    cancelAnimationFrame(this.instanceId);
    setTimeout(() => {
      this.cutSentence(0);
    }, 2000);
  }
  reset() {
    this.speed = this.originalSpeed;
    this.isWriting = true;
    this.stampedTime = 0;
    this.timer = 0;
    this.elapsed = 0;
  }
}
