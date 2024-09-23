const express = require('express');
const router = express.Router();
const conn = require('../db');

router.use(express.json());

// 채널 생성
router.post('/', (req, res) => {
    const { email, channelTitle } = req.body;

    if (!email || !channelTitle) {
        return res.status(400).json({
            message: "요청값(양식)이 잘못되었습니다."
        });
    }

    const sql_query = `INSERT INTO channels (email, channelTitle) VALUES (?, ?)`;
    conn.query(sql_query, [email, channelTitle], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: `${channelTitle}님의 기록을 응원합니다.`,
            results
        });
    });
});

// 전체 조회
router.get('/', (req, res) => {
    const { email } = req.query;  // 쿼리 파라미터로 email 받기

    if (!email) {
        return res.status(400).json({
            message: "이메일이 필요합니다."
        });
    }

    const sql_query = `SELECT * FROM channels WHERE email = ?`;
    conn.query(sql_query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
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

// 회원 개별 조회
router.get('/users/:email', (req, res) => {
    const email = req.params.email;

    const sql_query = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql_query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            res.status(404).json({
                message: "회원을 찾을 수 없습니다."
            });
        } else {
            res.status(200).json(results);
        }
    });
});

// 회원 개별 삭제
router.delete('/users/:email', (req, res) => {
    const email = req.params.email;

    const sql_query = `DELETE FROM users WHERE email = ?`;
    conn.query(sql_query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.affectedRows > 0) {
            res.status(200).json({
                message: `${email}님의 계정이 정상적으로 삭제되었습니다.`
            });
        } else {
            res.status(404).json({
                message: "회원을 찾을 수 없습니다."
            });
        }
    });
});

// 채널 제목 수정
router.put('/users/:email', (req, res) => {
    const email = req.params.email;
    const { channelTitle } = req.body;

    if (!channelTitle) {
        return res.status(400).json({
            message: "수정할 채널 제목을 입력해주세요."
        });
    }

    const sql_query = `UPDATE channels SET channelTitle = ? WHERE email = ?`;
    conn.query(sql_query, [channelTitle, email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.affectedRows > 0) {
            res.status(200).json({
                message: `${channelTitle}로 수정되었습니다.`
            });
        } else {
            res.status(404).json({
                message: "회원을 찾을 수 없습니다."
            });
        }
    });
});

module.exports = router;
