const express = require('express');
const app = express();

const port = 3300;
app.use(express.json());
app.listen(port, () => {
    console.log(`Running at ${port}`);
})

const userRouter = require('./routes/user-demo');
const loggerRouter = require('./routes/alog-demo');
app.use("/",userRouter);
app.use("/alog",loggerRouter);