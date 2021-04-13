import {Trophies} from '../../db/schemas'

export default {
    Query: {
        findAllTrophies() {
            return Trophies.find({}).then(data => data)
        },
        findTrophyByID(_: any, {id}: any) {
            return Trophies.findOne({_id: id}).then(data => data)
        }
    }
}