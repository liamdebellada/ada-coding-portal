import styles from '../styles/navbar.module.css'
import {signIn, signOut} from 'next-auth/client'

function navbar(props) {
    if (!props.session) {
        return (
            <div className={`${styles.nav} ${styles.sticky}`}>
                <a onClick={() => router.push('/')}>
                    <div className={`${styles['d-flex']} ${styles['align-items-center']}`}>
                        <img width="25px"src='/icons/ada-logo.svg' className={styles['mr-0-5']}/><text> | Coding Portal</text>
                    </div>
                </a>
                <div className={`${styles['ml-auto']} ${styles.spacedOutOptions}`}>
                    <a className={styles.links}>Showcase</a>
                    <a className={styles.links} onClick={() => signIn('google')}>Sign In</a>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${styles.nav} ${styles.fixed}`}>
                <a href="/">
                    <div className={`${styles['d-flex']} ${styles['c-pointer']} ${styles['align-items-center']}`}>
                        <img width="25px"src='/icons/ada-logo.svg' className={styles['mr-0-5']}/><text> | Coding Portal</text>
                    </div>
                </a>
                <div className={styles['ml-auto']}>
                    <div className={`${styles['d-flex']} ${styles['align-items-center']}`}>
                        
                        <a className={`${styles['mr-1']} ${styles['hide-showcase']} ${styles.links}`}>Showcase</a>
                        

                        <div className={styles.dropdown}>
                            <div className={`${styles['d-flex']} ${styles['align-items-center']}`}>
                                <text className={styles['mr-1']}>{props.session.name}</text>
                                <img className={styles.image}src={props.session.picture}></img>
                            </div>
                        
                            <div className={styles['dropdown-content']}>


                                <div className={styles['dropdown-items']}>
                                    <a className={styles.links}>Profile</a>
                                    <a className={`${styles.links} ${styles['dropdown-showcase']}`}>Showcase</a>
                                    <a className={styles.links}  onClick={() => signOut('google')}>Sign Out</a>
                                </div>
                                

                            </div>
                        </div>
                        
                    
                    </div>
                </div>
            </div>
        )
    }
}
 

export default navbar