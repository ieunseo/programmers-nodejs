const express = require('express');
const router = express.Router();

const  {
    addCart,
    getCartItems,
    deleteCartItems
} = require('../controllers/CartController');

router.use(express.json());
//장바구니 담기
router.post('/carts',addCart)

//장바구니 목록조회
router.get('/carts',getCartItems)
// 장바구니 아이템 삭제

router.delete('/carts/:id',deleteCartItems)

module.exports = router;