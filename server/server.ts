import express from 'express';
import { connect } from 'mongoose'
import {readFileSync, readdirSync } from 'fs'
import {ApolloServer, gql} from 'apollo-server-express'
import {merge} from 'lodash'
import authHandler from './auth';
import { Server, Socket } from "socket.io";
import authSocket from './sockets/auth'

//schema imports
const allResolvers : {[key: string]: any} = {};

require("fs").readdirSync(require("path").join(__dirname, "/gql"))
    .forEach(function(file: string) {
  allResolvers[file] = require("./gql/" + file + "/resolvers.ts").default;
});

//connect to mongoDB
connect('mongodb://localhost:27017/nucleus', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to mongoose"))

//typedefs for graphQL
const Query = gql`
    type Query {
        findAllChallenges: [challenges],
        findChallengeByID(id: String): challenges,
        findProfileByGoogleID(id: String): profiles,
        findAllProfiles: [profiles],
        findProfileByID(id: String): profiles,
        teacher(id: String): profiles,
        findAllPosts: [posts],
        findAllSubmissions: [submissions],
        findAllTrophies: [trophies],
        findAllLanguages: [languages],
        findPopularChallenges: [popularChallenges],
        findChallengesByLanguage(id: String): [challenges],
        findSubmissionsForUser: [submissions],
        findTrophyByID(id: String): trophies,
        findLanguageByID(id: String): languages,
    },
    type Mutation {
        joinChallenge(challenge: String): String,
        updateChallenge(challengeObject: String): String,
        updateBadge(badgeObject: String): String,
        updateLanguage(languageObject: String): String,
        createChallenge(challengeObject: String): challenges
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
const http = app.listen(5000, () => console.log("listening..."))

const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

interface userExtention extends Socket {
    request: Socket["request"] & {user: any, sshInfo: any}
}

io.on("connection", (socket: userExtention) => {
    require('./sockets/listener')(socket)
})

io.use((socket: Socket, next) => {
    if (socket.handshake.headers.authorization) {
        let token: string = socket.handshake.headers.authorization.split(" ")[1]
        authSocket(token, next).then((data) => { //called after auth is ran. Data can be our user or undefined.
            if (data) {
                (socket as any).request.user = data;
                next()
            }
        })
    } else {
        next(new Error("Authorisation missing."))
    }
})