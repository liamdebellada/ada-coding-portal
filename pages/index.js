import {getSession, session} from 'next-auth/client'
import styles from '../styles/index.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Router from 'next/router'

const users = [{name: 'David Jones', votes: 3, views: 100, creationDate: '10/12/20'}, {name: 'Liam Debell', votes: 3, views: 100, creationDate: '29/02/18'}, {name: 'Liam Debell', votes: 3, views: 100, creationDate: '29/02/18'},{name: 'David Jones', votes: 3, views: 100, creationDate: '10/12/20'}]
function Home(props) {
  if (props.session) {    
    const socket = io.connect('http://fbbsvr.ddns.net:5192', { transports: ['websocket', 'polling', 'flashsocket'] })
    const [votes, setVotes] = useState("0")

    useEffect(() => {
      socket.on('data', (data) => {
        setVotes(data["test"])
      })
    }, [])

  return (
       <div className={"container"}>
            <text className="welcome-text">Welcome {props.session.name.split(" ")[0]}</text>
         <div className={`${styles.cr}`}>
           <div className={`${styles.half} ${styles.firstColumn}`}> 
            <div className={styles['content-container']}>
              <div className={styles['challenge-container']}>
                <div className={styles['challenge-title-container']}>
                  <img className={styles['challenge-icon']} src="/challenge-icon.svg"/>
                  <text className={styles['challenge-container-title']}>Challenges</text>
                </div>
                {props.challenges.map((challenge, i) => (
                  <div key={i} className={styles['challenge']} onClick={() => Router.push(`/challenges/${challenge._id}`)}>
                    <img src={challenge.icon} className={styles['languages']}/>
                    <text className={styles['challenge-title']}>{challenge.title}</text>
                    <img src="/click-icon.svg" className={styles['click-icon']}/>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['content-container']}>
              <div className={styles['challenge-container']}>
                <div className={styles['challenge-title-container']}>
                  <img className={styles['challenge-icon']} src="/like.svg"/>
                  <text className={styles['challenge-container-title']}>Best Submissions</text>
                </div>
              </div>
              <div className={styles.users}>
                {users.map((user, i) => (
                  <div key={i} className={styles.user}>
                    <text className={styles.date}>{user.creationDate}</text>
                    <text className="bold">{user.name}</text>
                    <div className={styles['user-info']}>
                      <img src="/view.svg" className={styles['Icon']}/>
                      <text className={styles['St']}>{user.views}</text>
                      <img src="/vote.svg" className={styles['Icon']}/>
                      <text>{user.votes}</text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['content-container']}>
              <div className={styles['challenge-container']}>
                <div className={styles['challenge-title-container']}>
                  <img className={styles['challenge-icon']} src="/time.svg"/>
                  <text className={styles['challenge-container-title']}>Upcoming</text>
                </div>
                <text>There are currenly no upcoming challenges.</text>
              </div>
            </div>
          </div>
          <div className={`${styles.half} ${styles.rightHalf}`}>
            <div className={`${styles['content-container']} ${styles.profileContainer}`}>
                <div className={styles['challenge-title-container']}>
                  <img className={styles['challenge-icon']} src="/user.svg"/>
                  <text className={styles['challenge-container-title']}>Your Profile</text>
                  <img src="/edit.svg" className={styles.editIcon}/>
                </div>
                <div className={styles.profileContent}>
                  <img src={props.session.picture} className={styles.homeProfilePicture}/>
                  <div className={styles.nameContainer}>
                    <text className={styles.profileName}>{props.session.name}</text>
                    <text className={styles.profileTag}>{`@${props.session.name.replace(" ", "_")}`}</text>
                  </div>
                </div>
                <div className={styles.userInfo}>
                  <text className={styles.rankTitle}>Rank</text>
                  <div className={"progressBar"}>
                    <div style={{height: '100%', width: `${parseInt(votes.toString()[2]) * 10}%`, backgroundColor: '#a378ce', transition: 'width 0.5s'}}></div>
                  </div>
                  <div className={styles.skillContainer}>
                    <text className={styles.skillTitle}>Submissions</text>
                  </div>
                </div>
            </div>
          </div>
         </div>
       </div>
  )
  } else {
    return (
      <text>not logged in</text>
    )
  }
}

export async function getServerSideProps(context) {
  var s = await getSession(context)
  let challenges = await axios.get('http://fbbsvr.ddns.net:5192/api/challenges').then(response => response.data).catch(error => error)
  return {
    props: {
      title : "Ada Nucleas",
      session: s,
      challenges: !challenges.code ? challenges : []
    }
  }
}

export default Home
