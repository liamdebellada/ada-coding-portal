import { getSession } from 'next-auth/client' 
import styles from '../../styles/challenges.module.css'

function Challenges(props) {
    return (
        <div className={'container'}>
            <text className={'welcome-text'}>Home Of All Challenges</text>
            <div className={styles['flex-container']}>
              <div className={styles.col}>
                  <div className={styles['card-container']}>
                    <div className={styles['card-header']}>
                      <div className={`${['d-flex']} ${['align-items-center']} ${['flex-d-col']}`}>
                        <div className={styles['card-images']}>
                          <img className={styles['card-header-image']} src="/icons/python.svg" />
                        </div>
                        <text className={styles['card-title']}>Create your own encryption algorithm</text>
                      </div>
                    </div>
                    <div className={styles['card-body']}>
                      <div className={styles['card-body-item']}>
                        <text className={styles['card-body-title']}>Submissions</text>
                        <text>N</text>
                      </div>
                      <div className={styles['card-body-item']}>
                        <text className={styles['card-body-title']} >Difficulty</text>
                        <div className={styles['card-body-difficulty']}>
                          <div className={`${styles['block']} ${styles['hard']}`}></div>
                          <div className={`${styles['block']} ${styles['hard']}`}></div>
                          <div className={`${styles['block']} ${styles['hard']}`}></div>
                        </div>
                      </div>
                      <div className={styles['card-body-item']}>
                        <text className={styles['card-body-title']}>Time Left</text>
                        <text>N</text>
                      </div>
                    </div>
                    <div className={styles['card-footer']}>
                      <text>Show off your skills by creating an encryption algorithm with the ability to encrypt and decrypt text. Click on the link below to learn more!</text>
                      <button className={styles['card-footer-button']}>View Challenge</button>
                    </div>
                  </div>
              </div>
              <div className={styles.col}>
                  <div className={styles['card-container']}>
                    hello
                  </div>
              </div>
              <div className={styles.col}>
                  <div className={styles['card-container']}>
                    hello
                  </div>
              </div>
              <div className={styles.col}>
                  <div className={styles['card-container']}>
                    hello
                  </div>
              </div>
            </div>
            
        </div>
        
    )
}


export async function getServerSideProps(context) {
  var s = await getSession(context)
  return {
    props: {
      title : "Ada Coding Challenges",
      session: s
    }
  }
}

export default Challenges