import express from 'express';
import { connect } from 'mongoose'
import {readFileSync, readdirSync } from 'fs'
import {ApolloServer, gql} from 'apollo-server-express'
import {merge} from 'lodash'
import authHandler from './auth';

//schema imports
const allResolvers : {[key: string]: any} = {};

require("fs").readdirSync(require("path").join(__dirname, "/gql"))
    .forEach(function(file: string) {
  allResolvers[file] = require("./gql/" + file + "/resolvers.ts").default;
});

//connect to mongoDB
connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to mongoose"))

//typedefs for graphQL
const Query = gql`
    type Query {
        findAllChallenges: [challenges],
        findAllProfiles: [profiles],
        findAllPosts: [posts],
        findAllSubmissions: [submissions],
        findAllTrophies: [trophies],
        findAllLanguages: [languages]
    }
`
const challengeTypeDef = gql(readFileSync(__dirname.concat('/gql/challenges/challenges.gql'), 'utf8'))
const profilesTypeDef = gql(readFileSync(__dirname.concat('/gql/profiles/profiles.gql'), 'utf8'))
const submissionsDef = gql(readFileSync(__dirname.concat('/gql/submissions/submissions.gql'), 'utf8'))
const postsDef = gql(readFileSync(__dirname.concat('/gql/posts/posts.gql'), 'utf8'))
const trophiesDef = gql(readFileSync(__dirname.concat('/gql/trophies/trophies.gql'), 'utf8'))
const languagesDef = gql(readFileSync(__dirname.concat('/gql/languages/languages.gql'), 'utf8'))

//static resolvers for now...

const app = express()

const server = new ApolloServer({ 
    typeDefs: [Query, challengeTypeDef, submissionsDef, profilesTypeDef, postsDef, trophiesDef, languagesDef], 
    resolvers: merge(allResolvers.challenges, allResolvers.profiles, allResolvers.posts,
         allResolvers.submissions, allResolvers.trophies, allResolvers.languages),
    context: ({req}) => {
        return authHandler(req)
    }
});
    
server.applyMiddleware({app})
app.listen(5000, () => console.log("listening..."))