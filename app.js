const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();

// body-parser 미들웨어 설정
app.use(bodyParser.json()); // JSON 형식의 요청 바디를 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello! World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

// 나머지 라우트 설정

const userRouter = require('./routes/users')
const bookRouter = require('./routes/books')
const likeRouter = require('./routes/likes')
const cartRouter = require('./routes/carts')
const orderRouter = require('./routes/orders')
app.use("/users",userRouter);
app.use("/",bookRouter);
app.use("/",likeRouter);
app.use("/",cartRouter);
app.use("/",orderRouter);