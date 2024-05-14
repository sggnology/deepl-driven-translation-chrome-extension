class TranslationBalloonElement extends HTMLElement {

    constructor() {
        super();

        // 말풍선과 선택된 텍스트 사이의 여백을 설정합니다.
        this.REST_OF_BALLOON_DIV = 10;
    }

    connectedCallback() {

        const translationArrStr = this.getAttribute("translation"); // 배열을 double quote 로 감싸진채 가져온다.
        const top = this.getAttribute("top");
        const left = this.getAttribute("left");
        const rectBottom = this.getAttribute("rectBottom");

        let result = "";

        try {
            const translationArr = JSON.parse(translationArrStr); // 배열로 변환한다.

            result = translationArr
        } catch (e) {
            console.error(e);
            result = ["번역에 실패하였습니다."];
        }

        const shadow = this.attachShadow({ mode: 'open' });
        const ballonDiv = this.generateBalloonDiv(result);
        shadow.appendChild(ballonDiv);
        this.adjustBalloonPosition(ballonDiv, top, left, rectBottom);

    }

    generateBalloonDiv(translationArr) {

        console.log(translationArr)

        // 선택된 텍스트에 스타일을 적용하여 말풍선을 생성합니다.
        const balloonDiv = document.createElement("div");
        balloonDiv.style.zIndex = "9999";
        balloonDiv.style.position = "absolute";
        balloonDiv.style.maxWidth = "500px";
        balloonDiv.style.wordBreak = "break-word";
        balloonDiv.style.padding = "10px";
        balloonDiv.style.backgroundColor = "black";
        balloonDiv.style.color = "white";
        balloonDiv.style.borderRadius = "10px"

        if (1 < translationArr.length) {
            translationArr.forEach(sentence => {

                const p = document.createElement("p");
                p.innerText = sentence;

                balloonDiv.appendChild(p);
            });
        }
        else {
            const singleSentence = translationArr[0];
            balloonDiv.innerText = singleSentence;
        }

        return balloonDiv;
    }

    /**
     * @param {ballonDiv} 생성된 말풍선 div
     * @param {top} 선택된 텍스트 top 에 scroll 로 인해 변화가 적용된 값
     * @param {left} 선택된 텍스트 left 값 에 scroll 로 인해 변화가 적용된 값
     * @param {rectBottom} 선택된 텍스트의 bottom 값
    */
    adjustBalloonPosition(balloonDiv, top, left, rectBottom) {

        let calcedTop = top - balloonDiv.offsetHeight - this.REST_OF_BALLOON_DIV;

        if(calcedTop <= 0) {
            // + 연산자는 string + int 일 경우 string 으로 변환된다.
            // 따라서 parseFloat 로 형변환을 해준다.
            calcedTop = parseFloat(rectBottom) + this.REST_OF_BALLOON_DIV;
        }

        balloonDiv.style.top = `${calcedTop}px`;
        balloonDiv.style.left = `${left}px`;
    }

}

customElements.define('translation-balloon-element', TranslationBalloonElement);