import {Submissions} from '../../db/schemas'

export default {
    Query: {
        findAllSubmissions() {
            return Submissions.find({}).then(data => data)
        }
    }
}