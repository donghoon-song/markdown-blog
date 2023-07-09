---
title: 구글 스프레드시트에서 javascript 코드 실행하기(Apps Script, custom function)
date: 2023-02-19 18:02:61
category: excel
thumbnail: { thumbnailSrc }
draft: false
---

사이드 프로젝트로 database의 data를 migration하다가 스프레드시트 상에서 데이터를 쉽게 변환할 수 있는 방법으로 Apps Script 기능을 찾을 수 있었습니다.

저에겐 unix timestamp 데이터가 있었고, 이것을 ISO String으로 변환해서 새로운 데이터베이스에 bulk로 insert하고 싶었습니다.

![image](https://user-images.githubusercontent.com/32301380/219938526-70679086-0c56-445e-a7d6-3f9bc5922a2c.png)

확장 프로그램의 Apps Script 메뉴를 활용합니다.

![image](https://user-images.githubusercontent.com/32301380/219938591-963b5bf0-15d4-4fc2-9af0-4589f9dc2f12.png)

그러면 코드를 작성하는 화면이 나오는데, 함수를 작성만 한다고 추가되지는 않고 스크린샷에서 보시는 것처럼 customfunction이라는 주석을 달아야 등록이 됩니다. jsDoc 형식으로 부가적인 주석도 달 수 있습니다.

![image](https://user-images.githubusercontent.com/32301380/219939054-8d29b2f8-461e-4f54-b227-524cb64d5b64.png)

주석을 작성하고 저장후에 스프레드시트로 돌아오면 저희가 작성했던 커스텀 함수가 보이고, 주석도 잘 보이는 것을 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/32301380/219939119-a2868ea8-0a85-4b09-90f1-7ddbe8028ecb.png)

![image](https://user-images.githubusercontent.com/32301380/219939239-bfa810eb-5cc6-4f55-b5b9-92ef559110d0.png)

데이터를 변환할 때 자바스크립트가 필요하거나, 편한 경우에 데이터를 복사해서 변환 후에 다시 붙여넣는 작업을 했었는데 이 기능을 사용하면 너무 편하게 변환할 수 있고, 자주 사용하는 스크립트는 저장해 놓을 수 있어서 더 좋은 거 같습니다.
