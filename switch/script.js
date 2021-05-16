const template = document.querySelector("template#switch-template");

class SWE extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(".switch").style = this.getAttribute(
      "passStyle"
    );
    this.shadowRoot.querySelector(".track span:nth-child(1)").innerHTML =
      this.getAttribute("includeLabels") === "true" ? "on" : "";
    this.shadowRoot.querySelector(".track span:nth-child(2)").innerHTML =
      this.getAttribute("includeLabels") === "true" ? "off" : "";
    this.addEventListener("click", this.changeColor);
  }

  changeColor() {
    if (this.getAttribute("color")) {
      const isChecked = this.shadowRoot.querySelector(".switch input").checked;
      this.shadowRoot.querySelector(
        ".switch .track"
      ).style.backgroundColor = isChecked ? this.getAttribute("color") : null;
    }
  }
}

window.customElements.define("custom-switch", SWE);
