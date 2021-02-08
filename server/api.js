const express = require('express')
var router = express.Router()
const models = require('./schemas')
const keys = require('./keys.json')

//mongo timesaving
const findall = async (model) => {
    let data = await model.find({}).then(data => data).catch(error => error)
    return data
}

const createDoc = async (model, object) => {
    let data = await model.create(object).then(() => true).catch(() => false)
    return data
}

router.route('/challenges')
.get(async (req, res) => {
    res.send(await findall(models.challengeModel))
}).post(async (req,res) => {
    if (!keys.includes(req.body.key)) {
        return res.status(404).end()
    }
    var success = await createDoc(models.challengeModel, {
        icon: req.body.icon,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url
    })
    res.send(success).end()
})

router.route('/submissions')
.get(async (req, res) => {
    res.send(await findall(models.submissionsModel))
}).post(async (req, res) => {
    if (!keys.includes(req.body.key)) {
        return res.status(404).end()
    }
    var success = await createDoc(models.submissionsModel, {
        date: req.body.date,
        user: req.body.user,
        views: 0,
        votes: 0
    })
    res.send(success).end()
})

router.route('/upcoming')
.get(async (req, res) => {
    res.send(await findall(models.upcomingModel))
}).post(async (req, res) => {
    if (!keys.includes(req.body.key)) {
        return res.status(404).end()
    }
    var success = await createDoc(models.upcomingModel, {
        title: req.body.title,
        image: req.body.image
    })
    res.send(success).end()
})

router.route('/profiles')
.get(async (req, res) => {
    res.send(await findall(models.profilesModel))
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

//user interaction routes
router.post('/createUpvote', async (req, res) => {
    var response = await models.submissionsModel.updateOne({_id: req.body.id}, {$inc: {votes: 1}}).then(res => res).catch(err => err)
    res.send(response)
})

router.post('/createView', async (req, res) => {
    var response = await models.submissionsModel.updateOne({_id: req.body.id}, {$inc: {views: 1}}).then(res => res).catch(err => err)
    res.send(response)
})

module.exports = router