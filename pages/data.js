import styles from '../styles/data.module.css'
import Graph from 'react-graph-network';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { AnimatePresence, motion } from "framer-motion"
import LoadingIndicator from '../components/ui/loadingIndicator'


export default function dataView(props) {
    const manageSidePanel = (queryNode, type) => {
        switch (queryNode[type]) {
            case queryNode['challenge']:
                setPanelLayout(0)
                setPanelData({
                    type: 'Challenge',
                    title: 'Unit 4 - Booking system challenge',
                    data: {
                        submissions: 14,
                        teamSize: 1,
                        languages: 'All',
                        dateDue: '10/04/2021',
                        teacher: 'Steve Rich'
                    },
                    submissions: [
                        {
                            name: 'Liam Debell',
                            submitted: '10/04/2021'
                        },
                        {
                            name: 'Bruno Silva',
                            submitted: '10/05/2021'
                        }
                    ]
                })
                break;
            case queryNode['group']:
                setPanelLayout(1)
                setPanelData({
                    type: 'Group',
                    title: 'Team Alpha',
                    members: [
                        {
                            name: 'Liam Debell',
                            time: '10/04/2021'
                        },
                        {
                            name: 'Bruno Silva',
                            time: '10/05/2021'
                        }
                    ],
                    challenge: {
                        time: '24/02/2021',
                        languageIcon: '/icons/python.svg',
                        title: 'Unit 4 - Theatre booking system',
                        teacher: 'Steve Rich',
                        submissions: [
                            {picture: '/profile.svg'},
                            {picture: '/profile.svg'}
                        ]
                    }
                })
                break;
            case queryNode['member']:
                setPanelLayout(2);
                setPanelData({
                    type: 'Profile',
                    title: 'Bruno Silva',
                    data: {
                        name: 'Bruno Silva',
                        picture: '/profile.svg',
                        url: 'bruno_silva',
                        submissionCount: 34,
                        voteCount: 12,
                        activityCount: 90
                    },
                    collab: [
                        {
                            name: 'Liam Debell',
                            time: '10/04/2021'
                        },
                        {
                            name: 'Bruno Silva',
                            time: '10/05/2021'
                        }
                    ]
                })    
                break;
        }
        if (!displayPanel) setPanelState(true)
    }

    const Node = ({node}) => {
        if(node.challenge) {
            return (
                <circle fill="#544d75" onClick={() => manageSidePanel(node, 'challenge')} r="12"/>
            )
        } else if (node.group) {
            return (
                <circle fill="#4D4470" onClick={() => manageSidePanel(node, 'group')} r="10"/>
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
                    <circle fill="url(#image)" onClick={() => manageSidePanel(node, 'member')} stroke="#4D4470" strokeWidth="0.2%" r="10"/>
                </>
            )
        }
    }
    
    //data tree states
    const [treeDataLoaded, setTreeDataLoaded] = useState(false)
    const [treeData, setNodes] = useState({
        nodes: [],
        links: []
    })
    const [challenges, setChallenges] = useState(null)

    //panel states
    const [displayPanel, setPanelState] = useState(false)
    const [panelLayout, setPanelLayout] = useState(0) //0: challenge, 1: team, 2: profile, 3: error
    const [panelData, setPanelData] = useState({
        type: 'Challenge',
        title: 'Loading...'
    })
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

            <AnimatePresence key={panelLayout}>
            <motion.div className={styles.animatedContainerFix} exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
                <div className={styles.panelHeader}>
                    <h1 className={styles.panelHeaderText}>{panelData.type}<text className={styles.lightHeaderText}>{` - ${panelData.title}`}</text></h1>
                </div>
                {
                    panelLayout == 0 && panelData.data != null ?
                    <>
                        <div className={styles.widgetContainer}>
                            {Object.keys(panelData.data).map((k, i) => (
                                <div key={i} className={styles.sameLineContent}>
                                    <div className={styles.objectKey}>{`${k}:`}</div>
                                    <div className={styles.objectValue}>{panelData.data[k]}</div>
                                </div>
                            ))}
                        </div>

                        <input placeholder="Search submissions" className={`${styles.widgetContainer} ${styles.searchBar}`}/>

                        <div className={`${styles.widgetContainer} ${styles.searchResultsContainer}`}>
                            {panelData.submissions.map((k, i) => (
                                <div key={i} className={`${styles.submissionResults} ${styles.sameLineContent}`}>
                                    <div>{k.name}</div>
                                    <div>{k.submitted}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    : panelLayout == 1 && panelData != null ? 
                        <>
                            <div className={`${styles.widgetContainer} ${styles.sameLineContent}`} style={{marginTop: 0, height: "2.5rem"}}>
                                <div>Size:</div>
                                <div className={styles.objectValue}>{panelData.members.length}</div>
                            </div>

                            <div className={styles.widgetContainer} style={{gap: "1rem", marginTop: "0"}}>
                                <div>Members:</div>
                                {panelData.members.map((k, i) => (
                                    <div key={i} className={`${styles.submissionResults} ${styles.sameLineContent}`}>
                                        <div>{k.name}</div>
                                        <div>{k.time}</div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.widgetContainer} style={{gap: "1rem", marginTop: "0"}}>
                                <div>Challenge:</div>
                            </div>
                        </>
                    : panelLayout == 2 && panelData != null ?
                    <>
                        <div className={styles.miniProfileContainer}>
                            <img className={styles.profilePic} src={panelData.data.picture} />
                            <h1 className={styles.lightHeaderText}>{panelData.data.name}</h1>
                            <div className={styles.basicStatsGrid}>
                                <div className={styles.iStat}>
                                    <text className={styles.statValueText}>{panelData.data.submissionCount}</text>
                                    <text className={styles.statLabelText}>Subs</text>
                                </div>
                                <div className={styles.iStat}>
                                    <text className={styles.statValueText}>{panelData.data.voteCount}</text>
                                    <text className={styles.statLabelText}>Votes</text>
                                </div>
                                <div className={styles.iStat}>
                                    <text className={styles.statValueText}>{panelData.data.activityCount}</text>
                                    <text className={styles.statLabelText}>Activity</text>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.widgetContainer} ${styles.collabGap}`}>
                            <div>Collaborated with:</div>
                            {panelData.collab.map((v, i) => (

                                <div key={i} className={`${styles.submissionResults} ${styles.collabResult} ${styles.sameLineContent}`}>
                                    <div>{v.name}</div>
                                    <div>{v.time}</div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.bottomOptions}>
                            <button className={styles.widgetButton}>View full report</button>
                            <button className={styles.widgetButton}>Generate full data report</button>
                        </div>
                    </>
                    :
                        <div>error</div>
                }
            </motion.div>
            </AnimatePresence>
            </div>
        </>
    )

}