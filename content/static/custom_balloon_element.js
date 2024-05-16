class CustomBalloonElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const balloonId = this.getAttribute("balloonId");

        const newDiv = document.createElement("div");

        newDiv.id = balloonId;
        this.#setBalloonDivStyle({balloonDiv: newDiv});

        this.appendChild(newDiv);
    }

    #setBalloonDivStyle({balloonDiv}) {
        balloonDiv.style.zIndex = "9999";
        balloonDiv.style.maxWidth = "500px";
        balloonDiv.style.wordBreak = "break-word";
        balloonDiv.style.padding = "10px";
        balloonDiv.style.backgroundColor = "black";
        balloonDiv.style.color = "white";
        balloonDiv.style.borderRadius = "10px"
    }

}

customElements.define("custom-balloon-element", CustomBalloonElement);