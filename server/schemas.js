const mongoose = require('mongoose')

const challenges = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    submissions: {
        type: Number,
        required: true
    }
})

const submissions = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    for: {
        type: String,
        required: true
    }
})

const upcoming = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const profiles = new mongoose.Schema({
    account: {
        type: Object,
        required: true
    },
    rankData: {
        type: Object,
        required: true
    },
    Submissions: {
        type: Object,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

const challengeModel = mongoose.model('challenges', challenges)
const submissionsModel = mongoose.model('submissions', submissions)
const upcomingModel = mongoose.model('upcoming', upcoming)
const profilesModel = mongoose.model('profiles', profiles)

module.exports = {challengeModel, submissionsModel, upcomingModel, profilesModel}