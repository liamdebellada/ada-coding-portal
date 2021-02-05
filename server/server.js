const mongoose = require('mongoose')
const express = require('express')

const app = express()
const api = require('./api')

mongoose.connect('mongodb://localhost:27017/',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log("connected"))
.catch(err => console.log(err))


app.use('/api', api)
app.listen('5192')