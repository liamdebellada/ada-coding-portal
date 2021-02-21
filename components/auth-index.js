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
              {[1,2].map((c,k) => (
              <div key={k} className={`${styles.iChallenge} ${styles.myChallenge}`}>
                <div className={styles.cardHeader}>
                  <img className={styles.languageIcon} src="/icons/swift.svg"/>
                  <div className={`${styles.dateContainer} ${styles.colouredDate}`}>
                      <span className="material-icons">date_range</span>
                      <text>10/11/22</text>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <text className={styles.challengeTitle}>Unit 4 - Test content longer and longer</text>
                  <div className={styles.publisher}>
                    <span className="material-icons">history_edu</span>
                    Steve Rich
                  </div>
                  <div className={styles.horizontalProfileContainer}>
                    <img className={styles.iProfilePic} src="/profile.svg"/>
                    <img className={styles.iProfilePic} src="/profile.svg"/>
                  </div>
                </div>
              </div>
              ))}
            </div>

            <div className={styles.rightHeader}>
              <text className={styles.rightHeaderText}>Upcoming</text>
            </div>
            <div className={styles.challenges}>
              <div className={`${styles.iChallenge} ${styles.upcomingChallenge}`}>
                <div className={styles.cardHeader}>
                  <img className={styles.languageIcon} src="/icons/swift.svg"/>
                  <div className={`${styles.dateContainer} ${styles.colouredDate}`} style={{background: 'transparent'}}>
                      <span className="material-icons">date_range</span>
                      <text>10/11/22</text>
                  </div>
                </div>
                <div className={`${styles.cardBody}`} style={{gap: '0.7rem'}}>
                  <text className={styles.upcomingTitle}>Google Api Implementation</text>
                  <div className={styles.upcomingWidgets}>
                    <div className={styles.publisher}>
                      <span className="material-icons">history_edu</span>
                      Steve Rich
                    </div>
                    <button className={`${styles.addWidget} material-icons`}>add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
}