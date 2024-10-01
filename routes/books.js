const express = require('express');
const router = express.Router();


router.use(express,json());
//전체조회
router.get('/books',(res,req)=>{
    res.json('전체조회')
})

//개별조회
router.get('/books/:id',(req,res)=>{
    res.json('개별조회')
})
//도서목록 조회
router.post('/books',(req,res)=>{
    res.json('카테고리별 조회')
})

module.exports = router;