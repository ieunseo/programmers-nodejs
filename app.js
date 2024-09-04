const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send('Hello! World')
})

//post 로 들어왔을때 body에 숨겨져 들어온
//데이터를 뿌려보자
app.use(express.json())
app.post('/test',(req,res)=>{
    console.log(req.body)
    res.send(req.body.message)
})
app.listen(port, ()=> {
    console.log(`app listening on port ${port}`)
})