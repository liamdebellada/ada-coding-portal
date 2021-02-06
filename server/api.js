const express = require('express')
var router = express.Router()

const models = require('./schemas')

//mongo timesaving
const findall = async (model) => {
    let data = await model.find({}).then(data => data).catch(error => error)
    return data
}

router.route('/challenges')
.get(async (req, res) => {
    // var creation = await models.challengeModel.create({
    //     icon: "/icons/any.svg",
    //     title: "ApiCall",
    //     description: "THis is a description with lots and lots of content",
    //     url: "http://fbbsvr.ddns.net/challenge/1"
    // }).then(done => done).catch(error => error)
    // console.log(creation)
    res.send(await findall(models.challengeModel))
}).post((req,res) => {
    res.json({})    
})

router.route('/submissions')
.get(async (req, res) => {
    res.send(await findall(models.submissionsModel))
}).post((req, res) => {
    res.json({})
})

router.route('/upcoming')
.get(async (req, res) => {
    res.send(await findall(models.upcomingModel))
}).post((req, res) => {
    res.json({})
})

router.route('/profiles')
.get(async (req, res) => {
    res.send(await findall(models.profilesModel))
}).post((req, res) => {
    res.send({})
})

router.post('/registerCheck', async (req, res) => {
    await models.profilesModel.find({account: req.body})
    .then(async (data) => {
        if (data.length == 0) {
            await models.profilesModel.create({
                account: req.body,
                rankData: {},
                Submissions: {},
                url: `/${req.body.name.toLowerCase().replace(" ", "_")}`
            })
        }
    })
    res.status(200).end()
})

router.post('/isUser', async (req,res) => {
    await models.profilesModel.find({url: `/${req.body.tag}`}).then(data => {
        if (data.length > 0) {
            return res.send(true)
        } else {
            return res.send(false)
        }
    }).catch(() => res.status(404).end())
})
module.exports = router