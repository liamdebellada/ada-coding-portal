const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

var jsonParser = bodyparser.json()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const api = require('./api')

app.set('socket', io)

mongoose.connect('mongodb://localhost:27017/',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log("connected"))
.catch(err => console.log(err))

app.use(cors())
io.on('connection', (socket) => {
    //create socket events here (these are global)
})

module.exports = io

app.use('/api', jsonParser, api)
server.listen('5192')