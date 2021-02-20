import styles from '../styles/index.module.css'
import Submission from '../components/submission-preview'
export default function authIndex(props) {
    return (
      <div className={styles.mainContent}>
          <div className={styles.leftContent}>
            <div className={styles.leftHeaderContainer}>
              <div className={styles.leftHeaderItem}>
                Recent
              </div>
              <div className={styles.leftHeaderItem}>
                Last Month
              </div>
              <div className={styles.leftHeaderItem}>
                Language
              </div>
            </div>
            <div className={styles.codePreviews}>
              <Submission/>
              <Submission/>
            </div>
          </div>
          <div className={styles.rightContent}>
            col 2
          </div>
      </div>
    )
}