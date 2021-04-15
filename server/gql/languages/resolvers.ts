import { AuthenticationError } from 'apollo-server-errors'
import {Languages} from '../../db/schemas'

export default {
    Query: {
        findAllLanguages() {
            return Languages.find({}).then(data => data)
        },
        findLanguageByID(_: any, {id}: any) {
            return Languages.findOne({_id: id}).then(data => data)
        }
    },
    Mutation: {
        updateLanguage(_: any, {languageObject}: any, {admin}: any) {
            if (admin) {
                languageObject = JSON.parse(languageObject)
                Languages.updateOne({_id: languageObject._id}, languageObject).then(() => {
                    return 'done'
                }).catch(() => {
                    throw new Error('Unable to update language.')
                })
            } else {
                throw new AuthenticationError('Not authorized.')
            }
        }
    }
}
