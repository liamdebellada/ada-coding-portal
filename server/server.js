const mongoose = require('mongoose')
const express = require('express')
const rateLimit = require('express-rate-limit')
const bodyparser = require('body-parser')
const cors = require('cors')

var jsonParser = bodyparser.json()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const api = require('./routing/api')
const contentApi = require('./routing/contentApi')

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

server.listen('5192')