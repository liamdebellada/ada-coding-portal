import styles from '../../styles/floatingContainer.module.css'
import SwitchTab from '../ui/switchTab'

export default function adminHome(props) {
    return (
        <div className={styles.parent}>
            <div className={styles.fillHeight}>
                {
                    props.switchTabOptions &&
                    <div className={styles.header}>
                        <SwitchTab switcher={props.switch} options={props.switchTabOptions}/>
                    </div>
                }
                <div style={{padding: props.usePadding ? '1.5rem' : '0'}} className={styles.main}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}