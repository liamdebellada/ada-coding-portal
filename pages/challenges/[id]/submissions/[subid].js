import {getSession} from 'next-auth/client'
import styles from '../../../../styles/submissionEditor.module.css'
import Editor from '@monaco-editor/react'
import themeData from '../../../../styles/editortheme.json'

import { io } from "socket.io-client";
import { useEffect, useState, useRef } from 'react';

import Line from '../../../../components/terminal/line'

const placeholdercode = `class Node: #very simple node class
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList: #very not simple linked list class
    def __init__(self):
        self.head = None
        self.tail = None

    def outputNodes(self):
        t = self.head
        while t:
            print(t.data)
            t = t.next

    def getCount(self):
        t = self.head
        nodes = 0
        while t:
            nodes += 1
            t = t.next
        return nodes

    def deleteNode(self, key):
            
        prev = 0;
        temp = self.head #first instance of node
        
        if (temp is not None): #check if head node is valid
            if (temp.data == key): #check if head node is to be delete
                self.head = temp.next

        while temp:
            if temp.data == key:
                break
            prev = temp
            temp = temp.next

        #final cleanup
        prev.next = temp.next
        temp = None

    def append(self, newData):
        newNode = Node(newData)

        if self.head == None and self.tail == None:
            self.head = newNode
            self.tail = newNode
            return
        else:
            self.tail.next = newNode
            self.tail = newNode

    def sort(self):
        current = self.head
        index = None

        if self.head == None:
            return

        while current is not None:
            index = current.next
            while index is not None:
                if current.data > index.data:
                    tempCurrent = current.data
                    current.data = index.data
                    index.data = tempCurrent
                index = index.next
            current = current.next
                    
                    
                    


if __name__ == "__main__":
    list = LinkedList()

    list.append(9)
    list.append(1)
    list.append(2)

    list.outputNodes()

    list.sort()

    list.outputNodes()`

export default function submission(props) {
    function handleEditorWillMount(monaco) {
        monaco.editor.defineTheme("nucleus", themeData)
    }

    const [ terminalSize, setTerminalSize ] = useState(20);
    const [dragging, setDragging] = useState(false);
    const [mouseStart, setMouseStart] = useState({ y: 0 });

    const [terminalHistory, setTerminalHistory] = useState([0])

    const terminalWindow = useRef(null);
    const editorWindow = useRef(null);

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            extraHeaders: {
                'Authorization' : `Bearer ${props.globalProps.session.accessToken}`
            }
        })

        socket.on("connect_error", (err) => {
            alert(err.message)
        });

        socket.emit("setupContainer", {"test" : "test"})

        socket.on("containerInfo", (data) => {
            console.log(data)
        })
    }, [])

    useEffect(() => {
        if (terminalHistory.length > 1) {

            var next = document.getElementById((parseInt(terminalHistory[terminalHistory.length-1]) + 1).toString())
            setTimeout(() => {
                next.focus()
            }, 0)
        }
    }, [terminalHistory])

    const handleMouseDown = (e) => {
        setDragging(true)
        setMouseStart({y: e.clientY });
    }

    const handleMouseMove = (e) => {
        if (dragging) {
            document.body.style.cursor = "grab !important"
            var computedHeight = editorWindow.current.clientHeight - (e.clientY - editorWindow.current.offsetTop)
            setTerminalSize(() => computedHeight)
        }
    }

    const test = {
        "test" : "hello world"
    }

    const RecieveCommand = (command) => {
        return test[command]
    }
    
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
                <div ref={editorWindow} onMouseUp={() => setDragging(false)} onMouseMove={handleMouseMove} className={styles.ideContainer}>
                    <Editor className={styles.ide}
                    defaultLanguage="python"
                    width="100%"
                    value={placeholdercode}
                    theme="nucleus"
                    beforeMount={handleEditorWillMount}
                    />
                    <div ref={terminalWindow} style={{height:`${terminalSize}px`}} className={styles.terminalContainer}>
                        <div onMouseDown={handleMouseDown} className={styles.dragBar}/>
                        <div className={styles.terminalParent}>
                            {terminalHistory.map((v,k) => (
                                <Line cmdCallback={RecieveCommand} index={k} update={setTerminalHistory} key={k}/>
                            ))}
                        </div>
                    </div>
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
