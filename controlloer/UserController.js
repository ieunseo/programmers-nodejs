const conn = require('../db');
const { StatusCodes } = require('http-status-codes');

var jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const join = (req, res)=>{
    const { email , password, username } = req.body;

    let sql = 'INSERT INTO users (email,password,username) VALUES(?,?,?)';


    conn.query(sql,[email,password,username],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQUEST
        }
        res.status(StatusCodes.CREATED).json(result);
    })
}

const login = (req, res) => {
    const { email , password } = req.body;

    let sql = 'SELECT * FROM users WHERE email=?';
    conn.query(sql,email,(err,result)=>{
        if(err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQUEST
        }
        const hasUser = results[0];
        if(hasUser && hasUser.password ==password){
            const token = jwt.sign({
                email : hasUser.email },
                process.env.PRIVATE_KEY,{
                expiresIn : '5m',
                    issuer : 'ieunseo'

            });

            res.cookie("token",token,{
                httpOnly : true
            })
            console.log(token);

            return res.status(StatusCodes.OK).json(results);
        }else{
            return res.status(StatusCodes.UNAUTHORIZED).end(); // UNAUTHORIZED 비인증상태
        }
    })
}

const passResetRequest = (req, res) => {
    const { email  } = req.body;

    let sql = 'SELECT * FROM users WHERE email=?';
    conn.query(sql,email,(err,result)=>{
        if(err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQUEST
        }
       const hasUser = result[0];
        if(hasUser){
            return res.status(StatusCodes.OK).json({
                email : email
            });
        }else{
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }
    })
}

const passwordReset = (req,res) => {
    const { email , password } = req.body;
    console.log(req.body);  // 요청이 제대로 들어오는지 확인

    let sql = 'UPDATE users SET password = ? WHERE email= ?';
    let values = [password,email];


    conn.query(sql,values,(err,result)=>{
        if(err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQUEST
        }

        if(result.affectedRows == 0){
            return res.status(StatusCodes.BAD_REQUEST).end();
        }else{
            return res.status(StatusCodes.OK).json(result);
        }
    })

}
module.exports = {
    join,
    login,
    passResetRequest,
    passwordReset
}