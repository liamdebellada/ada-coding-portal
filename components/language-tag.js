import styles from '../styles/language-tag.module.css'

export default function LanguageTag(props) {
    return (
        <div className={styles.tag}>
            <img className={styles.tagIcon} src={`icons/${props.langName.toLowerCase()}.svg`}/>
            <text>{props.langName}</text>
        </div>
    )
}