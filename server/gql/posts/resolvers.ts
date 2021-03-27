import {Posts} from '../../db/schemas'
import {AuthenticationError} from 'apollo-server-express'

export default {
    Query: {
        findAllPosts(_: object, __: object, {admin}: any){
            if(admin){
                return Posts.find({}).then(data => data)
            } else{
                throw new AuthenticationError("You're not authorised!");
            }
        }
    }
}