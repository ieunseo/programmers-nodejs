const express = require('express');

const router = express.Router();

router.use(express.json());

let database = new Map();
var id = 1;
router
    .route('/')
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
        var alogger = []
        var{userId} = req.body;

        if(database.size) {

            if(userId == undefined){
                res.status(404).json({
                    message:"로그인이 필요한 페이지입니다."
                })
            }else {
                database.forEach(function (value, key) {
                    if (value.userId === userId) {
                        alogger.push(value)
                    }
                })
                if(alogger.length === 0){
                    res.status(404).json({
                        message:"조회할 채널이 없습니다"
                    })
                }else{
                console.log(alogger)
                res.status(200).json(alogger)
                }
            }
        }
        else{
            res.status(404).json({
                message:"조회할 채널이 없습니다"
            })
        }
    })

router
    .route('/:id')
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


router.put('/:id',(req, res) => {
    let {id} = req.params
    id = parseInt(id)

    var ytb = database.get(id)

    if(ytb == undefined){
        res.json({
            message : `요청하신 ${id} 유튜버는 없는 블로거입니다.`
        })
    }

    else{
        let newTitle = req.body.channelTitle
        ytb.channelTitle = newTitle;
        database.set(id,ytb)
        res.json({
            message: `${req.body.channelTitle} 로 수정되었습니다.`
        })
    }
})
module.exports = router;
