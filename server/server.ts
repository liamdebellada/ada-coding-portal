import express from 'express';
import { connect } from 'mongoose'
import {readFileSync} from 'fs'
import {ApolloServer, gql} from 'apollo-server-express'
import {merge} from 'lodash'

//schema imports
import {Challenges, Posts, Profiles, Submissions, Trophies, Languages} from './db/schemas'
import challengeResolver from './gql/challenges/resolvers'

//connect to mongoDB
connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to mongoose"))

//typedefs for graphQL
const Query = gql`
    type Query {
        findAllChallenges: [challenges],
        Profiles: [profiles],
        Posts: [posts],
        Submissions: [submissions],
        Trophies: [trophies],
        Languages: [languages]
    }
`
const challengeTypeDef = gql(readFileSync(__dirname.concat('/gql/challenges/challenges.gql'), 'utf8'))
const profilesTypeDef = gql(readFileSync(__dirname.concat('/gql/profiles/profiles.gql'), 'utf8'))
const submissionsDef = gql(readFileSync(__dirname.concat('/gql/submissions/submissions.gql'), 'utf8'))
const postsDef = gql(readFileSync(__dirname.concat('/gql/posts/posts.gql'), 'utf8'))
const trophiesDef = gql(readFileSync(__dirname.concat('/gql/trophies/trophies.gql'), 'utf8'))
const languagesDef = gql(readFileSync(__dirname.concat('/gql/languages/languages.gql'), 'utf8'))

//static resolvers for now...
const resolvers = { Query: {
    Profiles () {
        return Profiles.find({}).then(data => data)
    },
    Posts () {
        return Posts.find({}).then(data => data)
    },
    Submissions () {
        return Submissions.find({}).then(data => data)
    },
    Trophies () {
        return Trophies.find({}).then(data => data)
    },
    Languages () {
        return Languages.find({}).then(data => data)
    }
}};

const app = express()

const server = new ApolloServer({ 
    typeDefs: [Query, challengeTypeDef, submissionsDef, profilesTypeDef, postsDef, trophiesDef, languagesDef], 
    resolvers: merge(challengeResolver, resolvers) });
server.applyMiddleware({app})
app.listen(5000, () => console.log("listening..."))