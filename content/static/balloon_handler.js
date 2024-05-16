class BalloonHandler {

    /**
     * 
     * @param {string}(nullable) balloonId 말풍선 DOM id
     */
    constructor(balloonId) {
        this.balloonId = balloonId ?? "translation-balloon";

        // 말풍선과 선택된 텍스트 사이의 여백을 설정합니다.
        this.REST_OF_BALLOON_DIV = 10;
    }

    addBalloon = (translatedTextArr, selectionRange) => {

        // 말풍선 생성
        const customBalloonElement = document.createElement("custom-balloon-element");

        customBalloonElement.setAttribute("balloonId", this.balloonId);

        document.body.appendChild(customBalloonElement);

        // 말풍선 내용 생성
        const balloonContentElementArr = translatedTextArr.map((translatedText) => {
            const customBalloonContentElement = document.createElement("custom-balloon-content-element");
            customBalloonContentElement.setAttribute("content", translatedText);
            return customBalloonContentElement;
        });

        const balloonDiv = document.querySelector(`#${this.balloonId}`);

        balloonDiv.append(...balloonContentElementArr);

        // 말풍선 위치 조정
        const balloonPositionObj = this.#getSelectedPosition(selectionRange);
        this.#adjustBalloonPosition({balloonDiv: balloonDiv, ...balloonPositionObj})
    }

    removeBalloon = () => {

        const customBalloonElementArr = document.querySelectorAll("custom-balloon-element");

        if(0 < customBalloonElementArr.length) {
            customBalloonElementArr.forEach((customBalloonElement) => {
                customBalloonElement.remove();
            });
        }
    }

    /**
     * 
     * @param {Range} selectionRange 번역을 위해 선택한 커서에 대한 영역
     * @returns 영역의 top, left, bottom 값을 반환
     */
    #getSelectedPosition = (selectionRange) => {
        const selectionRect = selectionRange.getBoundingClientRect();

        return {
            top: `${selectionRect.top + window.scrollY}`,
            left: `${selectionRect.left + window.scrollX}`,
            bottom: selectionRect.bottom ?? 0
        };
    }

    /**
     * @param {ballonDiv} 생성된 말풍선 div
     * @param {top} 선택된 영역의 top 에 scroll 로 인해 변화가 적용된 값
     * @param {left} 선택된 영역의 left 값 에 scroll 로 인해 변화가 적용된 값
     * @param {bottom} 선택된 영역의 bottom 값
    */
    #adjustBalloonPosition({balloonDiv, top, left, bottom}) {

        // - 연산자는 `string - number` 일 경우 number 로 연산됨으로 형변환 없이 연산이 가능하다.
        let calcedTop = top - balloonDiv.offsetHeight - this.REST_OF_BALLOON_DIV;

        if(calcedTop <= 0) {
            // + 연산자는 `string + number` 일 경우 string 으로 변환된다.
            // 따라서 `float + number` 로 연산하여 string 으로 반환하지 않게끔 parseFloat 로 형변환후 연산한다.
            calcedTop = parseFloat(bottom) + this.REST_OF_BALLOON_DIV;
        }

        balloonDiv.style.position = "absolute";
        balloonDiv.style.top = `${calcedTop}px`;
        balloonDiv.style.left = `${left}px`;
    }
}