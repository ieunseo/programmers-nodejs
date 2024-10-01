const express = require('express')
const app = express()


const dotenv = require('dotenv').config();

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello! World')
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})

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