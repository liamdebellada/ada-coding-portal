const models = require('./schemas')
const auth = async (req,res,next) => {
    let auth = req.get('authorization')
    if (!auth) {
        return res.status(403).send('Not Authorized')
    } else {
        let user = auth.split(" ")[1].split("|")[0]
        let token = auth.split(" ")[1].split("|")[1]

        var valid = await models.profiles.model.findOne({"account.email" : user}).then(async (data) => {
            if (data.admin && data.authToken == token) {
                return true
            } else {
                return false
            }
        }).catch(() => false)
        if (!valid) {
            return res.status(403).send('Not Authorized')
        } else {
            next()
        }
    }
}


module.exports = auth