const express = require('express')
const app = express()

// GET + '/'
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.listen(3000)


//https://www.youtube.com/@YeosuUnnie
//https://www.youtube.com/watch?v=A2hbWp4qqt0&t=287s

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
app.get('/:nickname',function(req,res){
    const {nickname} = req.params
    if(nickname=='@YeosuUnnie'){
        res.json(youtuber1)
    }else if(nickname=='@nana_auau'){
        res.json(youtuber2)
    }
    else{
        res.json({
            message:"모르는 유튜버"
        })
    }

})