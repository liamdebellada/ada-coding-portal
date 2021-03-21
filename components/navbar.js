import styles from '../styles/navbar.module.css'
import Router from 'next/router'

function navbar(props) {
    if (props.globalProps.session) {
    return (
        <div className={`${styles.nav} ${styles.sticky}`}>
            <div className={styles.leftNav}>
                <img className={styles.adaLogo} src="/adaText.svg"/>
            </div>
            <div className={styles.middleNav}>
                <div className={styles.middleOptions}>
                    <div className={`${styles.middleOption} ${styles.selectedOption} noselect`} onClick={() => Router.push('/')}>
                        <span className="material-icons">home</span>
                        Home
                    </div>
                    <div className={`${styles.middleOption} noselect`} onClick={() => Router.push('/submission')}>
                        <span className="material-icons">school</span>
                        Submissions
                    </div>
                    <div className={`${styles.middleOption} noselect`}>
                        <span className="material-icons">help_outline</span>
                        Help
                    </div>
                </div>
            </div>
            <div className={styles.rightNav}>
                <div className={`${styles.rightNavContainer}`}>
                    <img className={styles.navProfilePic} src={props.globalProps.session.picture}/>
                    <text className={styles.navUserNameText}>{props.globalProps.session.name}</text>
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