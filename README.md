## language-explorer

![제목 없음](https://user-images.githubusercontent.com/69149030/168221015-9a27e40b-d545-4b51-ac6c-a6541ef3dcc0.png)

Vanilla JS만을 이용해 프로그래밍 언어를 검색하는 서비스를 구현하기

- [Demo](https://dev-redo.github.io/language-explorer/)
- [Requirements](https://github.com/dev-redo/language-explorer/issues/1)
- [Additional implementation](https://github.com/dev-redo/language-explorer/issues/2)

## API 문서
- [Base URL](https://github.com/dev-redo/language-explorer/blob/master/src/utils/constants.js)

- [프로그래밍 언어 조회](https://github.com/dev-redo/language-explorer/blob/master/src/utils/req.js)
  - /languages
  - Method : GET
  - Query Parameter : keyword
  - 검색하고자 하는 키워드를 query parameter로 넘기면 조건에 맞는 데이터를 조회하여 응답

- response body
  ```jsx
  // 'java'라는 키워드로 조회
  /languages?keyword=java

  // response 결과
  [
    "Java",
    "JavaFX Script",
    "JavaScript",
    "Join Java"
  ]
  ```

## 디렉토리 구조

```
src
├─ components
│  └─ Serach
│     └─ Search.css
│     └─ Search.js
│     └─ SearchInput.js
│     └─ SelectedLanguages.js
│     └─ Suggestion.js
├─ styles
│  └─ global.css
├─ utils
│  └─ constants.js
│  └─ path.js
│  └─ req.js
├─ main.js
└─ style.css
```
