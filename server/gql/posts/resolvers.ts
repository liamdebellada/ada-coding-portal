import {Posts} from '../../db/schemas'

export default {
    Query: {
        findAllChallenges() {
            return Posts.find({}).then(data => data)
        }
    }
}