// content_script.js

(function () {

    const translateHandler = new TranslateHandler();
    const balloonHandler = new BalloonHandler();

    // 마우스 이벤트를 감지하고 처리하는 함수
    function mouseupEventListener() {

        // ON/OFF 상태를 가져옵니다.
        chrome.storage.sync.get("activeState", async (data) => {
            if (data.activeState === "active") {
                await translate();
            }
            else {
                return;
            }
        });
    }

    async function translate() {
        const selectedText = window.getSelection().toString();

        const trimmedText = selectedText.trim().replaceAll(/\n/g, " ");

        if (trimmedText !== "" && trimmedText !== null) {
            const selectedRange = window.getSelection().getRangeAt(0);
            const translatedArr = await translateHandler.translate(trimmedText);
            balloonHandler.addBalloon(translatedArr, selectedRange);
        }
    }

    // 커서가 해제되면 말풍선을 삭제합니다.
    document.addEventListener("mousedown", balloonHandler.removeBalloon);

    // 마우스 이벤트 핸들러를 등록합니다.
    document.addEventListener("mouseup", mouseupEventListener);

    // ON/OFF 초기화
    chrome.storage.sync.get("activeState", (data) => {
        if (data == null || data == undefined || data == "") {
            chrome.storage.sync.set({ "activeState": "inactive" });
        }
    });

    document.addEventListener("DOMContentLoaded", () => {

        

    });

})();


// async function translateText() {
//     // 선택된 텍스트를 가져옵니다.
//     const selectedText = window.getSelection().toString();
//     const selectedRange = window.getSelection().getRangeAt(0);

//     const trimmedText = selectedText.trim().replaceAll(/\n/g, " ");

//     if (trimmedText !== "" && trimmedText !== null) {
//         const translateHandler = new TranslateHandler();
//         const translatedArr = await translateHandler.translate(trimmedText);

//         const balloonHandler = new BalloonHandler();
//         balloonHandler.addBalloon(translatedArr, selectedRange);
//     }



//     const url = `https://translation-proxy.sggnology.workers.dev`;

//     const trimmedSelectedText = selectedText.trim().replace("\\n", " ");

//     if (trimmedSelectedText !== "" && trimmedSelectedText !== null) {

//         let result = [];
//         const body = { "source": trimmedSelectedText };

//         try {
//             const data = await fetch(url, {
//                 mode: 'cors',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json; charset=utf-8'
//                 },
//                 body: JSON.stringify(body)
//             }).then(response => response.json());

//             // 번역된 결과값들
//             const translationArr = data?.translation;

//             // 번역 응답 API 에 문제가 발생했을 경우
//             if (translationArr == null) {
//                 result = ["번역에 실패하였습니다."];
//             }
//             // 번역된 결과가 없을 경우
//             else if (translationArr.length == 0) {
//                 result = ["번역된 결과가 없습니다."];
//             }
//             // 번역이 되었을 경우
//             else {

//                 // 첫번째 값을 번역된 결과로 서빙
//                 result = translationArr;
//             }

//         } catch (e) {
//             console.error(e);
//             result = ["번역 요청 과정에서 오류가 발생하였습니다."];
//         }

//         addTranslationBalloon(result);

//     }
// }

// // 커서가 해제되면 말풍선을 삭제합니다.
// document.addEventListener("mousedown", removeBalloon);

// // 마우스 이벤트 핸들러를 등록합니다.
// document.addEventListener("mouseup", mouseupEventListener);

// // ON/OFF 초기화
// chrome.storage.sync.get("activeState", (data) => {
//     if (data == null || data == undefined || data == "") {
//         chrome.storage.sync.set({ "activeState": "inactive" });
//     }
// });