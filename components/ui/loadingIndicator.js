import styles from '../../styles/loadingIndicator.module.css'

export default function LoadingIndicator() {
    return (
        <div className={styles.loading}>
            {[1,2,3,4].map(({index}) => {
                return (
                    <div style={{animationDelay: index == 0 ? `0s` : `${Math.random().toFixed(1)}s`}} className={styles.bar}/>
                )
            })}
        </div>
    )
}