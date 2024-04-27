const express = require('express');
const { connectionToDB } = require('./config/dbConfig');
const { todoRouter } = require('./routes/todoRouter');
const { userRouter } = require('./routes/userRouter');
const cors = require('cors');

const port = 3000;

const app = express();
app.use(express.json())
app.use(cors())
app.use('/users', userRouter)
app.use('/todos', todoRouter)
app.listen(port, async() => {
   await connectionToDB()
    console.log('listening on port');
})