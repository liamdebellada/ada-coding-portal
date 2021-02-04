import { getSession } from 'next-auth/client' 
import styles from '../../styles/challenges.module.css'

function Challenges(props) {
    return (
        <div className={'container'}>
            <text className={'welcome-text'}>Home Of All Challenges</text>
            <div className={styles['flex-container']}>
              <div className={styles['col']}>
                  hello
              </div>
              <div className={styles['col']}>
                  hello
              </div>
              <div className={styles['col']}>
                  hello
              </div>
              <div className={styles['col']}>
                  hello
              </div>
            </div>
            
        </div>
        
    )
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

export default Challenges