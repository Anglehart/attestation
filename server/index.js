const path = require('path')
const express = require('express')
const app = express()
const usersRouter = require('./orderRouter');
const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use('/aircrafts', usersRouter);

app.listen(3001)
