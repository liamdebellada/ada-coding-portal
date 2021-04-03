import axios from 'axios';
import {Profiles, Iprofiles} from '../db/schemas'

export default function(token: string, next: any) {
    return axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`).then(userInfo => {
        return Profiles.findOne({"account.id" : userInfo.data.id})
        .then((data: Iprofiles | null) => {
            if (data) {
                return data;
            } else {
                next(new Error('Not authorised.'))
            }
        })
    }).catch(() => {
        next(new Error('Not authorised.'))
    })
}