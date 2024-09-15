const express = require('express');
const app = express();
const port = 3300;

app.listen(port, () => {
    console.log(`Running at ${port}`);
});
app.use(express.json());

let database = new Map();
var id = 1;
app
    .route('/alog')
    // 채널 생성
    .post((req, res) => {
        if(req.body.channelTitle) {
            database.set(id++, req.body)
            res.status(201).json({
                message: `${database.get(id - 1).channelTitle}님의 기록을 응원합니다.`
            })
        }else{
            res.status(400).json({
                message : `요청값(양식) 이 잘못되었습니다.`
                })
        }
    })
    // 전체 조회
    .get((req, res) => {
        var channels = {}

        database.forEach(function(value,key){
            channels[key] = value
        })

        console.log(channels)
        res.status(200).json(channels)
    })

app
    .route('/alog/:id')
    // 개별 조회
    .get((req, res) => {
        const id = parseInt(req.params.id);
        const user = database.get(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "잘못된 채널정보"
            });
        }
    })
    // 개별 삭제
    .delete((req, res) => {
        const id = parseInt(req.params.id);
        const user = database.get(id);

        if (user) {
            database.delete(id)
            res.status(200).json({
                message : `${user.channelTitle} 이 정상적으로 삭제되었습니다.`
            });
        } else {
            res.status(404).json({
                message: "정보를 찾을수없습니다."
            });
        }
    })
    .put((req, res) => {
    let {id} = req.params
    id = parseInt(id)

    var alogger = database.get(id)

    if(alogger){
        let newTitle = req.body.channelTitle
        alogger.channelTitle = newTitle;
        database.set(id,alogger)
        res.json({
            message: `${req.body.channelTitle} 로 수정되었습니다.`
        })
    }

    else{
        res.json({
            message : `요청하신 ${id} 는 없는 블로거입니다.`
        })
    }
})
