// content_script.js

// 마우스 이벤트를 감지하고 처리하는 함수
function handleMouseSelection(event) {
    // 선택된 텍스트를 가져옵니다.
    let selectedText = window.getSelection().toString();

    const url = `https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs`;
    const body = generateBody({ sourceText: selectedText });

    const trimmedSelectedText = selectedText.trim();

    if (trimmedSelectedText !== "" && trimmedSelectedText !== null) {

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
            const translatedCandidates = data?.result?.translations?.beams;
            let resultText = "";

            // 번역 응답 API 에 문제가 발생했을 경우
            if(translatedCandidates == null){
                resultText = "번역에 실패하였습니다.";
            }
            // 번역된 결과가 없을 경우
            else if(translatedCandidates.length == 0){
                resultText = "번역된 결과가 없습니다.";
            }
            // 번역이 되었을 경우
            else{

                // 첫번째 값을 번역된 결과로 서빙
                resultText = translatedCandidates[0]?.sentences[0]?.text;
            }

            addBalloon(selectedText);
        })
        .catch(error => {
            // 번역 API 요청 오류 발생시
            addBalloon("번역 요청 과정에서 오류가 발생하였습니다.");
        });
        
    }
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

function requestForTranslation({ sourceText }) {
    
}

function generateBody({ sourceText }) {
    return {
        "jsonrpc": "2.0",
        "method": "LMT_handle_jobs",
        "params": {
            "jobs": [
                {
                    "kind": "default",
                    "sentences": [
                        {
                            "text": sourceText,
                            "id": 1,
                            "prefix": ""
                        }
                    ],
                    "raw_en_context_before": [],
                    "raw_en_context_after": [],
                    "preferred_num_beams": 4,
                    "quality": "fast"
                }
            ],
            "lang": {
                "target_lang": "KO",
                "preference": {
                    "weight": {
                        "DE": 0.13462,
                        "EN": 11.50693,
                        "ES": 0.07732,
                        "FR": 0.1047,
                        "IT": 0.03269,
                        "JA": 0.04014,
                        "NL": 0.03271,
                        "PL": 0.02464,
                        "PT": 0.02413,
                        "RU": 0.02711,
                        "ZH": 0.03099,
                        "BG": 0.0128,
                        "CS": 0.0132,
                        "DA": 0.01255,
                        "EL": 0.01212,
                        "ET": 0.01116,
                        "FI": 0.01379,
                        "HU": 0.0124,
                        "ID": 0.0122,
                        "KO": 0.01238,
                        "LV": 0.0098,
                        "LT": 0.01144,
                        "NB": 0.01379,
                        "RO": 0.01209,
                        "SK": 0.01202,
                        "SL": 0.01172,
                        "SV": 0.01458,
                        "TR": 0.01254,
                        "UK": 0.01469,
                        "AR": 0.01333
                    },
                    "default": "default"
                },
                "source_lang_user_selected": "EN"
            },
            "priority": -1,
            "commonJobParams": {
                "mode": "translate",
                "browserType": 1,
                "textType": "plaintext"
            },
            "timestamp": new Date().getTime()
        },
        "id": 37110010
    }
}