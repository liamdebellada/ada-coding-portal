import styles from '../styles/data.module.css'
import Graph from 'react-graph-network';
import {useState, useEffect} from 'react'
import axios from 'axios'



export default function dataView(props) {
    const manageSidePanel = (id) => {
        console.log(id)
        if (!displayPanel) setPanelState(true)
    }

    const Node = ({node}) => {
        if(node.challenge) {
            return (
                <circle fill="#544d75" onClick={() => console.log(node)} r="12"/>
            )
        } else if (node.group) {
            return (
                <circle fill="#4D4470" onClick={() => console.log(node)} r="10"/>
            )
        } else {
            return (
                <>
                    <defs>
                        <pattern id="image" x="0%" y="0%" height="100%" width="100%"
                                viewBox="0 0 512 512">
                            <image fill="black" x="0%" y="0%" width="512" height="512" href="/profile.svg"></image>
                        </pattern>
                    </defs>
                    <circle fill="url(#image)" onClick={() => manageSidePanel(node.id)} stroke="#4D4470" strokeWidth="0.2%" r="10"/>
                </>
            )
        }
    }
    
    const [treeDataLoaded, setTreeDataLoaded] = useState(false)
    const [treeData, setNodes] = useState({
        nodes: [],
        links: []
    })
    const [challenges, setChallenges] = useState(null)
    const [displayPanel, setPanelState] = useState(false)
    useEffect(() => {
        axios.post('http://localhost:5000/graphql', {
            query: `
            {
                findAllChallenges {
                    _id
                    teamSize
                    teams {
                        name
                        members
                    }
                }
            }
            `
        },
        {
            headers: {
                'Authorization' : `Bearer ${props.globalProps.session.accessToken}`
            }
        }
        ).then(data => {
            setChallenges(data.data.data.findAllChallenges)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    //construct data tree
    useEffect(() => {
        if (challenges) {
            for (var item in challenges) {
                if (challenges[item].teamSize) {
                    //set parent challenge node
                    treeData.nodes.push({
                        id: challenges[item]._id,
                        challenge: true
                    })
                    if (previous) {
                        treeData.links.push({
                            source: challenges[item]._id,
                            target: previous
                        })
                    }
                    //set group nodes
                    challenges[item].teams.forEach((challenge) => {
                        treeData.nodes.push({
                            id: challenge.name,
                            group: true
                        })

                        treeData.links.push({
                            source: challenges[item]._id,
                            target: challenge.name
                        })

                        //set member nodes
                        challenge.members.forEach((member) => {
                            treeData.nodes.push({
                                id: member,
                                member: true
                            })

                            treeData.links.push({
                                source: challenge.name,
                                target: member
                            })
                        })
                    })
                    let previous = challenges[item]._id
                }
            }
            setTreeDataLoaded(true)
        }
    }, [challenges])


    return (
        <>
            <div style={{position: 'relative', height: '100%', color: 'white'}}>
                {
                    treeDataLoaded ?  
                        <Graph zoomDepth={3} NodeComponent={Node} pullIn={true} data={treeData} id="graph" enableDrag={true} preserveAspectRatio="none" style={{position: 'absolute'}}/>
                    :
                        <text>loading</text>
                }
            </div>

            <div style={{width: displayPanel ? '23rem' : 0}} className={styles.rightSidePanel}>
                <div className={styles.panelHeader}>
                    <h1 className={styles.panelHeaderText}>Challenge <text className={styles.lightHeaderText}> - Unit 4 booking challenge</text></h1>
                </div>

                <div className={styles.widgetContainer}>
                    t
                </div>
            </div>
        </>
    )

}