import {getSession} from 'next-auth/client'
import { useState } from 'react'
import styles from '../styles/settings.module.css'
import {ProfileTab, NotificationsTab, ContentTab, HelpTab} from '../components/settings-views'

const tabIndex = [
    {adjustment: 0, component: <ProfileTab/>}, 
    {adjustment: 4, component: <NotificationsTab/>},
    {adjustment: 8, component: <ContentTab/>},
    {adjustment: 12, component: <HelpTab/>}
]


export default function settings() {
    const [activeTab, setActiveTab] = useState(tabIndex[0])
    const [sliderPos, setSliderPos] = useState(0)
    function handleTabChange(t) {
        setActiveTab(tabIndex[t])
        setSliderPos(tabIndex[t].adjustment)
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.leftSide}>
                <div className={styles.backSlider} style={{marginTop: `${sliderPos}rem`}}/>
                <div className={styles.tab} onClick={() => handleTabChange(0)}>
                    <span className={`material-icons ${styles.tabIcon}`}>face</span>
                    <text className={styles.tabText}>Profile</text>
                </div>
                <div className={styles.tab} onClick={() => handleTabChange(1)}>
                    <span className={`material-icons ${styles.tabIcon}`}>notifications_active</span>
                    <text className={styles.tabText}>Notifications</text>
                </div>
                <div className={styles.tab} onClick={() => handleTabChange(2)}>
                    <span className={`material-icons ${styles.tabIcon}`}>format_list_bulleted</span>
                    <text className={styles.tabText}>Content</text>
                </div>
                <div className={styles.tab} onClick={() => handleTabChange(3)}>
                    <span className={`material-icons ${styles.tabIcon}`}>help_outline</span>
                    <text className={styles.tabText}>Help</text>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.rightInternal}>
                    {activeTab.component}
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    var s = await getSession(context)
    return {
        props: {
            session: s
        }
    }
}