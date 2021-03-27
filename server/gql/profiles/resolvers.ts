import {Profiles} from '../../db/schemas'

export default {
    Query: {
        findAllChallenges() {
            return Profiles.find({}).then(data => data);
        },
        findChallengeByID(id: string) {
            return Profiles.find({_id: id}).then(data => data);
        }
    }
}