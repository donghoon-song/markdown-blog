---
title: Do not use "new" for side effects eslint rule
date: 2023-06-14 23:06:89
category: eslint
thumbnail: { thumbnailSrc }
draft: false
---

주어진 url이 유효한지 검사하는 기능이 필요해서 관련 함수를 작성했다. 아래와 같이 `isValidUrl` 함수를 작성했는데 `ESLint: Do not use 'new' for side effects.(no-new)`라는 eslint rule를 위반했다고 경고가 떴다.

```javascript
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.error("isValidUrl error : ", error);
    return false;
  }
};
```

eslint 문서를 참고하면, 보통의 경우 new를 통해 인스턴스를 생성하고 변수에 할당해 사용하는데, 저장하지 않으면 `reference가 어디에도 남지 않기 때문에` 이를 방지하기 위함이라고 한다.
그렇다고 인스턴스를 변수에 할당하면 그 변수는 사용하지 않아 `no-unused-vars` rule을 위반하기 때문에 `즉시실행함수`로 감싸주었다.

```javascript
export const isValidUrl = (url) => {
  try {
    (() => {
      return new URL(url);
    })();
    return true;
  } catch (error) {
    console.error("isValidUrl error : ", error);
    return false;
  }
};
```

테스트 코드는 아래와 같이 작성했다. chatGPT를 통해서 테스트 케이스를 얻는데 도움을 받았다. 케이스가 많은 거 같긴 하지만 어떤 인풋값들이 들어올 수 있을지 예상할 수 있어서 도움이 많이 됐다.

```javascript
describe("isValidUrl function", () => {
  it("유효한 URL에 대해서 true를 반환한다.", () => {
    expect(isValidUrl("https://www.example.com")).toBe(true);
  });

  it("유효하지 않은 URL에 대해서 false를 반환한다.", () => {
    expect(isValidUrl("not a valid url")).toBe(false);
  });

  it("프로토콜이 없는 URL에 대해서 false를 반환한다.", () => {
    expect(isValidUrl("www.example.com")).toBe(false);
  });

  it("query parameter가 있는 유효한 URL에 대해서 true를 반환한다.", () => {
    expect(isValidUrl("https://www.example.com/?id=123")).toBe(true);
  });

  it("hash fragment가 있는 유효한 URL에 대해서 true를 반환한다.", () => {
    expect(isValidUrl("https://www.example.com/#about")).toBe(true);
  });

  it("빈 문자열에 대해서 false를 반환한다.", () => {
    expect(isValidUrl("")).toBe(false);
  });

  it("null에 대해서 false를 반환한다.", () => {
    expect(isValidUrl(null)).toBe(false);
  });

  it("undefined에 대해서 false를 반환한다.", () => {
    expect(isValidUrl(undefined)).toBe(false);
  });

  it("문자열이 아닌 값에 대해서 false를 반환한다.", () => {
    expect(isValidUrl(1)).toBe(false);
  });
});
```
