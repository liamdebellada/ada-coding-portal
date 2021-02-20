import styles from '../styles/navbar.module.css'
import {signIn, signOut} from 'next-auth/client'
import Router from 'next/router'

function navbar(props) {
    if (props.session) {
    return (
        <div className={`${styles.nav} ${styles.sticky}`}>
            <div className={styles.leftNav}>
                <img className={styles.adaLogo} src="/adaText.svg"/>
            </div>
            <div className={styles.middleNav}>
                <div className={styles.middleOptions}>
                    <div className={`${styles.middleOption} ${styles.selectedOption}`} onClick={() => Router.push('/')}>Home</div>
                    <div className={styles.middleOption}>Submissions</div>
                    <div className={styles.middleOption}>Help</div>
                </div>
            </div>
            <div className={styles.rightNav}>
                <div className={`${styles.rightNavContainer}`}>
                    <img className={styles.navProfilePic} src={props.session.picture}/>
                    <text className={styles.navUserNameText}>{props.session.name}</text>
                </div>
            </div>
        </div>
    )
    } else {
        return (
            <div></div>
        )
    }
}

export default navbar