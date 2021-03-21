const express = require('express')
var router = express.Router()
const models = require('../schemas')
const axios = require('axios')
const fs = require('fs')

router.get('/getChallenges/:id', async (req, res) => {
    // console.log(req.params)
    let data = await models.challenges.model.findOne({_id: req.params.id}).then(data => data).catch(error => error)
    let submissionCount = await models.challenges.model.countDocuments({for: req.params.id}).then(data => data).catch(error => false)
    res.send({
        challenge: data,
        submissions: submissionCount
    })
})

router.get('/getSubmissions/:id', async (req, res) => {
    let submissions = await models.submissions.model.find({for: req.params.id}).then(data => data).catch(() => false)
    res.send(submissions)
})

router.get('/getSubmission/:id', async (req, res) => {
    let submission = await models.submissions.model.findOne({_id: req.params.id}).then(data => data).catch(() => false)
    res.send(submission)
})

router.post('/isUser', async (req,res) => {
    await models.profiles.model.find({url: `/${req.body.tag}`}).then(data => {
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


router.post('/registerCheck', async (req, res) => {
    let auth = req.get('authorization')
    if (auth) {
        let token = auth.split(" ")[1]
        try {
            var user = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`)

            var exists = await models.profiles.model.countDocuments({"account.id" : user.data.id}) == 1 ? true : false
            if (exists) {
                return res.send('done')
            } else {
                //setup empty userspace directory
                var userDirectory = `${process.env.USERSPACE_DIR}/${user.data.name.toLowerCase().replace(" ", "_")}`
                fs.mkdirSync(userDirectory)

                //create document for new user
                await models.profiles.model.create({
                    account: user.data,
                    rankData: {},
                    Submissions: {},
                    url: `/${user.data.name.toLowerCase().replace(" ", "_")}`,
                    admin: false,
                    userSpaceDirectory: userDirectory
                }).then(() => {
                    return res.send('done')
                }).catch(() => {
                    return res.status(500).send('error')
                })
            }
        } catch(e) {
            console.log(e)
            return res.status(500).send("Internal error")
        }
    } else {
        return res.status(403).send("Not authorized")
    }



})

module.exports = router