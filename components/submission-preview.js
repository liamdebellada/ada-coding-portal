import styles from '../styles/submission-preview.module.css'

const code = `line1
line2
line3
line3
line3
line3
line3
line3
line3
line3
line3
line3
line3
line3
line3
line3
line3
line3
line3`

export default function submission() {
    return (
        <div className={styles.container}>
            <div className={styles.codeContainer}>
                <div className={styles.scroll}>
                    <pre className={styles.codePreserve}>
                        {code.split("\n").map(l => (
                            <code>{l}</code>
                        ))}
                    </pre>
                </div>
            </div>
            <div className={styles.userInfoContainer}>
                <img src="/profile.svg" className={styles.profilePic}/>
                <text>Eitan Abelman</text>
                <img src="/icons/c.svg" className={styles.languageIcon}/>
                <div className={styles.heartContainer}>
                    <img src="/like.svg" className={styles.heartIcon}/>
                </div>
            </div>
        </div>
    )
}