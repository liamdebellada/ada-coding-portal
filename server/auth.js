const axios = require('axios')
const models = require('./schemas')
const auth = async (req,res,next) => {
    let auth = req.get('authorization')
    if (!auth) {
        return res.status(403).send('Not Authorized')
    } else {
        let gt = auth.split(" ")[1]
        try {
            var user = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${gt}`)
        } catch {
            return res.status(403).send('Not Authorized')
        }
        if (user.status == 200) {
            var authorised = await models.profiles.model.findOne({"account.id" : user.data.id}).then(data => {
                return data.admin ? true : false  
            }).catch(() => {
                return "error"
            })
            if (authorised != "error") {
                if (authorised) {
                    next()
                } else {
                    return res.status(403).send("Not Authorized")
                }
            } else {
                return res.status(500).send("Database error")
            }
        } else {
            return res.status(500).send('Internal server issue')
        }
    }
}


const userAuth = async (req,res,next) => {
    let auth = req.get('authorization')
    if (!auth) {
        return res.status(403).send('Not Authorized')
    } else {
        let gt = auth.split(" ")[1]
        try {
            var user = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${gt}`)
        } catch {
            return res.status(403).send('Not Authorized')
        }
        if (user.status == 200) {
            //check if user document exists
            let authorised = await models.profiles.model.countDocuments({"account.id" : user.data.id}) == 1 ? true : false

            if (authorised) {
                req.googleAccount = user.data;
                next();
            } else {
                return res.status(403).send('Not Authorized')
            }

        } else {
            return res.status(500).send('Internal server issue')
        }
    }
}

module.exports = {auth, userAuth}