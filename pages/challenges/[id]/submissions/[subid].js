import styles from '../../../../styles/submissionEditor.module.css'
import Editor from '@monaco-editor/react'
import themeData from '../../../../styles/editortheme.json'
import dynamic from 'next/dynamic'

import FloatingContainer from '../../../../components/layout/floatingContainer'

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
    const plugin = await import('xterm-addon-fit')
    const FitAddon = new plugin.FitAddon()
    return ({ forwardedRef, ...props }) => <Terminal.XTerm addons={[FitAddon]} ref={forwardedRef} {...props} />;

}, {
    ssr: false
})

export default function submission(props) {
    //configure vs-monaco theme
    function handleEditorWillMount(monaco) {
        monaco.editor.defineTheme("nucleus", themeData)
    }

    //colour states for reactive widgets
    const [connected, setConnected] = useState(false)

    //states & functions for resizable area
    const [ terminalSize, setTerminalSize ] = useState(20);
    const [dragging, setDragging] = useState(false);
    const [globalSocket, setGlobalSocket] = useState(null)
    
    const handleMouseDown = (e) => {
        setDragging(true)
    }

    useEffect(() => {
        if (dragging) {
            globalSocket.emit('resizeContainer', {rows: xtermInstance.current.terminal.rows, cols: xtermInstance.current.terminal.cols})
        } else {
            if (xtermInstance.current) {
                xtermInstance.current.terminal._addonManager._addons[0].instance.fit()
            }
        }
    }, [dragging])

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
            console.log(data)
            if (!data.message) {
                xtermInstance.current.terminal.writeln(`Starting your container: ${data.port}`)
                setConnected(true)
            } else {
                if (data.terminated) {
                    console.log("terminated.")
                    setConnected(false)
                }
                xtermInstance.current.terminal.writeln(data.message)
            }

            setTimeout(() => {
                socket.emit('connectContainer', {})
            }, 1000)
        })

        socket.on('commandResponse', (data) => {
            xtermInstance.current.terminal.write(data)
        })
    }, [])

    const requestContainerRestart = () => {
        globalSocket.emit('regenContainer')
    }

    const requestContainerStop = () => {
        globalSocket.emit('stopContainer')        
    }

    const handleKeyInput = (key) => {
        globalSocket.emit('interactWithContainer', key.key)
    }

    
    return (
        <FloatingContainer>
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
                <div style={{overflow: 'hidden'}} ref={editorWindow} onMouseUp={() => setDragging(false)} onMouseMove={handleMouseMove} className={styles.ideContainer}>
                    <Editor className={styles.ide}
                    defaultLanguage="python"
                    value={placeholdercode}
                    theme="nucleus"
                    beforeMount={handleEditorWillMount}
                    />
                    <div style={{height:`${terminalSize}px`}} className={styles.terminalContainer}>
                            <div onMouseDown={handleMouseDown} className={styles.dragBar}/>
                            <div className={styles.terminalLegend}>
                                <span onClick={requestContainerRestart} className="material-icons noselect">restart_alt</span>
                                <span onClick={requestContainerStop} className="material-icons noselect">dangerous</span>
                                <div style={{background: connected ? '#8AB77A' : '#b95151'}} className={styles.statusCircle}/>
                            </div>
                        <DynamicTerminal className={styles.tc} options={{'cursorBlink': true, 'fontSize' : 13, 'lineHeight' : 1,'theme': { background: '#342E49', width: 100, height: '100%' }}} forwardedRef={xtermInstance} onKey={handleKeyInput}/>
                    </div>
                </div>
            </div>
        </FloatingContainer>
 
    )
}

export async function getServerSideProps() {
    return {
        props: {
            title: "submission"
        }
    }
}
