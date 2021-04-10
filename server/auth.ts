import { AuthenticationError } from 'apollo-server-express';
import { Iprofiles, Profiles } from './db/schemas'
import { createFolder } from '../utils/filemanager'
import axios from 'axios';

const USERSPACE_DIR = '/home/liamdebell/Projects/updated/ada-coding-portal/userspace';

export default function(req: any) {
    let auth = req.get('authorization')
    if (auth) {
        let gt = auth.split(" ")[1]
        return axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${gt}`)
        .then(result => {
            return Profiles.findOne({"account.id" : result.data.id})
            .then((data: Iprofiles | null) => {
                if (data) {
                    if(data.admin == true){
                        return {
                            user: data,
                            admin: true
                        }
                    } else{
                        return {
                            user: data,
                            admin: false
                        }
                    }
                } else{
                    throw new AuthenticationError('Data not received');
                }
            })
            .catch(() => {
                Profiles.create({
                    account: result.data,
                    url: result.data.name.replace(" ", "_"),
                    admin: false,
                    settings: [],
                    userSpaceDirectory: `${USERSPACE_DIR}/${result.data.name.replace(" ", "_")}`,
                    challenges: []
                }).then((data) => {
                    createFolder(USERSPACE_DIR, result.data.name.replace(" ", "_"))
                    return {
                        user: data,
                        admin: false
                    }
                }).catch(() => {
                    throw new AuthenticationError("Cannot create user!");
                })

            })

        }).catch(() => {
            //no user info or invalid token.
            throw new AuthenticationError('Request failed.')
        })
    } else {
        throw new AuthenticationError('Missing auth token.')
    }
}