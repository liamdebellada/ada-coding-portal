import {Profiles} from '../../db/schemas'

export default {
    Query: {
        findAllProfiles() {
            console.log("woop");
            return Profiles.find({}).then(data => data);
        },
        findProfileByID(_: any, {id}: any) {
            return Profiles.findOne({_id: id}).then(data => data);
        },
        findProfileByGoogleID(_: any, {id}: any){
            return Profiles.findOne({"account.id": id}).then(data => data);
        }
    }
}