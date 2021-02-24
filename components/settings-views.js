import styles from '../styles/settings.module.css'

function ProfileTab(props) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.profileBasic}>
                <img className={styles.pictureContainer} src={props.session.picture}/>
                <text className={styles.userName}>{props.session.name}</text>
            </div>
            <div className={styles.lineSep}>
                <text className={styles.lineLabel}>Your Profile</text>
            </div>
        </div>
    )
}

function NotificationsTab() {
    return (
        <text>Notifications</text>
    )
}

function ContentTab() {
    return (
        <text>COntent</text>
    )
}

function HelpTab() {
    return (
        <text>help</text>
    )
}

export { ProfileTab, NotificationsTab, ContentTab, HelpTab }