const express = require('express');
const router = express.Router();
const conn = require('../db'); // MySQL 연결 파일
const { body,param ,validationResult } = require('express-validator')
router.use(express.json());

// 채널 생성
router.post('/'
    , [body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
        body('name').notEmpty().isString().withMessage('문자 입력 필요')]
    , (req, res) => {
        const err = validationResult(req)
        if(!err.isEmpty()){
            console.log("유효성검사에서 걸렸음.")
            return res.status(400).json(err.array());

        }
    if(req.body.name){
        const {  name , userId } = req.body;

        const sql_query = `INSERT INTO alog (name, user_id) VALUES (?,?)`;
        conn.query(sql_query,[name,userId],(err,results)=> {
            if (err) {
                return res.status(500).json({error: err.message}).end();
            }

                res.status(200).json(results);

        })
    }
});

// 회원 한명의 블로그 전체 조회
router.get('/',
    body('userId').notEmpty().isInt().withMessage('숫자 입력 필요')
        , (req, res) => {
        const err = validationResult(req)
        if(!err.isEmpty()){
            console.log("유효성검사에서 걸렸음.")
            return res.status(400).json(err.array());

        }
    const { userId } = req.body;


    const sql_query = `SELECT * FROM alog WHERE user_id = ?`;
    userId && conn.query(sql_query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message }).end();
        }

        if (results.length === 0) {
            res.status(404).json({
                message: "조회할 채널이 없습니다."
            });
        } else {
            res.status(200).json(results);
        }
    });
});

// 채널 아이디를 가지고 개별 조회
router.get('/:id',
    param('id').notEmpty().withMessage('채널 아이디 필요함.')
    ,(req, res) => {
        const err = validationResult(req)
        if(!err.isEmpty()){
            console.log("유효성검사에서 걸렸음.")
            return res.status(400).json(err.array());

        }
    const id = parseInt(req.params.id);

    const sql_query = `SELECT * FROM alog WHERE id = ?`;
    conn.query(sql_query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            res.status(404).json({
                message: "잘못된 채널정보"
            });
        } else {
            res.status(200).json(results[0]);
        }
    });
});

// 개별 삭제
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const sql_query = `DELETE FROM alog WHERE id = ?`;
    conn.query(sql_query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.affectedRows > 0) {
            res.status(200).json({
                message: `ID ${id}의 로그가 정상적으로 삭제되었습니다.`
            });
        } else {
            res.status(404).json({
                message: "정보를 찾을 수 없습니다."
            });
        }
    });
});

// 채널 제목 수정
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "수정할 이름을 입력해주세요."
        });
    }

    const sql_query = `UPDATE alog SET name = ? WHERE id = ?`;
    conn.query(sql_query, [name, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.affectedRows > 0) {
            res.status(200).json({
                message: `${name}으로 수정되었습니다.`
            });
        } else {
            res.status(404).json({
                message: "정보를 찾을 수 없습니다."
            });
        }
    });
});

module.exports = router;
