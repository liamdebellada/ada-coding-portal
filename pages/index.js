import {getSession, session} from 'next-auth/client'
import styles from '../styles/index.module.css'


const challenges = [{title : "Do something", lang: "c"}, {title: "Maybe another thing", lang: "any"}]
const users = [{name: 'David Jones', votes: 3, views: 100, creationDate: '10/12/20'}, {name: 'Liam Debell', votes: 3, views: 100, creationDate: '29/02/18'}, {name: 'Liam Debell', votes: 3, views: 100, creationDate: '29/02/18'},{name: 'David Jones', votes: 3, views: 100, creationDate: '10/12/20'}]

function Home(props) {
  if (props.session) {
  return (
       <div className={"container"}>
         <div>
            <text className="welcome-text">Welcome {props.session.name.split(" ")[0]}</text>
            <div className={styles['content-container']}>
              <div className={styles['challenge-container']}>
                <div className={styles['challenge-title-container']}>
                  <img className={styles['challenge-icon']} src="/challenge-icon.svg"/>
                  <text className={styles['challenge-container-title']}>Challenges</text>
                </div>
                {challenges.map((challenge) => (
                  <div className={styles['challenge']}>
                    <img src={`/icons/${challenge.lang}.svg`} className={styles['languages']}/>
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
                {users.map((user) => (
                  <div className={styles.user}>
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
  return {
    props: {
      title : "Ada Coding Home",
      session: s
    }
  }
}

export default Home
