import styles from '../styles/navbar.module.css'

import {signIn, signOut} from 'next-auth/client'

function navbar(props) {
    if (!props.session) {
        return (
            <div className={`${styles.nav} ${styles.sticky}`}>
                <div>
                    <text>Ada | Coding Portal</text>
                </div>
                <div className={styles['ml-auto']}>
                    <button onClick={() => signIn('google')}>Sign In</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${styles.nav} ${styles.sticky}`}>
                <div>
                    <text>Ada | Coding Portal</text>
                </div>
                <div className={styles['ml-auto']}>
                    <button onClick={() => signOut('google')}>Sign Out</button>
                </div>
            </div>
        )
    }
}

export default navbar