//stylesheet for statistic containers
import styles from '../styles/stats.module.css'

//graphs imports
import {Bar} from 'react-chartjs-2'
import Graph from 'react-graph-network';

//data imports
import axios from 'axios'
import { useEffect, useState } from 'react';

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
                <circle fill="url(#image)" onClick={() => console.log(node)} stroke="#4D4470" strokeWidth="0.5%" r="10"/>
            </>
        )
    }
}

export default function stats(props) {
    const [treeDataLoaded, setTreeDataLoaded] = useState(false)
    const [treeData, setNodes] = useState({
        nodes: [],
        links: []
    })
    const [challenges, setChallenges] = useState(null)

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
            console.log(treeData)
            setTreeDataLoaded(true)
        }
    }, [challenges])

    return (
        <div className={styles.parent}>
            <div className={styles.topSection}>
                <div className={styles.chartContainer}>
                
                </div>
                <div className={styles.chartContainer}>

                </div>
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.chartContainer}>
                    {
                        treeDataLoaded ?  
                            <Graph zoomDepth={3} NodeComponent={Node} pullIn={true} data={treeData} id="graph" enableDrag={true} preserveAspectRatio="none" style={{position: 'absolute'}}/>
                        :
                            <text>loading</text>
                    }
                </div>
            </div>
        </div>

    )
}
