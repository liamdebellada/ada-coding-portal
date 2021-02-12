import styles from '../styles/landing.module.css'
import OrbitAda from './orbit-logo'
export default function index(props) {
    return (
        <div className={styles.container}>
            <div className={styles.firstContainer}>
                <div className={`${styles.childContainer} ${styles.logoContainer}`}>
                    <OrbitAda/>
                </div>
                <div className={`${styles.childContainer} ${styles.contentContainer}`}>
                    <div className={styles.topContent}>
                        <div className={styles.titleContainer}>
                            <text className={styles.titleText}>nucleus</text>
                            <text className={styles.titleText}>a place for all</text>
                        </div>
                        <div className={styles.dotContainer}>
                            <div className={styles.smallDot}/>
                            <div className={styles.smallDot}/>
                            <div className={styles.smallDot}/>
                            <div className={styles.smallDot}/>
                        </div>
                    </div>
                    <div className={styles.bottomContent}>
                        <div className={styles.signInButton}>
                            <img className={styles.smallGoogle} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png"/>
                            <text className={styles.signInText}>sign in</text>
                        </div>
                        <div className={styles.questionButton}>
                            <text className={styles.questionText}>?</text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}