import { useState } from 'react'
import styles from '../styles/submissionList.module.css'

export default function SubmissionList(props) {

    const [listItems, setListItems] = useState(props.options.data)

    const filterSubmissions = (query) => {
        const inputRegex = RegExp(query.split('').join('.*'))
        var results = props.options.data.filter((key) => {
            return inputRegex.exec(key.title)
        })
        setListItems(results)
    }

    return (
        <div className={styles.submissionList}>
            <div className={styles.slHeader}>
                <div>
                    <div className={styles.titleText}>{props.options.title}</div>
                </div>
                <div className={styles.slHeaderRight}>
                    <input onChange={(e) => filterSubmissions(e.target.value)} className={styles.searchArea} placeholder="Search"/>
                    <button className={`material-icons ${styles.exportData}`}>file_download</button>
                </div>
            </div>
            <div className={styles.slBody}>
                {listItems.map((sub, k) => (
                    <div key={k} className={styles.listItem}>
                        <div className={styles.sectionData}>
                            <img className={`${styles.dataLogo} noselect`} src={sub.icon}/>
                            <div className={styles.titleContainer}>
                                <text>{sub.title}</text>
                            </div>
                        </div>
                        <div className={styles.sectionData}>
                            <span className="material-icons noselect">library_books</span>
                            <span className="material-icons noselect">work</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}