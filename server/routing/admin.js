const express = require('express')
var router = express.Router()

router.post('/test', (req,res) => {
    res.send('success')
})

module.exports = router