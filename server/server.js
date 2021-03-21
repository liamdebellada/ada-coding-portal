const mongoose = require('mongoose')
const express = require('express')
const rateLimit = require('express-rate-limit')
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config({path: '../.env'});

var jsonParser = bodyparser.json()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const api = require('./routing/api')
const contentApi = require('./routing/contentApi')
const admin = require('./routing/admin')
const user = require('./routing/user')
const {auth, userAuth} = require('./auth')

app.set('socket', io)

mongoose.connect('mongodb://localhost:27017/',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log("connected"))
.catch(err => console.log(err))

const ApiRL = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    statusCode: 429,
    message: {problem: "tmr", error: "Woah slow down, your making to many requests."}
})


app.all('*', ApiRL)
app.use(cors())
app.use('/api', jsonParser, api)
app.use('/api/content', jsonParser, contentApi)

app.use('/api/admin', [jsonParser, auth], admin)
app.use('/api/users', [jsonParser, userAuth], user)

server.listen('5192')