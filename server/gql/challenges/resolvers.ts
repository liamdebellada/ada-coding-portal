import {Submissions, Challenges} from '../../db/schemas';
import { Types } from 'mongoose'
import {Profiles} from '../../db/schemas';

export default {
    Query: {

        findAllChallenges() {
            return Challenges.find({}).then(data => data);
        },

        findProfileByGoogleID(_: any, {id}: any){

            Profiles.findOne({"account.id": id}).then(data => {
                return data;
            });

        },

        findChallengeByID(_: any, {id}: any) {
            return Challenges.findOne({_id: id}).then(data => data);
        },

        findPopularChallenges() { //query sumbissions by id and aggregate the challenge ID's by frequency.
            return Submissions.aggregate([
                {
                    $unwind : "$challenge"
                },
                {
                    $sortByCount : "$challenge"
                },
                {
                    $lookup: {
                        from: "challenges",
                        localField: "_id",
                        foreignField: "_id",
                        as: "challenge"
                    } 
                }
            ]).then(data => {
                return data
            })
        },
        findChallengesByLanguage(_: any, {id}: any) {
            return Challenges.find({languages: Types.ObjectId(id)}).then(data => data)
        }

    },

    profiles: {

        challenges(parent: any){
            //todo: make this neater:
            var ids = parent.challenges.map(function(i:any) {
                return i.id;
              });

            return Challenges.find({_id: { $in: ids }}).then(data => data);
        },

    },

    challenges: {
        teacher(parent: any){
            return Profiles.find({_id: parent.teacher}).then(data => data);
        }
    }




}