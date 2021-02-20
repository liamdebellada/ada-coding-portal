import styles from '../styles/index.module.css'
import Submission from '../components/submission-preview'
export default function authIndex(props) {
    return (
      <div className={styles.mainContent}>
          <div className={styles.leftContent}>
            <div className={styles.leftHeaderContainer}>
              <div className={styles.leftHeaderItem}>
              <span className="material-icons">new_releases</span>
                Recent
              </div>
              <div className={styles.leftHeaderItem}>
              <span className="material-icons">date_range</span>
                Last Month
              </div>
              <div className={styles.leftHeaderItem}>
              <span className="material-icons">code_off</span>
                Language
              </div>
            </div>
            <div className={styles.codePreviews}>
              <Submission/>
              <Submission/>
              <Submission/>
            </div>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.rightHeader}>
              <text className={styles.rightHeaderText}>My Challenges</text>
              <button className={styles.rightHeaderButton}><span className="material-icons">add</span> Join Challenge</button>
            </div>
            <div className={styles.challenges}>
              <div className={`${styles.iChallenge} ${styles.myChallenge}`}>
              </div>
              <div className={`${styles.iChallenge} ${styles.myChallenge}`}>
              </div>
              {/* <div className={styles.iChallenge}>
              </div> */}
            </div>

            <div className={styles.rightHeader}>
              <text className={styles.rightHeaderText}>Upcoming</text>
            </div>
            <div className={styles.challenges}>
              <div className={`${styles.iChallenge} ${styles.upcomingChallenge}`}>

              </div>
            </div>
          </div>
      </div>
    )
}