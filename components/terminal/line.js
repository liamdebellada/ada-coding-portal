import styles from '../../styles/terminal.module.css'

import {useState} from 'react'

export default function Line(props) {

    const [terminalOutput, setTerminalOutput] = useState(null)

    const handleEnterPressed = (e, command) => {
        props.update(history => [...history, e.target.id])
        e.target.contentEditable = "false"
        setTerminalOutput(props.cmdCallback(command))
    }

    return (
        <>
            <section className={styles.terminalRow}>
                <span>user@localhost~$: </span>
                <div id={props.index} className={styles.terminalInput} onKeyPress={(event) => event.code == 'Enter' ? handleEnterPressed(event, event.currentTarget.innerText) : false} contentEditable="true"></div>
            </section>
            <div>{terminalOutput}</div>
        </>
    )
}