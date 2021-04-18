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
    const didMountRef = useRef(false);
    const formRef = useRef();
    const [formData, setFormData] = useState({})

    //Updates
    const onRequestComplete = (data) => {
        setFormData(data[Object.keys(data)[0]])
    }

    const UpdateEditorArea = ({_id}) => {
        switch(props.dataIndex) {
            case 0:
                getChallenge({variables: {id: _id}})
                break;
            case 1:
                getBadge({variables: {id: _id}})
                break;
            case 2:
                getLanguage({variables: {id: _id}})
                break;
        }
    }

    //gql content queries
    const [getChallenge] = useLazyQuery(gql`
        query challengeSection ($id: String!) {
            findChallengeByID(id: $id) {
                _id
                title
                due
                description
                languages
                teamSize
            }
        }
    `, {onCompleted: (data) => {
        var c = JSON.parse(JSON.stringify(data))
        c.findChallengeByID.due = new Date(parseInt(data.findChallengeByID.due))
        setFormData(c[Object.keys(c)[0]])
    }})

    const [getBadge] = useLazyQuery(gql`
        query badgeSelection ($id: String!) {
            findTrophyByID(id: $id) {
                _id
                name
                icon
                description
                rank
            }
        }
    `, {onCompleted: onRequestComplete})

    const [getLanguage] = useLazyQuery(gql`
        query languageSelection ($id: String!) {
            findLanguageByID(id: $id) {
                _id
                name
                difficulty
                icon
            }
        }
    `, {onCompleted: onRequestComplete})

    //query structure for tabbing.
    const listQueries = [
        gql`
        {
            findAllChallenges {
                _id
                title
            }
        }
        `,
        gql`
        {
            findAllTrophies {
                _id
                name
            }
        }
        `,
        gql`
        {
            findAllLanguages {
                _id
                name
            }
        }
        `
    ]
    const { loading, error, data } = useQuery(listQueries[props.dataIndex])

    //set intial list values
    useEffect(() => {
        if (data) {
            setListItems(data[Object.keys(data)[0]])
        }
    }, [data])

    //Searching functionality
    const [listItems, setListItems] = useState([])
    const filterList = (query) => {
        const inputRegex = RegExp(query.split('').join('.*'))
        var results = data[Object.keys(data)[0]].filter((key) => {
            return inputRegex.exec(key.title || key.name)
        })
        setListItems(results)
    }

    //handle input
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
                            <div className={styles.editorTitle}>{formData.name || formData.title}</div>
                        </div>
                        <button onClick={() => formRef.current.handleSubmit()} className={`material-icons ${styles.submitButton}`}>file_download</button>
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

    //tab configurations
    const tabConfig = {
        layoutTabs: [
            {
                text: 'Content',
                icon: 'library_books'
            },
            {
                text: 'Users',
                icon: 'person'
            }
        ],
        contentTabs: [
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
        ],
        placeholders: [
            "Search challenges",
            "Search badges",
            "Search languages"
        ]
    }
    
    //tab states
    const [view, setView] = useState(0)    
    const [contentView, setContentView] = useState(0)

    //search state
    const [searchText, setSearchText] = useState(null)

    /*
    note: 
    I am conditionally rendering like this in order to provide more flexibility
    for adding additional content to specific tabs outside of the
    content component.
    */
    return (
        <FloatingContainer usePadding={true} switch={setView} switchTabOptions={tabConfig.layoutTabs}>
            {
                view == 0 &&
                <div className={styles.subContainer}>
                    <div className={styles.header}>
                        <div className={`${styles.spacedHorizontal} ${styles.widgetContainer}`}>
                            <input onChange={(v) => setSearchText(v.target.value)} placeholder={tabConfig.placeholders[contentView]} className={styles.searchArea}/>
                            <button className={styles.addButton}><span className="material-icons">add</span></button>
                        </div>
                        <SwitchTab switcher={setContentView} options={tabConfig.contentTabs}/>
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