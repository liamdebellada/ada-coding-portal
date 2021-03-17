import {getSession} from 'next-auth/client'
import styles from '../../../../styles/submissionEditor.module.css'
import Editor from '@monaco-editor/react'

export default function submission(props) {
    return (
        <div className={styles.container}>
            <div className={styles.centerContainer}>
                <div className={styles.sideTree}>
                    <div className={styles.sideTreeHeader}>
                        <img className={styles.challengeLanguageImage} src="/python-white.svg"/>
                        <text className={styles.challengeTitle}>Challenge title - Goes here!</text>
                        <div className={styles.underline}/>
                    </div>

                    <div className={styles.sideTreeMain}>
                    </div>
                </div>
                <div className={styles.ideContainer}>
                    <Editor className={styles.ide}
                    defaultLanguage="cpp"
                    theme="vs-dark"
                    width="100%"
                    />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    var s = await getSession(context)
    return {
        props: {
            session: s,
            title: "submission"
        }
    }
}
