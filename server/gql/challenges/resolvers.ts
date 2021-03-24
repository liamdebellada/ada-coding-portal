import {Challenges} from '../../db/schemas'

const resolvers = {
    Query: {
        findAllChallenges() {
            return Challenges.find({}).then(data => data)
        }
    }
}

export default resolvers