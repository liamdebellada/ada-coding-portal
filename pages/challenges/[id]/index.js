import {getSession, session} from 'next-auth/client'
import styles from '../../../styles/challenge.id.module.css'
import axios from 'axios'
import io from 'socket.io-client'
import {useEffect, useState, useReducer} from 'react'


export default function Challenge(props) {
    const socket = io.connect(`${process.env.HOST}`, { transports: ['websocket', 'polling', 'flashsocket'] })
    const [submissions, setSubmissions] = useState(props.data.submissions)

    useEffect(() => {
        socket.on('submissionChange', (data) => {
            if (data.id == props.id) {
                setSubmissions(submissions => submissions + data.data)
            }
        })
    }, [])

    return (
        <div className="container">
            <div className={styles['challenge-container']}>
                <div className={styles['challenge-header']}>
                    <text className={styles['challenge-title']}>{props.data.challenge.title}</text>
                    <div className={styles['challenge-languages']}>
                        <text className={styles['challenges-languages-header']}>Supported Languages:</text>
                        <div>
                            <img className={styles['challenge-languages-icon']} src="/icons/python.svg" />
                            <img className={styles['challenge-languages-icon']} src="/icons/php.svg" />
                            <img className={styles['challenge-languages-icon']} src="/icons/cpp.svg" />
                        </div>
                    </div>
                </div>
                <div className={styles['challenge-body']}>
                    <text>Current Submissions: {submissions}</text>
                    <div className={styles['challenge-description']}>
                        <text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum arcu vel laoreet pulvinar. Aliquam sollicitudin nulla odio. Ut lacinia vestibulum euismod. Curabitur malesuada sem massa, at semper erat mattis eget. Aliquam erat volutpat. Sed venenatis blandit varius. Maecenas sit amet volutpat justo. Pellentesque ipsum ex, aliquet vitae mi et, vehicula mollis dolor.
Aliquam dictum, enim vel tincidunt laoreet, sem nisi molestie sapien, ut tincidunt lorem augue eu ante. Sed pulvinar magna vel odio aliquam pellentesque. Curabitur nec purus eget urna porttitor maximus. Integer tellus libero, auctor nec pharetra et, rutrum a massa. Pellentesque lobortis augue eget dictum venenatis. Sed tempus massa condimentum eros consequat maximus. Etiam quis magna nec nunc sodales malesuada quis in diam. Suspendisse vulputate blandit purus non gravida.
Proin et lorem sed lorem elementum sagittis. Curabitur vel arcu mattis, placerat justo tempor, porttitor neque. Proin congue justo nec mauris molestie rutrum. Duis at sagittis ex, eget fringilla est. Cras interdum felis nec diam elementum, vitae accumsan nisi commodo. Suspendisse in dictum velit, vel sollicitudin ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in dapibus sapien.
                        </text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    var s = await getSession(context)
    var challengeData = await axios.get(`${process.env.HOST}/api/getChallenges/${context.query.id}`)
    if (challengeData.code || !challengeData.data.challenge._id) {
        context.res.writeHead(302, {location: '/'})
        context.res.end()
    }
    return {
        props: {
            id: context.query.id,
            session: s,
            title: "Create your own encryption algorithm",
            data: challengeData.data
        }
    }
    
}
