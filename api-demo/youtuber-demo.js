const express = require('express')
const app = express()

app.listen(3300)

app.get('/',function(req,res){
    res.send('Hello world!')
})
let youtuber1 = {
    channelTitle : "여수언니정혜영",
    sub : "63.4만명",
    vedioNum:329

}


let youtuber2 = {
    channelTitle : "홀로나나",
    sub : "14.8만명",
    vedioNum:384

}

let db = new Map()
var id = 1

db.set(id++,youtuber1)
db.set(id++,youtuber2)

//개별조회
app.get('/youtuber/:id',function(req,res){
    let {id} = req.params

    id = parseInt(id)
    if(db.get(id) == undefined){
        res.json({
            message:"없는 유튜버"
        })
    }else{
        res.json(db.get(id))
    }
})

//전체조회
app.get('/youtubers',(req,res)=>{
    res.json({
        db
    })
})

 // http 외의 모듈 (미들웨어)
app.use(express.json())

app.post('/youtuber',(req,res)=>{
    console.log(req.body)
    //등록
    db.set(id++,req.body)
    res.json({
        message:`${db.get(id-1).channelTitle}님,  유튜브 채널이 개설되었습니다. 화이팅!`
    })
})