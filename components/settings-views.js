import styles from '../styles/settings.module.css'
import LangTag from '../components/language-tag'

function ProfileTab(props) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.profileBasic}>
                <img className={styles.pictureContainer} src={props.session.picture}/>
                <text className={styles.userName}>{props.session.name}</text>
                <div className={styles.tagContainer}>
                    <LangTag langName="python"/>
                    <LangTag langName="C"/>
                    <LangTag langName="C"/>
                    <LangTag langName="C"/>
                    <LangTag langName="C"/>
                    <LangTag langName="C"/>
                </div>
            </div>
            <div className={styles.lineSep}>
                <text className={styles.lineLabel}>Your Profile</text>
            </div>
            <div className={styles.settingsArea}>
                <text className={styles.labelText}>Biography</text>
                <textarea placeholder="Type your bio here!" className={styles.bioArea}></textarea>
                <text className={styles.labelText}>Language tags</text>
                <input placeholder="Search language tags..." className={styles.tagSearch}/>
            </div>

            <button className={styles.profileSave}>
                Save
            </button>
        </div>
    )
}

function NotificationsTab() {
    return (
        <text>notification tab</text>
    )
}

function ContentTab() {
    return (
        <div className={styles.contentListContainer}>
            <text className={styles.contentTitle}>Your content</text>
            <div className={styles.contentList}>
                <div className={styles.contentItem}>
                    <text className={styles.contentItemTitle}>Title</text>
                    <div className={styles.contentItemOptions}>
                        <span className="material-icons">settings</span>
                    </div>
                </div>
                <div className={styles.contentItem}>
                    <text className={styles.contentItemTitle}>Title2</text>
                    <div className={styles.contentItemOptions}>
                        <span className="material-icons">settings</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function HelpTab() {
    return (
        <div className={styles.helpContainer}>
            <div className={styles.lineSep}>
                <text className={styles.lineLabel}>Report bug / issue</text>
            </div>
            <div className={styles.bugSection}>
                <img className={styles.githubLogo} src="icons/git.svg"/>
                <a href="https://github.com/liamdebellada/ada-coding-portal/issues/new" className={styles.githubIssueBtn}>Create github issue</a>
            </div>
        </div>
    )
}

export { ProfileTab, NotificationsTab, ContentTab, HelpTab }