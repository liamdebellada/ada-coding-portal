import {Trophies} from '../../db/schemas'

export default {
    Query: {
        findAllTrophies() {
            return Trophies.find({}).then(data => data)
        }
    }
}