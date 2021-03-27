
import {Profiles} from '../../db/schemas'

export default {
    Query: {
        findAllChallenges() {
            return Profiles.find({}).then(data => data)
        }
    }
}