import styles from '../styles/orbit.module.css'
export default function orbitLogo(props) {
    return (
        <div className={styles.outerRing}>
            <div className={styles.innerRing}/>
            <img src="/adaText.svg" className={styles.adaLogo}/>
            <div className={`${styles.dot} ${styles['dot-2']} ${styles['dot-outer']}`}></div>
            <div className={`${styles.dot} ${styles['dot-3']} ${styles['dot-outer']}`}></div>
            <div className={`${styles.dot} ${styles['dot-1']}`}></div>
            <div className={`${styles.dot} ${styles['dot-4']}`}></div>
        </div>
    )
}