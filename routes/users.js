const express = require('express');
const router = express.Router();
const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

const {join, login, passResetRequest, passwordReset} = require('../controller/UserController')

router.use(express,json());
//회원가입
router.post('/join',join);

//로그인
router.post('/login',login)
//비밀번호 초기화 요청
router.post('/changePW',passResetRequest)
//비밀번호 초기화
router.post('/changePW',passwordReset)

module.exports = router;