//Packages
import { useEffect, useState } from "react";
import { gql } from 'graphql-request'

//Styling
import styles from '../styles/index.module.css'

function TeacherName(props) {

    const [teacherName, setTeacherName] = useState([]);

    const getChallengeInfo = gql`
      query getTeacher($id: String!){
        findProfileByID(id: $id) {
          account{
            name
          }
        }
      }
    `

    useEffect(() => {
        props.client.request(getChallengeInfo, { id: props.id })
            .then((data) => setTeacherName(Object.values(data.findProfileByID.account.name)));
    }, []);


    return (
        <div>
            {teacherName}
        </div>
    )

}

export default function challenge(props) {

    return (
        <div key={props.k} onClick={() => props.paginate(1, props.k, challengeInfo[0])} ckey={props.k}
            func={props.paginate} className={`${styles.iChallenge} ${styles.myChallenge}`}>

            <div className={styles.cardHeader}>
                <img className={styles.languageIcon} src="/icons/swift.svg" />
                <div className={`${styles.dateContainer} ${styles.colouredDate}`}>
                    <span className="material-icons">date_range</span>
                    <text>{props.formattedTime}</text>
                </div>
            </div>
            <div className={styles.cardBody}>
                <text className={styles.challengeTitle}>{props.data.title}</text>
                <div className={styles.publisher}>
                    <span className="material-icons">history_edu</span>
                    <TeacherName client={props.client} id={props.data.teacher} />
                </div>
                <div className={styles.horizontalProfileContainer}>
                    <img className={styles.iProfilePic} src="/profile.svg" />
                    <img className={styles.iProfilePic} src="/profile.svg" />
                </div>
            </div>
        </div>
    )
}