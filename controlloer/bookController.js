const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

const allBooks = (req, res) => {
    let { category_id, news, limit = 10, currentPage = 1 } = req.query; // 기본값 설정
    let offset = limit * (currentPage - 1);

    // 기본 SQL 쿼리
    let sql = "SELECT * FROM books";
    let values = [];
    let conditions = [];

    // category_id가 있으면 조건 추가
    if (category_id) {
        conditions.push("category_id = ?");
        values.push(category_id);
    }

    // news가 true이면 최근 한 달 동안 출판된 책 필터링
    if (news === 'true') {
        conditions.push("pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()");
    }

    // 조건이 있으면 WHERE 절 추가
    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    // 페이징을 위해 LIMIT와 OFFSET 추가
    sql += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit), parseInt(offset)); // limit와 offset을 숫자로 변환

    console.log("Executing SQL: ", sql, values);  // 쿼리와 값을 출력하여 디버깅

    // 최종 쿼리 실행
    conn.query(sql, values, (err, result) => {
        if (err) {
            console.log("Database error: ", err);
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Query failed" });
        }
        if (result.length) {
            return res.status(StatusCodes.OK).json(result);
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "No books found" });
        }
    });
};


const bookDetail = (req, res) => {
    let { book_id } = req.params;
    let { user_id } = req.body;
    let sql = `SELECT *,
                            (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes,
                            (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) AS LIKED
                        FROM books
                        LEFT JOIN category
                        ON books.category_id = category_id
                        WHERE books.id = ?`;
    let values = [ user_id ,book_id, book_id]
    conn.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (result[0]) {
            return res.status(StatusCodes.OK).json(result[0]); // 객체를 JSON으로 응답
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};


const booksByCategory = (req, res) => {
    res.json()
}

module.exports = {
    allBooks,
    bookDetail,
    booksByCategory
}