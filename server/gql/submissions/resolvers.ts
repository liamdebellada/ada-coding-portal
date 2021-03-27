import {Submissions} from '../../db/schemas'

export default {
    Query: {
        findAllChallenges() {
            return Submissions.find({}).then(data => data)
        }
    }
}