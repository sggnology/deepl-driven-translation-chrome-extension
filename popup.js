document.addEventListener("DOMContentLoaded", () => {
    const setApiKeyButton = document.querySelector("#setApiKeyButton");
    const apiKeyInput = document.querySelector("input[name=apiKey]");

    setApiKeyButton.addEventListener("click", () => {
        // storage 에 API KEY 정보 입력
        chrome.storage.sync.set({ apiKey: apiKeyInput.value });

        // input 에 API KEY 가 표시되면 보안상 취약함으로 빈값
        apiKeyInput.value = "";
    });
});