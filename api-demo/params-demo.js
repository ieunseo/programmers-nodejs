const express = require('express')
const app = express()

// GET + '/'
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.listen(3000)


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

//https://www.youtube.com/@YeosuUnnie

// app.get('/:nickname',function(req,res){
//     res.json({
//         channel : req.params.nickname
//     })
// })


app.get('/watch',function(req,res){
    // const q = req.query
    // console.log(q.v)
    // console.log(q.t)

    //json 객체의 비구조화
    const{v,t} = req.query
    console.log(v)
    console.log(t)

    res.json(q)
})