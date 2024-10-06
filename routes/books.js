const express = require('express');
const router = express.Router();
const {
    allBooks,
    bookDetail,
    booksByCategory
}= require('../controller/bookController');

router.use(express,json());
//전체조회
router.get('/books', allBooks)

//개별조회
router.get('/books/:id', bookDetail)
//도서목록 조회
router.post('/books',   booksByCategory)

module.exports = router;