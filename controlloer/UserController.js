const conn = require('../db');
const {StatusCodes} = require('http');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const join = (res,req)=>{
    const { email , password } = req.body;

    let sql = 'INSERT INTO users (email,password) VALUES(?,?)';


    conn.query(sql,[email,password],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQUEST
        }
        res.status(StatusCodes.CREATED).json(result);
    })
}

const login = (req,res) => {
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

const passResetRequest = (req,res) => {
    res.json()
}

const passwordReset = (req,res) => {

}
module.exports = {
    join,
    login,
    passResetRequest,
    passwordReset
}