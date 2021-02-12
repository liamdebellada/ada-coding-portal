import styles from '../styles/orbit.module.css'
export default function orbitLogo() {
    return (
        <div className={styles.outerRing}>
            <div className={styles.innerRing}>
                <img className={styles.adaLogo} src="/adaText.svg"/>
            </div>
        </div>
    )
}