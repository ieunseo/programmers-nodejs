이번주까지 배운내용

1. express 는 웹페이지를 사용하기위해 만든 여러 모듈을 엮어만들었다. 프레임워크와 비슷한기능을한다
2. express 는 값을 다룰때 json을 사용한다 (그러면서 map을 배웠다. Key:value 쌍으로 이루어져있으며, 순서가없다.)
3. express 의 jenerator라는게 있는데 이것을 지켜서 개발하자 (다른사람들과 협업하기위한 틀이다.)
4. 자바스크립트 함수 형태는 총 4가지가있다
  - 함수 그 자체
  - 함수를 let 변수에 할당
  - 익명함수를 변수에 할당
  - 화살표함수인데 대괄호를 사용하지않음 (간단하게 표현)
이것은 js-demo 폴더의 function-demo.js 파일을 참고해주시길바란다.
5. express의 구조는 아래와같다
  - bin 이라는 폴더 아래에 www 라는파일이있는데 이곳에서 여러가지 모듈을 가져다쓰고, 어떤식으로 express 모듈을 사용해서 http 서버를 돌릴수있는지 알수있다.
    (포트번호 설정, 어떤 모듈을 사용하는지 세팅 , 몇번 포트로 연결되어있는지)
  - app.js 파일은 express 모듈을 사용하고, app.set 으로 기본세팅을 해준다 그리고 app.use로 원하는 모듈을 사용한다.(미들웨어들) 그리고 마지막에 module.exprort = app 으로 외부에서도 사용가능하게 했다.
6. 웹은 4가지 method 가 있는데 우리는 이때가지 간단하게 get 메소드를 사용해봤지만 오늘 post 메소드를 처음 사용해봣다
(아직 delete, put 등은 사용해보지않음)
- post 는 일반 웹브라우저에서 볼수없기떄문에 postman 이라는 앱을 사용해서 보앗다. app.get() 함수가 아닌 app.post() 함수를 사용하여 등록하는과정을 오늘 알아보았다.
