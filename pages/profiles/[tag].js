import axios from 'axios'
import {getSession} from 'next-auth/client'

export default function profileView(props) {
    if (!props.valid) {
        return (
            <text>Not found</text>
        )
    } else {
        return (
            <text>Profile page</text>
        )
    }
}

export async function getServerSideProps(context) {
    let s = await getSession(context)
    let isUser = await axios.post(`${process.env.SECRET}/api/isUser`, {tag: context.query.tag})
    .then(response => response.data)
    .catch(error => error)
    return {
        props: {
            title: isUser ? `${context.query.tag} profile` : "Not found",
            valid: isUser,
            session: s
        }
    }
}