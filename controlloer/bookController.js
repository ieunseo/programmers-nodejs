const conn = require('../db');
const {StatusCodes} = require('http-status-codes');
const allBooks = (req,res)=>{}
const bookDetail = (req, res) => {
    let {id} = req.params;
    let sql = "SELECT * FROM books WHERE id=?";
    conn.query(sql, id,(err, result) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if(result[0])
            return res.status(StatusCodes.OK).end(result[0]);
        else
            return res.status(StatusCodes.NOT_FOUND).end();
    })
}

const booksByCategory = (req, res) => {
    res.json()
}

module.exports = {
    allBooks,
    bookDetail,
    booksByCategory
}