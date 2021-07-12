import {Submissions, Challenges, Profiles} from '../../db/schemas';
import { Types } from 'mongoose'
import { AuthenticationError } from 'apollo-server-errors';

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

    Mutation: {
        /* 
            Creates new submissions doc.
            Inserts new object into challenges array for user.
        */
        joinChallenge(_: any, {challengeID}: any, {user}: any) {
            Submissions.create({
                challenge: Types.ObjectId(challengeID),
                submitted: false,
                user: Types.ObjectId(user._id)
            }).then(data => {
                Profiles.updateOne({_id: user._id}, { $push: { challenges: {
                    id: Types.ObjectId(challengeID),
                    submission: Types.ObjectId(data._id)
                } } }).catch(() => new Error('Could not subscribe to challenge.'))
            }).catch(() => {
                throw new Error("Could not subscribe to challenge.")
            })

            return "done"
        },
        updateChallenge(_: any, {challengeObject}: any, {admin}: any) {
            challengeObject = JSON.parse(challengeObject)
            if (admin) {
                return Challenges.updateOne({_id: challengeObject._id}, challengeObject).then((data) => {
                    return 'done'
                }).catch(() => {
                    throw new Error('Failed to create challenge.')
                })
            } else {
                throw new AuthenticationError('Not Authorized.')
            }
        },
        createChallenge(_:any, {challengeObject}: any, {admin}: any) {
            if (admin) {
                Challenges.create(challengeObject).then((challenge) => {
                    return challenge;
                }).catch(() => {
                    throw new Error('Unable to create challenge.')
                })
            } else {
                throw new AuthenticationError('Not Authorized.')
            }
        }
    },

    profiles: {
        challenges(parent: any){
            //todo: make this neater:
            var ids = parent.challenges.map(function(i:any) {
                return i
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