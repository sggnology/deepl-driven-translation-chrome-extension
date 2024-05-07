# translation-chrome-extension
> ~~DeepL API 기반의 번역기~~

## 제한사항
- DeepL Open API 의 무료 기간은 한달로 각 사용자가 편하게 사용하기에는 무리가 있다.

---

## 방향성 전환

> PostMan 을 통해 확인하여 동작 여부를 확인하였다.

- DeepL 제공하는 API 가 아닌 네트워킹 소스를 통해 DeepL 웹페이지에서 사용하는 API 를 사용
- 응답에 대한 parsing 과정 필요

### 보류
- CORS 를 해결하지 못하였다.
   - 시도
      1. fetch mode 변경
         - Content-Type 을 Browser 가 강제로 변경하여 415 오류 발생
      2. XMLHttpRequest 방식으로 변경
         - `Access-Control-Allow-Origin: *` 헤더를 추가하였으나 실패
         - `Origin: ..` 헤더를 추가하였으나, Browser 측에서 삭제함으로 실패
   - 해결책
      1. Proxy Server 를 통해 중개서버를 생성
         - GCP 인스턴스 사용하려 했으나 3개월 무료정책 및 과한 요청시 요금 부하로 추후 처리
