import {Languages} from '../../db/schemas'

export default {
    Query: {
        findAllLanguages() {
            return Languages.find({}).then(data => data)
        },
        findLanguageByID(_: any, {id}: any) {
            return Languages.findOne({_id: id}).then(data => data)
        }
    }
}
