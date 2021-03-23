import { useEffect, useState } from 'react'
import styles from '../styles/settings.module.css'
import {ProfileTab, NotificationsTab, ContentTab, HelpTab} from '../components/settings-views'
import axios from 'axios'

export default function settings(props) {
    const [changes] = useState([])
    const [change, createChange] = useState(null)

    const saveSettings = () => { //call this inside of the components :)
        if (!changes.length < 1) {
            axios.post(`${process.env.HOST}/api/users/updateSettings`, {
                changes
            }, {
                headers: {
                    'authorization': `Bearer ${props.globalProps.session.accessToken}`
                }
            }).then(success => {
                console.log(success)
            }).catch(error => {
                console.log(error) //unauthorised.
            })
        }
    }

    useEffect(() => {
        if (change != null) {
            let toUpdate = changes.findIndex((() => Object.keys(change)[0]))
            if (toUpdate < 0) {
                changes.push(change) //create instance of object to be changed
            } else {
                changes[toUpdate][Object.keys(change)[0]] = Object.values(change)[0]; //update existing instance by index
            }
        }
    }, [change])

    const tabIndex = [
        {adjustment: 0, component: <ProfileTab save={saveSettings} createChange={createChange} {...props}/>}, 
        {adjustment: 4, component: <NotificationsTab {...props}/>},
        {adjustment: 8, component: <ContentTab {...props}/>},
        {adjustment: 12, component: <HelpTab {...props}/>}
    ]
    const [activeTab, setActiveTab] = useState(tabIndex[0])
    const [sliderPos, setSliderPos] = useState(0)
    function handleTabChange(t) {
        setActiveTab(tabIndex[t])
        setSliderPos(tabIndex[t].adjustment)
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={`${styles.leftSide} noselect`}>
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