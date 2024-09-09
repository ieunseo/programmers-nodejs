const express = require('express');
const app = express();
const port = 3300;

let database = new Map();
var no = 1;

app.use(express.json());

app.listen(port, () => {
    console.log(`Running at ${port}`);
});

// 로그인
app.post('/youtubers/login', (req, res) => {
});

// 회원가입
app.post('/youtubers/join', (req, res) => {
    const { userId, password, name } = req.body;

    if (!userId || !password || !name) {
        return res.status(400).json({
            message: "입력값을 다시 확인해주세요."
        });
    }

    // userId가 이미 존재하는지 확인
    if (database.has(userId)) {
        return res.status(400).json({
            message: '존재하는 아이디입니다.'
        });
    }
    // 회원가입 성공
    database.set(no++, req.body);
    res.status(201).json({
        message: `${database.get(no - 1).name} 님 환영합니다.`
    });
});


// 회원 개별 조회
app.get('/youtubers/users/:n', (req, res) => {
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
app.delete('/youtubers/users/:n', (req, res) => {
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
