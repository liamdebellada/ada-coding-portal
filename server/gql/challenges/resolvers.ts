import {Challenges} from '../../db/schemas'

export default {
    Query: {
        findAllChallenges() {
            return Challenges.find({}).then(data => data)
        }
    }
}