import styles from '../styles/submission-preview.module.css'

const code = `def binarySearch(elem, intArr):
    m, l, h = 0, 0, len(intArr) - 1
    while l <= h:
        m = (l + h) // 2
        if elem == intArr[m]: return m
        if elem > intArr[m]:
            l = m + 1
        elif elem < intArr[m]:
            h = m - 1
        else:
            return None
    print(binarySearch(13, (1,3,4,5,13,20,25,40,42,44,53)))`

export default function submission(props) {
    return (
        <div className={styles.container} onClick={() => props.func(1, props.ckey)}>
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