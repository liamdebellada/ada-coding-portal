const express = require('express')
const models = require('../schemas')
var router = express.Router()

router.post('/updateSettings', async (req, res) => {
    await models.profiles.model.findOne({"account.id" : req.googleAccount.id}).then(async data => {
        if (data)  {
            if (data.settings.length > 0) {
                for (var setting in req.body.changes) {
                    var key = Object.keys(req.body.changes[setting])[0]
                    var index = data.settings.findIndex((i) => i[key])
                    data.settings[index][key] = Object.values(req.body.changes[setting])[0]
                }
                await models.profiles.model.updateOne({"account.id" : req.googleAccount.id}, {
                    settings: data.settings
                })
            } else {
                //no settings
                await models.profiles.model.updateOne({"account.id" : req.googleAccount.id}, {
                    settings: req.body.changes //creates initial settings object & push whatever changes are pending
                })
                .then(r => console.log(r))
                .catch(error => console.log(error))
            }
        }
    }).catch(error => {
        console.log(error)
        console.log("error")
    })

    res.send("DONE")
})

module.exports = router;