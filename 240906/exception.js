const express = require('express')
const app = express()
app.get('/', function (req, res) {
    res.send('exception!')
})
app.listen(3300)

//배열
const chocolate = [
    {id : 1, name: "whitechoco"},
    {id : 2, name: "blackchoco"},
    {id : 3, name: "dubaichoco"}
]
// 초콜릿 전체 조회
app.get('/chocolates',function(req,res){
    res.json(chocolate)
})

// 초콜릿 개별 조회
app.get('/chocolates/:id',function(req,res){
    let id = req.params.id
    id = parseInt(id)
    // id를 가진 객체 찾기

    // 1번 forEach문으로 전체순회하여 찾기
    // var findChoco = ""
    // chocolate.forEach(function(chocolate){
    //     if (chocolate.id == id){
    //         findChoco = chocolate
    //     }
    // })

    // 2번 find() 함수 사용하여 찾기
    
    var findChoco = chocolate.find(f => (f.id == id))
    // 배열안에있는 객체중 id값이 params.id 와 같은 객체
    if(findChoco){
        res.json(findChoco)
    }
    else{
        res.status(404).json({
            message : `없는 id입니다.`
        })
    }
})
