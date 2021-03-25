import {Languages} from '../../db/schemas'

export default {
    Query: {
        findAllLanguages() {
            return Languages.find({}).then(data => data)
        }
    }
}
