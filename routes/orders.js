const express = require('express');
const router = express.Router();


router.use(express.json());
//주문하기
router.post('/orders',(res,req)=>{
    res.json('주문하기')
})

//로그인
router.get('/orders',(req,res)=>{
    res.json('주문 목록조회')
})
//비밀번호 초기화 요청
router.get('/orders/:id',(req,res)=>{
    res.json('주문상세 상품 조회')
})

module.exports = router;