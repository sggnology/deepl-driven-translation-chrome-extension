class CustomBalloonContentElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {

    const content = this.getAttribute("content");

    const newP = document.createElement("p");

    newP.textContent = this.#exceptNewLineIdentitifier(content);
    newP.style.marginTop = "5px";
    newP.style.marginBottom = "5px";
    newP.style.color = "white";

    this.appendChild(newP);
  }

  #exceptNewLineIdentitifier(content) {
    return content.replaceAll(/\n/g, '');
  }
}

customElements.define("custom-balloon-content-element", CustomBalloonContentElement);