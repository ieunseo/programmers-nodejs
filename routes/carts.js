const express = require('express');
const router = express.Router();


router.use(express,json());
//장바구니 담기
router.post('/carts',(res,req)=>{
    res.json('방바구니 담기')
})

//로그인
router.get('/carts',(req,res)=>{
    res.json('장바구니 조회')
})
//비밀번호 초기화 요청
router.delte('/carts',(req,res)=>{
    res.json('장바구니 삭제')
})
// 주문 예상 상품 조회
// router.delte('/carts',(req,res)=>{
//     res.json('장바구니 삭제')
// })
module.exports = router;