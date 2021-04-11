import styles from '../../styles/switchTab.module.css'
import {useState} from 'react'

export default function SwitchTab(props) {
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <div className={`noselect ${styles.parent}`}>
            {props.options.map((option, k) => (
                <div key={k} onClick={() => {
                    setSelectedTab(k)
                    props.switcher(k)
                }} className={selectedTab == k ? `${styles.selected} ${styles.tab}` : `${styles.nonSelect} ${styles.tab}`}>
                    <span className="material-icons">{option.icon}</span>
                    <text>{option.text}</text>
                </div>
            ))}
        </div>
    )
}