import {Challenges} from '../../db/schemas'

export default {
    Query: {
        findAllChallenges() {
            return Challenges.find({}).then(data => data)
        },
        findChallengeByID(_: any, {id}: any) {
            return Challenges.findOne({_id: id}).then(data => data);
        }
    }
}