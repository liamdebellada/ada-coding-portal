//ui
import FloatingContainer from '../../components/layout/floatingContainer'
import SwitchTab from '../../components/ui/switchTab'
import { ChallengesForm } from '../../components/forms/admin'

//react
import {useState, useRef, useEffect} from 'react'

//gql
import { useQuery, gql } from '@apollo/client';

//styling
import styles from '../../styles/adminPanel.module.css'

const ContentComp = () => {

    const formRef = useRef()

    const UpdateEditorArea = () => {
        console.log("updating content")
    }

    const dataForForm = {
        title: 'Unit 4 - Booking system challenge',
        description: 'large content',
        due: '2021-10-04',
        languages: [
            'IDvalue1',
            'IDvalue2'
        ],
        teamSize: 1
    }
    

    return (
        <div className={styles.grid}>
            <div style={{width: 'max-content'}} className={styles.row}>
 
            <div className={styles.listWrapper}>
                <ListItem update={UpdateEditorArea}/>
                <ListItem update={UpdateEditorArea}/>
            </div>

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
                        <ChallengesForm forwardedRef={formRef} options={dataForForm}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ListItem = (props) => {
    return (
        <div onClick={props.update} className={styles.listItem}>
            <img className={styles.listImage} src="/python-white.svg"/>
            <div>{"value"}</div>
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

    let query = gql`
    {
        findAllChallenges {
            title
        }
    }
    `
    const {loading, error, data} = useQuery(query)

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <FloatingContainer switch={setView} switchTabOptions={switchable}>
            {
                view == 0 &&
                <div className={styles.subContainer}>
                    <div className={styles.header}>
                        <div className={styles.spacedHorizontal}>
                            <input placeholder={placeholders[contentView]} className={styles.searchArea}/>
                            <button className={styles.addButton}><span className="material-icons">add</span></button>
                        </div>
                        <SwitchTab switcher={setContentView} options={contentSwitch}/>
                    </div>
                    <div className={styles.contentMain}>
                        {
                            contentView == 0 &&
                            <ContentComp tabIndex={contentView}/>
                        }
                        {
                            contentView == 1 &&
                            <ContentComp tabIndex={contentView}/>
                        }
                        {
                            contentView == 2 &&
                            <ContentComp tabIndex={contentView}/>
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