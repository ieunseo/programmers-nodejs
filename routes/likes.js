const express = require('express');
const router = express.Router();


router.use(express,json());
//좋아요
router.post('/likes/:id',(res,req)=>{
    res.json('좋아요')
})

//좋아요 삭제
router.delete('/likes/:id',(req,res)=>{
    res.json('좋아요 삭제')
})
module.exports = router;