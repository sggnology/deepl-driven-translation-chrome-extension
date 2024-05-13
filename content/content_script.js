// content_script.js

// 마우스 이벤트를 감지하고 처리하는 함수
function handleMouseSelection(event) {

    // ON/OFF 상태를 가져옵니다.
    chrome.storage.sync.get("activeState", (data) => {
        if (data.activeState === "active") {
            // active 상태일 때만 번역을 실행합니다.
            translateText();
        }
        else{
            return;
        }
    });
}

function translateText() {
    // 선택된 텍스트를 가져옵니다.
    let selectedText = window.getSelection().toString();

    const url = `https://translation-proxy.sggnology.workers.dev`;

    const trimmedSelectedText = selectedText.trim().replace("\\n"," ");

    if (trimmedSelectedText !== "" && trimmedSelectedText !== null) {

        const body = { "source": trimmedSelectedText };

        fetch(url, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {

                // 번역된 결과값들
                const translationArr = data?.translation;

                let result = "";

                // 번역 응답 API 에 문제가 발생했을 경우
                if (translationArr == null) {
                    result = ["번역에 실패하였습니다."];
                }
                // 번역된 결과가 없을 경우
                else if (translationArr.length == 0) {
                    result = ["번역된 결과가 없습니다."];
                }
                // 번역이 되었을 경우
                else {

                    // 첫번째 값을 번역된 결과로 서빙
                    result = translationArr;
                }

                addTranslationBalloon(result);
            })
            .catch(error => {
                // 번역 API 요청 오류 발생시
                addTranslationBalloon("번역 요청 과정에서 오류가 발생하였습니다.");
            });

    }
}

function addTranslationBalloon(translationArr) {

    // 선택한 텍스트 위에 말풍선을 추가합니다.
    const selectionRange = window.getSelection().getRangeAt(0);
    const selectionRect = selectionRange.getBoundingClientRect();

    const top = `${selectionRect.top + window.scrollY}`;
    const left = `${selectionRect.left + window.scrollX}`;

    const balloon = document.createElement("translation-balloon-element");
    balloon.id = "translation-balloon";
    balloon.setAttribute("translation", JSON.stringify(translationArr));
    balloon.setAttribute("top", top);
    balloon.setAttribute("left", left);
    balloon.setAttribute("rectBottom", selectionRect.bottom ?? 0);

    document.body.appendChild(balloon);

}

// 커서가 해제되면 말풍선을 삭제하는 함수
function removeBalloon() {
    const balloon = document.querySelector("#translation-balloon");

    if (balloon) {
        balloon.remove();
    }
}

// 커서가 해제되면 말풍선을 삭제합니다.
document.addEventListener("mousedown", removeBalloon);

// 마우스 이벤트 핸들러를 등록합니다.
document.addEventListener("mouseup", handleMouseSelection);

// ON/OFF 초기화
chrome.storage.sync.get("activeState", (data) => {
    if (data == null || data == undefined || data == "") {
        chrome.storage.sync.set({ "activeState": "inactive" });
    }
});