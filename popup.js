// activeState 값이 로드될 때 초기화 및 이벤트 등록
chrome.storage.sync.get("activeState", (data) => {

    // [최초] activeState 가 누락되었을 경우 초기화
    if(data.activeState == null || data.activeState==undefined || data.activeState == ""){
        chrome.storage.sync.set({ "activeState": "inactive" });
    }

    console.log("[POPUP] ON/OFF 초기화");

    // [DOM 제어] activeState 값에 따라 ON/OFF 라디오 버튼 체크
    if (data.activeState === "active") {
        document.querySelector("input[name=activeState][value=active]").checked = true;
    } else {
        document.querySelector("input[name=activeState][value=inactive]").checked = true;
    }

    console.log(`[POPUP] ON/OFF 현재 값: ${data}`);

    document.addEventListener("DOMContentLoaded", () => {

        const $setActiveStateButton = document.querySelector("#setActiveStateButton");
    
        // [DOM 이벤트] ON/OFF 라디오 버튼 클릭 시 activeState 값 변경
        $setActiveStateButton.addEventListener("click", () => {
            const activeState = document.querySelector("input[name=activeState]:checked").value;
            chrome.storage.sync.set({ "activeState": activeState });
    
            console.log(`[POPUP] ON/OFF 를 ${activeState} 로 변경하였습니다.`);
        });
    });
});