//Styling
import styles from '../styles/index.module.css'

export default function challenge(props) {

    var date = new Date(parseInt(props.data.due)).toLocaleDateString().toString();

    return (
        <div onClick={() => props.paginate(1, props.index, props.data)} ckey={props.index}
            func={props.paginate} className={`${styles.iChallenge} ${styles.myChallenge}`}>

            <div className={styles.cardHeader}>
                <img className={styles.languageIcon} src="/icons/swift.svg" />
                <div className={`${styles.dateContainer} ${styles.colouredDate}`}>
                    <span className="material-icons">date_range</span>
                    <text>{date}</text>
                </div>
            </div>
            <div className={styles.cardBody}>
                <text className={styles.challengeTitle}>{props.data.title}</text>
                <div className={styles.publisher}>
                    <span className="material-icons">history_edu</span>
                    {props.data.teacher[0].account.name}
                </div>
                <div className={styles.horizontalProfileContainer}>
                    <img className={styles.iProfilePic} src="/profile.svg" />
                    <img className={styles.iProfilePic} src="/profile.svg" />
                </div>
            </div>
        </div>
    )
}