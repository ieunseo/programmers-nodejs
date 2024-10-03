const express = require('express');
const router = express.Router();
const conn = require('../db');


router.use(express,json());
//회원가입
router.post('/join',(res,req)=>{
    const { email , password } = req.body;

    let sql = 'INSERT INTO users (email,password) VALUES(?,?)';


    conn.query(sql,[email,passsword],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).end(); //BAD REQUEST
        }
        res.status(201).json(result);
    })
})

//로그인
router.post('/login',(req,res)=>{
    res.json('로그인')
})
//비밀번호 초기화 요청
router.post('/changePW',(req,res)=>{
    res.json('비밀번호 초기화요청')
})
//비밀번호 초기화
router.post('/changePW',(req,res)=>{
    res.json('비밀번호 초기화')
})

module.exports = router;