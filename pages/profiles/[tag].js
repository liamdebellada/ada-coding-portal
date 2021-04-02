import styles from '../../styles/profiles.id.module.css'
import StatsView from '../../components/profile-stats'

const stats = [
    {
        value: 10,
        label: 'Subs'
    },
    {
        value: 23,
        label: 'Votes'
    },
    {
        value: 43,
        label: 'Activity'
    }
]

const challenges = [
    {
        title: 'Booking system for a theater.',
        icon: '/icons/java.svg',
        completion: 100
    },
    {
        title: 'Starter challenge welcome to nucleus',
        icon: '/icons/java.svg',
        completion: 44
    },
    {
        title: 'Google API integration',
        icon: '/icons/java.svg',
        completion: 56
    },
]

export default function profileView(props) {
    return (
        <div className={styles.bodyContainer}>
            <style jsx global>{`
                body {
                    background: #3D3756 !important;
                }            
            `}</style>
            <div className={styles.profileContainer}>
                <div className={styles.profilePicContainer}>
                    <img referrerPolicy="no-referrer" className={styles.profilePic} src={props.globalProps.session.picture}/>
                </div>
                <div className={styles.profileInfoContainer}>
                    <h1 className={styles.nameText}>{props.globalProps.session.name}</h1>
                    <p className={styles.bioText}>
                        Massive biography goes here, and theres more text...
                    </p>
                </div>
                <div className={styles.basicStatsGrid}>
                    {stats.map((stat, key) => (
                        <div key={key} className={styles.iStat}>
                            <text className={styles.statValueText}>{stat.value}</text>
                            <text className={styles.statLabelText}>{stat.label}</text>
                        </div>
                    ))}
                </div>
                <div className={styles.profileChallenge}>
                    {challenges.map((challenge, key) => (
                        <div key={key} className={`noselect ${styles.minifiedChallenge}`}>
                            <div className={styles.challengeHeader}>
                                <img className={styles.challengeIcon} src={challenge.icon}/>
                                <text className={styles.challengeProgressText}>{`${challenge.completion}%`}</text>
                            </div>
                            <div className={styles.challengeTitle}>
                                <text>{challenge.title}</text>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.statsContainer}>
                    <StatsView {...props}/>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}
    }
}