const express = require('express');
const router = express.Router();
const conn = require('../db');
const { body,param ,validationResult } = require('express-validator')

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

// npm install cookie-parser
const cookieParser = require('cookie-parser');
conn.query(
        'SELECT * FROM `users`',
    function(err,results,fields) {

        }
    );
router.use(express.json());


// 회원가입
router.post('/join',[body('contact').notEmpty().isInt().withMessage('숫자 입력 필요'),
    body('name').notEmpty().isString().withMessage('문자 입력 필요'),
    body('email').notEmpty().isString().withMessage('문자 입력 필요'),
    body('password').notEmpty().withMessage('문자 입력 필요')], (req, res) => {
    const { email, password, name, contact } = req.body;

    if (!email || !password || !name || !contact) {  // 입력값 검증
        return res.status(400).json({
            message: "입력값을 다시 확인해주세요."
        });
    }

    conn.query(
        `INSERT INTO users (email, password, name, contact) VALUES (?, ?, ?, ?)`,
        [email, password, name, contact],
        function (err, results, fields) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: "회원가입이 완료되었습니다.",
                results: results
            });
        }
    );
});

// 로그인
router.post('/login',[body('email').notEmpty().isString().withMessage('문자로받아용'),
    body('password').notEmpty().isInt().withMessage('숫자 입력 필요')], (req, res) => {
    const { email, password } = req.body;
    var loginData = {}
    conn.query(
        `SELECT * FROM users WHERE email = ?`,email,
        function(err,results,fields) {
            if(results.length){
                loginData = results[0]
                if(loginData.password == password) {
                    // 토큰발급
                    const token = jwt.sign({
                        email:loginData.email,
                        name:loginData.name
                    },process.env.PRIVATE_KEY,{
                        expiresIn: '30m',
                        issuer:"eunseo"
                    });

                     res.cookie("token",token,{
                         httpOnly:true
                     });
                    res.status(200).json({
                        message: `${loginData.name}님 로그인 되었습니다.`
                    })
                }else{
                    res.status(403).json({
                        message:"비밀번호가 틀렸습니다."
                    })
                }
            }else{
                res.status(404).json({
                    message:"회원정보가 없습니다."
                })
            }
        }
    )



//     // // filter 를 사용해보고싶어서 배열로 변경후 찾았음.
//     // const userArray = [...database.values()].filter(user => (user.userId === userId));
//
//
//     // 수업에서 사용한방식 (변형함)
//
//     var LoginData = {}
//
//     database.forEach(function(user){
//         if(user.userId === userId) {
//             //존재하는경우 user 를 LoginData에 담음
//             LoginData = user
//         }
//     })
//
//     if(hasUser(LoginData)){ // 문자열도 객체임.
//         console.log("")
//
//         //
//         if(LoginData.password === password){
//             console.log("패스워드까지 맞췄다 \n 로그인 성공!!!!!")
//         }else{
//             console.log("패스워드를 다시한번확인해주세요.")
//         }
//     }else{
//         console.log("Id를 확인해주세요.")
//     }
//
// function hasUser(obj){
//         if(Object.keys(obj).length){
//             return true
//         }else{
//             return false
//         }
// }
//
//
//     // // userId가 존재하지 않는 경우
//     // const userData = userArray[0];
//     //  if (userArray.length === 0) {
//     //      return res.status(400).json({ message: '아이디가 존재하지 않습니다.' });
//     //  }
//     //
//     //
//     //
//     //  //비밀번호 확인
//     //
//     //  if (userData.password === password) {
//     //      return res.status(200).json({ message: '로그인 성공' });
//     //  } else {
//     //      return res.status(400).json({ message: '패스워드가 일치하지 않습니다.' });
//     //  }
});


// 회원 개별 조회 - GET 방식으로 URL에 email 쿼리 매개변수 사용
router.get('/users', body('email').notEmpty().isString().withMessage('입력확인'),(req, res) => {
    const { email } = req.body;  // query에서 email 가져오기
    conn.query(
        `SELECT * FROM users WHERE email = ?`, email,  // SQL 인젝션 방지
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (results.length) {
                res.status(200).json(results);
            } else {
                res.status(404).json({
                    message: "회원정보가 없습니다."
                });
            }
        }
    );
});

// 회원 탈퇴
router.delete('/users/:n',body('email').notEmpty().isString().withMessage('문자로받아용'), (req, res) => {
    const { email } = req.body;  // body에서 email 가져오기

    if (!email) {
        return res.status(400).json({
            message: "이메일을 입력해주세요."
        });
    }

    conn.query(
        `DELETE FROM users WHERE email = ?`, [email],  // SQL 인젝션 방지를 위해 배열 사용
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (results.affectedRows > 0) {  // 삭제된 행이 있는지 확인
                res.status(200).json({
                    message: `${email} 이메일의 회원이 삭제되었습니다.`
                });
            } else {
                res.status(404).json({
                    message: "회원정보가 없습니다."
                });
            }
        }
    );
});

module.exports = router;