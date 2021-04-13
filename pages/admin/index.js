//ui
import FloatingContainer from '../../components/layout/floatingContainer'
import SwitchTab from '../../components/ui/switchTab'
import { ChallengesForm, BadgesForm, LanguagesForm } from '../../components/forms/admin'

//react
import {useState, useRef, useEffect} from 'react'

//gql
import { useQuery, useLazyQuery, gql } from '@apollo/client';

//styling
import { AnimatePresence, motion } from "framer-motion"
import styles from '../../styles/adminPanel.module.css'

const ListItem = (props) => {
    return (
        <div onClick={() => props.update(props.item)} className={styles.listItem}>
            <img className={styles.listImage} src="/python-white.svg"/>
            <div>{props.item.title || props.item.name}</div>
        </div>
    )
}

const ContentComp = (props) => {
    //query structure for tabbing.
    const minQuery = [
        {
            query : 
            gql`
            {
                findAllChallenges {
                    _id
                    title
                }
            }
            `,
            key: 'findAllChallenges'
        },
        {
            query : 
            gql`
            {
                findAllTrophies {
                    _id
                    name
                }
            }
            `,
            key: 'findAllTrophies'
        },
        {
            query : 
            gql`
            {
                findAllLanguages {
                    _id
                    name
                }
            }
            `,
            key: 'findAllLanguages'
        }
    ]

    //query structure for forms
    const maxQuery = [
        {
            query : 
            gql`
                query challengeSection ($id: String!) {
                    findChallengeByID(id: $id) {
                        _id
                        title
                        due
                        languages
                        teamSize
                    }
                }
            `,
            key: 'findChallengeByID'
        },
        {
            query : 
            gql`
                query badgeSelection ($id: String!) {
                    findTrophyByID(id: $id) {
                        _id
                        name
                        icon
                        description
                        rank
                    }
                }
            `,
            key: 'findAllTrophies'
        },
        {
            query : 
            gql`
                query languageSelection ($id: String!) {
                    findLanguageByID(id: $id) {
                        _id
                        name
                        difficulty
                        icon
                    }
                }
            `,
            key: 'findAllLanguages'
        }
    ]

    //form setup
    const formRef = useRef()
    const [formData, setFormData] = useState({})
    
    //gql query onload.
    const {loading, error, data} = useQuery(minQuery[props.dataIndex].query)
    const [getFormData] = useLazyQuery(maxQuery[props.dataIndex].query, {
        onCompleted: (data) => {
            setFormData(data[Object.keys(data)[0]])
        }
    })    

    //callback for updating form values
    const UpdateEditorArea = ({_id}) => {
        getFormData({ variables: { id: _id } })
    }

    //Searching functionality
    const [listItems, setListItems] = useState([])
    const didMountRef = useRef(false);

    const filterList = (query) => {
        const inputRegex = RegExp(query.split('').join('.*'))
        console.log(props.dataIndex)
        var results = data[minQuery[props.dataIndex].key].filter((key) => {
            return inputRegex.exec(key.title || key.name)
        })
        setListItems(results)
    }

    useEffect(() => {if (data) setListItems(data[minQuery[props.dataIndex].key])}, [data])

    useEffect(() => {
        if (didMountRef.current) {
            filterList(props.searchValue)
        } else {
            didMountRef.current = true
        }
    }, [props.searchValue])

    return (
        <div className={styles.grid}>
            <div style={{width: 'max-content', overflowY: 'scroll'}} className={`${styles.row} ${styles.listRow}`}>
 
            <AnimatePresence key={props.dataIndex}>
            <motion.div className={styles.animatedContainerFix} exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
                <div className={styles.listWrapper}>
                    {!loading && !error &&
                    <>
                        {listItems.map((item, k) => (
                            <ListItem key={k} update={UpdateEditorArea} item={item}/>
                        ))}
                    </>
                    }
                </div>
            </motion.div>
            </AnimatePresence>

            </div>
            <div className={`${styles.vCenterEditor} ${styles.row}`}>
                <div className={styles.editorArea}>
                    <div className={styles.editorHeader}>
                        <div className={styles.spacedHorizontal}>
                            <img src="/python-white.svg"/>
                            <div className={styles.editorTitle}>{"Quite a long title"}</div>
                        </div>
                        <button onClick={() => formRef.current.handleSubmit()} className={`material-icons ${styles.submitButton}`}>save_alt</button>
                    </div>
                    <div className={styles.scrollableForm}>
                        {props.dataIndex == 0 && 
                            <ChallengesForm forwardedRef={formRef} options={formData}/>
                        }
                        {props.dataIndex == 1 &&
                            <BadgesForm forwardedRef={formRef} options={formData}/>
                        }
                        {props.dataIndex == 2 &&
                            <LanguagesForm forwardedRef={formRef} options={formData}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function adminHome() {
    
    //layout
    const [view, setView] = useState(0)    
    const switchable = [
        {
            text: 'Content',
            icon: 'library_books'
        },
        {
            text: 'Users',
            icon: 'person'
        }
    ]

    //content
    const [contentView, setContentView] = useState(0)
    const contentSwitch = [
        {
            text: 'Challenges',
            icon: 'library_books'
        },
        {
            text: 'Badge',
            icon: 'local_police'
        },
        {
            text: 'Languages',
            icon: 'code'
        }
    ]

    //switchableValues
    const placeholders = [
        "Search challenges",
        "Search badges",
        "Search languages"
    ]

    const [searchText, setSearchText] = useState(null)

    return (
        <FloatingContainer switch={setView} switchTabOptions={switchable}>
            {
                view == 0 &&
                <div className={styles.subContainer}>
                    <div className={styles.header}>
                        <div className={`${styles.spacedHorizontal} ${styles.widgetContainer}`}>
                            <input onChange={(v) => setSearchText(v.target.value)} placeholder={placeholders[contentView]} className={styles.searchArea}/>
                            <button className={styles.addButton}><span className="material-icons">add</span></button>
                        </div>
                        <SwitchTab switcher={setContentView} options={contentSwitch}/>
                    </div>
                    <div className={styles.contentMain}>
                        {
                            contentView == 0 &&
                            <ContentComp searchValue={searchText} dataIndex={contentView}/>
                        }
                        {
                            contentView == 1 &&
                            <ContentComp searchValue={searchText} dataIndex={contentView}/>
                        }
                        {
                            contentView == 2 &&
                            <ContentComp searchValue={searchText} dataIndex={contentView}/>
                        }
                    </div>
                </div>
            }
            {
                view == 1 &&
                <div>users</div>
            }
        </FloatingContainer>
    )
}