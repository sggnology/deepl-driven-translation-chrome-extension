# translation-chrome-extension
> 문서를 읽다보면 단어 혹은 문장이 어려운 경우가 있습니다.   
> 그럴 때 마다 검색하는 것이 번거로워 chrome extension 으로 제작하였습니다.

## 제한사항
- 현재는 CORS 회피를 위해 cloudflare > worker 를 사용하여 일별 요청 제한이 있습니다.
   - 추후 사용자가 많아진다면 사설 server 로 이관할 생각입니다.

---

## 사용 설명

### 번역 활성화 여부 선택

| popup 을 통해 활성화 여부를 선택할 수 있습니다.

<div align="center">
   <img width="158" alt="popup" src="https://github.com/sggnology/translation-chrome-extension/assets/100742377/16fde2c4-66e7-4b67-96c6-986ad8cf4f64">
</div>


### 커서를 통한 번역

| 원하는 단어/문장위에 커서를 잡으면 번역된 결과를 보기좋게 출력합니다.

<div>
   <h4>단어</h4>
   <img width="90" alt="단어" src="https://github.com/sggnology/translation-chrome-extension/assets/100742377/9c680731-b534-4d60-b0f0-d6ff23a2440e">
</div>

<div>
   <h4>문장</h4>
   <img width="497" alt="문장" src="https://github.com/sggnology/translation-chrome-extension/assets/100742377/71c2dec2-340d-4ca7-b835-fedd0599ef2e">
</div>


