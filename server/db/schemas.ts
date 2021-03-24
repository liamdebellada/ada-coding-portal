import { Document, Model, model, Types, Schema, Query } from "mongoose"

export interface Ichallenges extends Document {
    icon: string,
    title: string,
    description: string,
    difficulty: number,
    due: Date,
    teacher: string,
    languages: Array<Types.ObjectId>
}

const challengesSchema: Schema = new Schema({
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
    teacher: {
        type: String,
        required: true
    },
    languages: {
        type: Array,
        required: true
    }
})

export interface Isubmissions extends Document {
    challenge: Types.ObjectId,
    directory: string,
    submitted: boolean,
    user: Types.ObjectId
}

const submissionsSchema: Schema = new Schema({
    challenge: {
        type: Types.ObjectId,
        required: true
    },
    directory: {
        type: String,
        required: true,
    },
    submitted: {
        type: Boolean,
        required: true
    },
    user: {
        type: Types.ObjectId,
        required: true
    }
})


export interface Iprofiles extends Document {
    account: Object,
    url: string,
    admin: boolean,
    settings: Array<Object>,
    userSpaceDirectory: string,
    challenges: Array<Types.ObjectId>
}

const profilesSchema: Schema = new Schema({
    account: {
        type: Object,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    settings: {
        type: Array,
        required: false
    },
    userSpaceDirectory: {
        type: String,
        required: true
    },
    challenges: {
        type: Array,
        required: true
    }
})

export interface Iposts extends Document {
    id: Types.ObjectId,
    user: Types.ObjectId,
    comments: Array<Types.ObjectId>,
    document: Types.ObjectId,
    likes: number
}

const postsSchema: Schema = new Schema({
    id: {
        type: Types.ObjectId,
        required: true
    },
    user: {
        type: Types.ObjectId,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    document: {
        type: Types.ObjectId,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
})

export interface Itrophies extends Document {
    id: Types.ObjectId,
    description: string,
    icon: string,
    names: string,
    rank: number
}

const trophiesSchema: Schema = new Schema({
    id: {
        type: Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
})

export interface Ilanguages extends Document {
    id: Types.ObjectId,
    name: string,
    difficulty: number,
    icon: string
}

const languagesSchema: Schema = new Schema({
    id: {
        type: Types.ObjectId,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})

export const Challenges: Model<Ichallenges> = model("challenges", challengesSchema)
export const Submissions: Model<Isubmissions> = model("submissions", submissionsSchema)
export const Profiles: Model<Iprofiles> = model("profiles", profilesSchema)
export const Posts: Model<Iposts> = model("posts", postsSchema)
export const Trophies: Model<Itrophies> = model("trophies", trophiesSchema)
export const Languages: Model<Ilanguages> = model("languages", languagesSchema)