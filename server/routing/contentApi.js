const express = require('express')
const models = require('../schemas')
var router = express.Router()

router.route('/data/:model').get(async (req, res) => {
    var valid = models[req.params.model] ? true : false
    if (valid) {
        models[req.params.model].model.find({}).then(data => {
            return res.json(data).end()
        }).catch(() => res.json({"Error" : "Something went wrong"}).end())
    } else {
        return res.json({"Error" : "Invalid model request"}).end()
    }
})

module.exports = router