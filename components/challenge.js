import styles from '../styles/challenges.module.css'
import ReactMarkdown from 'react-markdown';
import Router from 'next/router'

export default function challenge(props) {
const md = 
`# Test challenge
####  Create a cool project to test out nucleus!

normal paragraph content
~~~js
console.log('It works!')
~~~
`
    return (
        <div className={styles.container}>
            <div className={styles.challengeHeader}>
                <div className={styles.headerInfo}>
                    <div className={styles.publisher}>
                        <span className="material-icons">history_edu</span>
                        {props.data.teacher[0].account.name}
                    </div>
                    <div className={styles.profileIconList}>
                        <img className={styles.profileIconTop} src="profile.svg"/>
                        <img className={styles.profileIconTop} src="profile.svg"/>
                        <img className={styles.profileIconTop} src="profile.svg"/>
                    </div>
                </div>
                
                <div className={styles.headerInfo}>
                    <div onClick={() => Router.push('/challenges/1/submissions/1')} className={`${styles.publisher} ${styles.whiteBtn}`}>
                        <span className="material-icons">work</span>
                        Your work
                    </div>
                </div>
            </div>
            <div className={styles.challengeBody}>
                <div className={styles.challengeSub}>
                    <ReactMarkdown children={md}/>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={`${styles.dateContainer} ${styles.colouredDate}`}>
                    <span className="material-icons">date_range</span>
                    <text>10/11/22</text>
                </div>

                <div className={styles.leaveButton}>
                    <span className="material-icons">logout</span>
                    <text>Leave Challenge</text>
                </div>
            </div>
        </div>
    )
}