const express = require('express');
const router = express.Router();

const { addLike , deleteLike } = require('../controlloer/LikeController');

router.use(express.json());
//좋아요
router.post('/likes/:id',addLike);

//좋아요 삭제
router.delete('/likes/:id',deleteLike);
module.exports = router;