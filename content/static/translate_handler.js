class TranslateHandler {
    constructor() {
        this.TRANSLATION_API_URL = `https://translation-proxy.sggnology.workers.dev`;
    }

    /**
     * 
     * @param {string} beforeTranslateText 번역되기 전 텍스트
     * @returns {Array<string>} 번역된 텍스트 배열
     */
    async translate(beforeTranslateText) {

        let result = "";
        const body = { "source": beforeTranslateText };

        try {
            const data = await fetch(this.TRANSLATION_API_URL, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(body)
            }).then(response => response.json());

            // 번역된 결과값들
            const translatedTextArr = data?.translation;

            // 번역 응답 API 에 문제가 발생했을 경우
            if (translatedTextArr == null) {
                result = "번역에 실패하였습니다.";
            }
            // 번역된 결과가 없을 경우
            else if (translatedTextArr.length == 0) {
                result = "번역된 결과가 없습니다.";
            }
            // 번역이 되었을 경우
            else {

                // 첫번째 값을 번역된 결과로 서빙
                result = translatedTextArr;
            }

        } catch (e) {
            result = "번역 요청 과정에서 오류가 발생하였습니다.";
        }

        if (!Array.isArray(result)) {
            result = [result];
        }

        return result;

    }
}