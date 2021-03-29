import styles from '../styles/index.module.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Submission from '../components/submission-preview'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraphQLClient, gql } from 'graphql-request'
import { getSession } from 'next-auth/client'

import ChallengeView from "../components/challenge";
import { React, useEffect } from "react";
import Slider from "react-slick";

const vanishValue = 200

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? vanishValue : -vanishValue,
      opacity: 0
    };
  },
  center: {
    zIndex: 0,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: -4,
      x: direction < 0 ? vanishValue : -vanishValue,
      opacity: 0
    };
  }
};

const settings = {
  dots: false,
  infinite: true,
  slidesToScroll: 1,
  draggable: true,
  variableWidth: true,
};

function RightSideOther(props) {
  console.log("rendering right side")
  return (
    <>
      <div className={`${styles.rightHeader} ${styles.spacedHeader}`}>
        <span onClick={() => props.func(-1)} className={`material-icons noselect ${styles.challengeMiniBack}`}>arrow_back</span>
        <img className={styles.inlineLanguageIcon} src="icons/python.svg" />
        <text className={styles.rightHeaderText}>{props.data.title}</text>
      </div>
      <ChallengeView data={props.data} />
    </>
  )
}

function TeacherName(props){

  const [teacherName, setTeacherName] = useState([]);

  const getChallengeInfo = gql`
    query getTeacher($id: String!){
      findProfileByID(id: $id) {
        account{
          name
        }
      }
    }
  `
  
  useEffect(() => {
    props.client.request(getChallengeInfo, { id: props.id }).then((data) => setTeacherName(Object.values(data.findProfileByID.account.name)));
  }, []);


  return(
    <div>
      {teacherName}
    </div>
  )

}

function ChallengeComponent(props) {
  const [challengeInfo, setChallengeInfo] = useState([]);
  const [formattedTime, setFormattedTime] = useState("");

  const getChallengeInfo = gql`
    query getChallenge($id: String!){
      findChallengeByID(id: $id) {
        title
        due
        teacher
      }
    }
  
  `

  useEffect(() => {
    props.client.request(getChallengeInfo, { id: props.data.id }).then((data) => {
      setChallengeInfo(Object.values(data));
      var date = new Date(parseInt(data.findChallengeByID.due))
      setFormattedTime(date.toLocaleDateString())
    });
  }, []);

  if(challengeInfo[0] != null){
    return (
      <>
        <div key={props.k} onClick={() => props.paginate(1, props.k, challengeInfo[0])} ckey={props.k}
          func={props.paginate} className={`${styles.iChallenge} ${styles.myChallenge}`}>
          
          <div className={styles.cardHeader}>
            <img className={styles.languageIcon} src="/icons/swift.svg" />
            <div className={`${styles.dateContainer} ${styles.colouredDate}`}>
              <span className="material-icons">date_range</span>
              <text>{formattedTime}</text>
            </div>
          </div>
          <div className={styles.cardBody}>
            <text className={styles.challengeTitle}>{challengeInfo[0].title}</text>
            <div className={styles.publisher}>
              <span className="material-icons">history_edu</span>
              <TeacherName client={props.client} id={challengeInfo[0].teacher} />
            </div>
            <div className={styles.horizontalProfileContainer}>
              <img className={styles.iProfilePic} src="/profile.svg" />
              <img className={styles.iProfilePic} src="/profile.svg" />
            </div>
          </div>
        </div>
      </>
    )
  } else{
    return (
      <>
        <div>Loading</div>
      </>
    )
  }
}

function HomeChallenges(props) {

  const gqlClient = new GraphQLClient('http://localhost:5000/graphql',
    { headers: { authorization: "Bearer " + props.accessToken } })

  const [challengeList, setChallengeList] = useState([]);

  const getChallenges = gql`{
      findProfileByGoogleID(id: "${String(props.sub)}"){
          challenges{
            id
          }
       }
    }
  `

  useEffect(() => {
    gqlClient.request(getChallenges).then((data) => setChallengeList(Object.values(data.findProfileByGoogleID.challenges)));
  }, []);

  return (
    <>
      <div className={styles.rightHeader}>
        <text className={styles.rightHeaderText}>My Challenges</text>
        <button className={styles.rightHeaderButton}><span className="material-icons">add</span> Join Challenge</button>
      </div>

      <div>

        <Slider {...settings}>
          {challengeList.map((data, k) => (
            <ChallengeComponent client={gqlClient} data={data} k={k} paginate={props.paginate} />

          ))}
        </Slider>
      </div>

      <div className={styles.rightHeader}>
        <text className={styles.rightHeaderText}>Upcoming</text>
      </div>
      <div className={styles.challenges}>
        <div className={`${styles.iChallenge} ${styles.upcomingChallenge}`}>
          <div className={styles.cardHeader}>
            <img className={styles.languageIcon} src="/icons/swift.svg" />
            <div className={`${styles.dateContainer} ${styles.colouredDate}`} style={{ background: 'transparent' }}>
              <span className="material-icons">date_range</span>
              <text>10/11/22</text>
            </div>
          </div>
          <div className={`${styles.cardBody}`} style={{ gap: '0.7rem' }}>
            <text className={styles.upcomingTitle}>Google Api Implementation</text>
            <div className={styles.upcomingWidgets}>
              <div className={styles.publisher}>
                <span className="material-icons">history_edu</span>
                  Steve Rich
                </div>
              <button className={`${styles.addWidget} material-icons`}>add</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )

}

export default function authIndex(props) {
  const [direction, setDirection] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const [data, setData] = useState(0);

  const paginate = (newDirection, key, data) => {
    setCurrentChallenge(key)
    setData(data);

    if (direction <= 0) {
    }
    if (newDirection == 1 && direction == 1) {
      if (key != currentChallenge) {
      }
    } else {
      setDirection(newDirection)
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.leftContent}>
        <div className={styles.leftHeaderContainer}>
          <div className={styles.leftHeaderItem}>
            <span className="material-icons">new_releases</span>
                Recent
              </div>
          <div className={styles.leftHeaderItem}>
            <span className="material-icons">date_range</span>
                Last Month
              </div>
          <div className={styles.leftHeaderItem}>
            <span className="material-icons">code_off</span>
                Language
              </div>
        </div>
        <div className={styles.codePreviews}>

          <Submission ckey={1} func={paginate} />
          <Submission ckey={6} func={paginate} />
          <Submission />
        </div>
      </div>

      <div className={styles.rightContent}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            style={{ width: "100%", position: "absolute", zIndex: -1, display: "flex", flexDirection: "column", gap: "1.4rem", marginRight: "2rem" }}
            key={currentChallenge}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {direction <= 0 ? <HomeChallenges paginate={paginate} sub={props.globalProps.session.sub} accessToken={props.globalProps.session.accessToken}
              client={props.globalProps.client} />
              : <RightSideOther data={currentChallenge, data} func={paginate} />}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Reference session context (will remove):

export async function getServerSideProps(context) {
  var s = await getSession(context)

  return {
    props: {
      session: s,
    }
  }
}