// content_script.js

// 마우스 이벤트를 감지하고 처리하는 함수
function handleMouseSelection(event) {
    // 선택된 텍스트를 가져옵니다.
    let selectedText = window.getSelection().toString();

    chrome.storage.sync.get('apiKey', function (data) {

        let errorMessage = "";

        if (data.apiKey == null || data.apiKey == undefined || data.apiKey == "") {
            errorMessage = "API KEY 를 입력하여주세요.";
        }
        
        // selectedText trim
        const trimmedSelectedText = selectedText.trim();

        if (trimmedSelectedText !== "" && trimmedSelectedText !== null) {

            if(errorMessage == "" || errorMessage != null || errorMessage != undefined){
                addBalloon(errorMessage);
            }
            else{
                addBalloon(selectedText);
            }
            
        }

    });

}

function addBalloon(text) {
    // 선택된 텍스트에 스타일을 적용하여 말풍선을 생성합니다.
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.position = "absolute";
    balloon.style.maxWidth = "300px";
    balloon.style.wordBreak = "break-word";
    balloon.style.padding = "10px";
    balloon.style.backgroundColor = "black";
    balloon.style.color = "white";
    balloon.style.borderRadius = "10px"
    balloon.innerText = text;

    // 선택한 텍스트 위에 말풍선을 추가합니다.
    const selectionRange = window.getSelection().getRangeAt(0);
    const selectionRect = selectionRange.getBoundingClientRect();

    document.body.appendChild(balloon);

    // ballon DOM 의 크기는 DOM 에 포함되고 나서야 크기가 결정된다.
    balloon.style.top = `${selectionRect.top + window.pageYOffset - balloon.offsetHeight - 10}px`;
    balloon.style.left = `${selectionRect.left + window.pageXOffset}px`;
}

// 커서가 해제되면 말풍선을 삭제하는 함수
function removeBalloon() {
    const balloon = document.querySelector(".balloon");
    if (balloon) {
        balloon.remove();
    }
}

// 커서가 해제되면 말풍선을 삭제합니다.
document.addEventListener("mouseup", removeBalloon);

// 마우스 이벤트 핸들러를 등록합니다.
document.addEventListener("mouseup", handleMouseSelection);