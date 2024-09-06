const express = require('express')
const app = express()

 // http 외의 모듈 (미들웨어)
app.use(express.json())
app.listen(3300)

app.get('/',function(req,res){
    res.send('Hello world!')
})
let yt = new Map()
var id = 1

// 유튜버 설정
let ytb1 = {
    channelTitle : "여수언니정혜영",
    sub : "63.4만명",
    vedioNum:329

}

let ytb2 = {
    channelTitle : "홀로나나",
    sub : "14.8만명",
    vedioNum:384

}
yt.set(id++,ytb1)
yt.set(id++,ytb2)

//개별조회
app.get('/youtubers/:id',function(req,res){
    let {id} = req.params

    id = parseInt(id)
    if(yt.get(id) == undefined){
        res.json({
            message:"없는 유튜버"
        })
    }else{
        res.json(yt.get(id))
    }
})


//전체조회
// forEach를 이용해서 전체조회. map 을 object 형태로 변환
app.get('/youtubers',(req,res)=>{

    var ytbs = {}
    yt.forEach((value,key)=>{
        ytbs[key] = value
    });
    
    console.log(ytbs)
    res.json(ytbs)
})


// 유튜버 등록
app.post('/youtubers',(req,res)=>{
    console.log(req.body)
    //등록
    yt.set(id++,req.body)
    res.json({
        message:`${yt.get(id-1).channelTitle}님,  유튜브 채널이 개설되었습니다. 화이팅!`
    })
})

//전체 유튜버 삭제
app.delete('/youtubers',(req,res)=>{

    if(yt.size>=1){
        yt.clear()
        res.json({
            message:`전체 유튜버가 삭제되었습니다.`
        })
    }
    else{
        res.json({
            message : `삭제할 유튜버가 없어요 ㅠㅠ`
        })
    }
})

// 특정유튜버(id)삭제
app.delete('/youtubers/:id',(req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    const ytbs = yt.get(id)
    let channelTitle = yt.get(id).channelTitle
    if(ytbs == undefined){
        res.json({
            message : "해당 id를 가진 유튜버가 없습니다."
        })
    }
    else{
        yt.delete(id)
        res.json({
            message:`${channelTitle}님의 유튜브가 사라졌습니다.`
        })
    }
})

// 수정
// req 로는 id(프로퍼티) 를 받아 channel Title 을 수정함
// res 는 제대로 수정됐는지?
app.put('/youtubers/:id',(req,res)=>{

    let {id} = req.params
    id = parseInt(id)

    var ytb = yt.get(id)
    
    if(ytb == undefined){
        res.json({
            message : `요청하신 ${id} 유튜버는 없는 유튜버입니다.`
        })
    }
    
    else{
        let newTitle = req.body.channelTitle
        ytb.channelTitle = newTitle;
        yt.set(id,ytb)
        res.json({
            message: `${req.body.channelTitle} 로 수정되었습니다.`
        })
    }
})