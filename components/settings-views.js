import styles from '../styles/settings.module.css'
import LangTag from '../components/language-tag'
import {signOut} from 'next-auth/client'
import {useState} from 'react'
import { recordChange } from '../utils/settingsManager'

function ProfileTab(props) {
    const TAGS = ["c", "python", "bash", "dart"]
    const [results, setResults] = useState(TAGS)
    const filterTags = (query) => {
        const inputRegex = RegExp(query.split('').join('.*'))
        var results = TAGS.filter((key) => {
            return inputRegex.exec(key)
        })
        setResults(results)
    }
    return (
        <div className={styles.componentContainer}>
            <div className={styles.profileBasic}>
                <img className={styles.pictureContainer} src={props.globalProps.session.picture}/>
                <text className={styles.userName}>{props.globalProps.session.name}</text>
                <div className={styles.tagContainer}>
                    <LangTag langName="python"/>
                    <LangTag langName="dart"/>
                    <LangTag langName="bash"/>
                    <LangTag langName="go"/>
                    <LangTag langName="lua"/>
                    <LangTag langName="C"/>
                </div>
            </div>
            <div className={styles.lineSep}>
                <text className={styles.lineLabel}>Your Profile</text>
            </div>
            <div className={styles.settingsArea}>
                <text className={styles.labelText}>Biography</text>
                <textarea onChange={(event) => recordChange(props.createChange, {"bio": event.target.value})} placeholder="Type your bio here!" className={styles.bioArea}></textarea>
                <text className={styles.labelText}>Language tags</text>
                <input onChange={(event) => filterTags(event.target.value)} placeholder="Search language tags..." className={styles.tagSearch}/>
                <div className={styles.tagSearchResults}>
                    {results.map((tag, key) => (
                        <div className={styles.tagList} key={key}>
                            <img className={styles.tagListIcon} src={`icons/${tag.toLowerCase()}.svg`}/>
                            <text>{tag}</text>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.profileBottom}>
                <button onClick={() => {signOut()}} className={`${styles.profileButton} ${styles.signOutButton}`}>
                    <span className="material-icons">exit_to_app</span>
                    Sign out
                </button>

                <button onClick={() => props.save()} className={styles.profileButton}>
                    Save
                </button>
            </div>
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