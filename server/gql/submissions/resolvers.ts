import {Submissions} from '../../db/schemas'

export default {
    Query: {
        findAllSubmissions() {
            return Submissions.find({}).then(data => data)
        },
        findSubmissionsForUser(_: any, __: any, {user} : any) {
            return Submissions.find({user: user._id}).then(data => data)
        }
    }
}