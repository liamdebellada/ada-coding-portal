import { AuthenticationError } from 'apollo-server-errors'
import {Trophies} from '../../db/schemas'

export default {
    Query: {
        findAllTrophies() {
            return Trophies.find({}).then(data => data)
        },
        findTrophyByID(_: any, {id}: any) {
            return Trophies.findOne({_id: id}).then(data => data)
        }
    },
    Mutation: {
        updateBadge(_:any, {badgeObject}: any, {admin}: any) {
            if (admin) {
                badgeObject = JSON.parse(badgeObject)
                Trophies.updateOne({_id: badgeObject._id}, badgeObject).then((done) => {
                    return 'done'
                }).catch(() => {
                    throw new Error('Could not update badge.')
                })
            } else {
                throw new AuthenticationError('Not authorized.')
            }
        }
    }
}