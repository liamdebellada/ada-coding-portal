import styles from '../styles/submissionList.module.css'

//UI components
import SubmissionList from '../components/submissionList'
import SwitchTab from '../components/ui/switchTab'
import ProgressBar from '../components/ui/progressBar'

//react
import { useState } from 'react'

export default function submission() {

    const [viewContent, setViewContent] = useState(0)

    const switchable = [
        {
            text: 'Overview',
            icon: 'local_fire_department'
        },
        {
            text: 'Badges',
            icon: 'local_police'
        }
    ]

    const submitted = [
        {
            title: 'Unit 4 - Booking system task',
            icon: '/python-white.svg'
        },
        {
            title: 'Unit 8 - Work',
            icon: '/python-white.svg'
        },

        {
            title: 'Unit 8 - Work',
            icon: '/python-white.svg'
        },
        {
            title: 'Unit 8 - Work',
            icon: '/python-white.svg'
        },
        {
            title: 'Unit 8 - Work',
            icon: '/python-white.svg'
        }
    ]

    const nonsubmitted = [
        {
            title: 'Unit 2 - Python algorithm',
            icon: '/python-white.svg'
        }
    ]

    return (
        <div className={styles.parent}>
            <div className={styles.fillHeight}>
                <div className={styles.header}>
                    <SwitchTab switcher={setViewContent} options={switchable}/>
                </div>
                {
                    viewContent == 0 ? 
                        <div className={styles.main}>
                            <SubmissionList options={{title: 'Submitted', data: submitted}}/>
                            <SubmissionList options={{title: 'Nonsubmitted', data: nonsubmitted}}/>
                        </div>
                    :
                        <div className={styles.main}>
                            <div className={styles.badgesMain}>
                                <div className={styles.bHeader}>
                                    <div>Your progress</div>
                                </div>
                                <div className={styles.bBody}>
                                    <div className={styles.bRow}>
                                        <div className={styles.bBadge}>
                                            <div className={styles.badgeIconContainer}>
                                                <img className={styles.bIcon} src="/python-white.svg"/>
                                            </div>
                                            <div className={styles.bInfo}>
                                                <div className={styles.bTitle}>100 Challenges</div>
                                                <div className={styles.bDescription}>Complete 100 challenges to achieve this badge.</div>
                                            </div>
                                        </div>
                                        <div className={styles.bBadge}>
                                            <div className={styles.badgeIconContainer}>
                                                <img className={styles.bIcon} src="/python-white.svg"/>
                                            </div>
                                            <div className={styles.bInfo}>
                                                <div className={styles.bTitle}>100 Challenges</div>
                                                <div className={styles.bDescription}>Complete 100 challenges to achieve this badge.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.bRow}>
                                        <div className={`${styles.bBadge} ${styles.bBadgeProgress}`}>
                                            <div className={styles.badgeIconContainer}>
                                                <img className={styles.bIcon} src="/python-white.svg"/>
                                            </div>
                                            <div>
                                                <div style={{textAlign: 'center', width: '100%'}} className={`${styles.bTitle} ${styles.noBack}`}>Python master!</div>
                                                <div className={styles.bDescription}>Complete all master level python tasks.</div>
                                            </div>
                                            <div className={styles.bProgressContainer}>
                                                <ProgressBar value={10}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}