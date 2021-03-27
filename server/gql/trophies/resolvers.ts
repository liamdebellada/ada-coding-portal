import {Trophies} from '../../db/schemas'

export default {
    Query: {
        findAllChallenges() {
            return Trophies.find({}).then(data => data)
        }
    }
}