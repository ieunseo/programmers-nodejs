const express = require('express');

const router = express.Router();
let database = new Map();
var no = 1;

router.use(express.json());



// 회원가입
router.post('/join', (req, res) => {
    const { userId, password, name } = req.body;

    if (!userId || !password || !name) {
        return res.status(400).json({
            message: "입력값을 다시 확인해주세요."
        });
    }

    // 회원가입 성공
    database.set(no++, req.body);
    res.status(201).json({
        message: `${database.get(no - 1).name} 님 환영합니다.`
    });
});


// 로그인
router.post('/login', (req, res) => {
    const { userId, password } = req.body;

    // // filter 를 사용해보고싶어서 배열로 변경후 찾았음.
    // const userArray = [...database.values()].filter(user => (user.userId === userId));


    // 수업에서 사용한방식 (변형함)

    var LoginData = {}

    database.forEach(function(user){
        if(user.userId === userId) {
            //존재하는경우 user 를 LoginData에 담음
            LoginData = user
        }
    })

    if(hasUser(LoginData)){ // 문자열도 객체임.
        console.log("")

        //
        if(LoginData.password === password){
            console.log("패스워드까지 맞췄다 \n 로그인 성공!!!!!")
        }else{
            console.log("패스워드를 다시한번확인해주세요.")
        }
    }else{
        console.log("Id를 확인해주세요.")
    }

function hasUser(obj){
        if(Object.keys(obj).length){
            return true
        }else{
            return false
        }
}


    // // userId가 존재하지 않는 경우
    // const userData = userArray[0];
    //  if (userArray.length === 0) {
    //      return res.status(400).json({ message: '아이디가 존재하지 않습니다.' });
    //  }
    //
    //
    //
    //  //비밀번호 확인
    //
    //  if (userData.password === password) {
    //      return res.status(200).json({ message: '로그인 성공' });
    //  } else {
    //      return res.status(400).json({ message: '패스워드가 일치하지 않습니다.' });
    //  }
});


// 회원 개별 조회
router.get('/users/:n', (req, res) => {
    const userNo = parseInt(req.params.n);
    const user = database.get(userNo);

    if (user) {
        res.status(200).json({

            userNo: userNo,
            Id : user.userId,
            name: user.name
        });
    } else {
        res.status(404).json({
            message: "회원정보가 없습니다."
        });
    }
});

// 회원 탈퇴
router.delete('/users/:n', (req, res) => {
    const userNo = parseInt(req.params.n);
    const user = database.get(userNo);

    if (user) {
        database.delete(userNo);
        res.status(200).json({
            message: `${user.name}님, 회원탈퇴가 정상적으로 이루어졌습니다.`
        });
    } else {
        res.status(404).json({
            message: "회원정보가 없습니다."
        });
    }
});

module.exports = router;