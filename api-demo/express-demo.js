const express = require('express')
const app = express()

// GET + '/'
app.get('/', function (req, res) {
  res.send('Hello World')
})

//API 테스트
//API : GET + "http://localhost:3000/test"
// test success

app.get('/test', function (req, res) {
    res.send('TEST SUCCESS')
  })

//API : GET + "http://localhost:3000/test/1"
// "One!!"

app.get('/test/1', function (req, res) {
    res.send('ONE!! ')
  })
app.listen(3000)

// API : GET + "http://localhost:3000/eunseo"
app.get('/eunseo',function(req,res){
    res.json({
        git_id: 'ieunseo',
        age:24,
        name:'eunseo'
    })
})

// test/__ << 빈칸에 오는 값을 n이라는 변수에 담아줘
app.get('/test/:n', function(req, res) {
  if((req.params.n-20)>5){
    console.log("url 로 전달받은 숫자가 20보다 크네요")
  }
  let number = parseInt(req.params.n) - 10
  console.log(number) //숫자 << 숫자임 "숫자"<< 문자임
    // URL 파라미터에서 n 값을 가져옵니다.
    res.json({
        num: req.params.n
    });

 
});

// test/__ << 빈칸에 오는 값을 n이라는 변수에 담아줘
app.get('/product/1', function(req, res) {
  res.json({
      num: 1
  });
});
