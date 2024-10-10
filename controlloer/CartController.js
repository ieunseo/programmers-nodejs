const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

//담기
const addCart = (req, res) => {

    const{ book_id , quantity , user_id} = req.body;
    let sql = "INSERT INTO cartItems (book_id , quantity , user_id) VALUES (?,?,?,?)";
    let values = [book_id , quantity , user_id];
    conn.query(sql,values,(err,result) => {
        if(err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).end(result);
    })
}
//목록 조회
const getCartItems = (req, res) => {
    const{user_id} = req.body;
    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
                    FROM cartItems LEFT JOIN books
                    ON cartItems.book_id = book_id;
                    WHERE user_id = ?`;
    let values = [user_id]

    conn.query(sql,values,(err,result) => {
        if(err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).end(result);
    })
}
// 장바구니 도서삭제
const deleteCartItems = (req, res) => {}
module.exports = {
    addCart,
    getCartItems,
    deleteCartItems
}