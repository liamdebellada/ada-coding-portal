import styles from '../styles/submission-preview.module.css'

const code = `print("hello")
def main():
    print("hi")
    return 'done'
main()`

export default function submission() {
    return (
        <div className={styles.container}>
            <div className={styles.codeContainer}>
                <div className={styles.scroll}>
                    <pre className={styles.codePreserve}>
                        {code.split("\n").map((l, k) => (
                            <code key={k}>{l}</code>
                        ))}
                    </pre>
                </div>
            </div>
            <div className={styles.userInfoContainer}>
                <img src="/profile.svg" className={styles.profilePic}/>
                <text>Eitan Abelman</text>
                <img src="/icons/git.svg" className={styles.languageIcon}/>
                <div className={styles.heartContainer}>
                    <span className="material-icons">favorite_border</span>
                </div>
            </div>
        </div>
    )
}