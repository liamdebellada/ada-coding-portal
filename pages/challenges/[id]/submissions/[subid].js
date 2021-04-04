import {getSession} from 'next-auth/client'
import styles from '../../../../styles/submissionEditor.module.css'
import Editor from '@monaco-editor/react'
import themeData from '../../../../styles/editortheme.json'
import dynamic from 'next/dynamic'

import { io } from "socket.io-client";
import { useEffect, useState, useRef } from 'react';

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

const DynamicTerminal = dynamic(async () => {
    const Terminal = await import('xterm-for-react')
    return ({ forwardedRef, ...props }) => <Terminal.XTerm ref={forwardedRef} {...props} />;

}, {
    ssr: false
})


export default function submission(props) {
    //configure vs-monaco theme
    function handleEditorWillMount(monaco) {
        monaco.editor.defineTheme("nucleus", themeData)
    }

    //states & functions for resizable area
    const [ terminalSize, setTerminalSize ] = useState(20);
    const [dragging, setDragging] = useState(false);
    const [globalSocket, setGlobalSocket] = useState(null)
    
    const handleMouseDown = (e) => {
        setDragging(true)
    }

    const handleMouseMove = (e) => {
        if (dragging) {
            document.body.style.cursor = "grab !important"
            var computedHeight = editorWindow.current.clientHeight - (e.clientY - editorWindow.current.offsetTop)
            if (computedHeight >= 20) {
                setTerminalSize(() => computedHeight)
            }
        }
    }

    //refs to editor and xterm 
    const editorWindow = useRef(null);
    const xtermInstance = useRef()

    //Mount socket connections
    useEffect(() => {
        const socket = io('http://localhost:5000', {
            extraHeaders: {
                'Authorization' : `Bearer ${props.globalProps.session.accessToken}`
            }
        })

        setGlobalSocket(socket)

        socket.on("connect_error", (err) => {
            alert(err.message)
        });

        socket.emit("setupContainer", {})

        socket.on("containerInfo", (data) => {
            //client recieves connection info for container
            xtermInstance.current.terminal.writeln(`Starting your container:${data.port}`)
            setTimeout(() => {
                xtermInstance.current.terminal.setOption('fontSize', 13)
                socket.emit('connectContainer', {})
            }, 1000)
        })

        socket.on('commandResponse', (data) => {
            xtermInstance.current.terminal.write(data)
        })

        
    }, [])

    const [curLine, setCurrentLine] = useState("")
    const handleTerminalInput = (key) => {
    }


    const handleKeyInput = (key) => {
        globalSocket.emit('interactWithContainer', key.key)
        // setCurrentLine(curLine => curLine += key.key)
        // if (key.domEvent.keyCode == 13) {
        //     console.log("sending:", curLine)
        //     globalSocket.emit('interactWithContainer', curLine)
        // } else {
        //     xtermInstance.current.terminal.write(key.key, () => {
        //         if (key.domEvent.keyCode == 8) {
        //             xtermInstance.current.terminal.write('\b \b')
        //         }
        //     })
        // }
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
                    <div style={{height:`${terminalSize}px`}} className={styles.terminalContainer}>
                        <div onMouseDown={handleMouseDown} className={styles.dragBar}/>
                        <DynamicTerminal options={{'theme': { background: '#342E49' }}} forwardedRef={xtermInstance} onKey={handleKeyInput} customKeyEventHandler={handleTerminalInput}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            title: "submission"
        }
    }
}
