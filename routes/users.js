const express = require('express');
const router = express.Router();
const conn = require('../db');
const { StatusCodes } = require('http-status-codes');

var jwt = require('jsonwebtoken');
const {join, login, passResetRequest, passwordReset} = require('../controlloer/UserController')

router.use(express.json());
//회원가입
router.post('/join',join);

//로그인
router.post('/login',login)
// 비밀번호 초기화 요청
router.post('/request-reset', passResetRequest);

// 비밀번호 초기화
router.post('/reset-password', passwordReset);


module.exports = router;