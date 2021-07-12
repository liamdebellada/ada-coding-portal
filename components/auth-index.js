//Packages
import { motion, AnimatePresence } from "framer-motion";
import { React, useState } from "react";
import Router from 'next/router';
import Slider from "react-slick";
import { useQuery, gql } from '@apollo/client';

//Components
import ChallengeView from '../components/challenge';
import Submission from '../components/submission-preview'
import ChallengeCard from '../components/challenge-card';
import ClientRender from "../components/client-render";
import LoadingIndicator from '../components/ui/loadingIndicator'

//Styling
import styles from '../styles/index.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

function HomeChallenges(props) {
  const CHALLENGES = gql`
  {
     findProfileByGoogleID(id: "${String(props.global.session.sub)}"){
           challenges{
               title
               due
               teacher{
                   account{
                       name
                   }
               }
           }
          
      }
    }
  `;

  const { loading, error, data } = useQuery(CHALLENGES);

  if (loading) {
    return <LoadingIndicator/>
  }

  if (error) {
    return <LoadingIndicator/>
  }

  return (
    <>
      <div className={styles.rightHeader}>
        <text className={styles.rightHeaderText}>My Challenges</text>
        <button onClick={() => { Router.push(`/challenges`); }} className={styles.rightHeaderButton}>
          <span className={"material-icons"}>add</span><text className={styles.joinText}>Join Challenge</text></button>
      </div>

      <div>
        <Slider {...settings}>
          {data && data.findProfileByGoogleID.challenges.map((data, k) => (
            <ChallengeCard data={data} index={k} paginate={props.paginate} />
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
    console.log(newDirection, key, data)
    setCurrentChallenge(key);
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

      <div className={`${styles.leftContent}`}>

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
            <span className="material-icons">code</span>
                Language
              </div>
        </div>

        <div style={{"overflowY": "scroll"}} className={`${styles.codePreviews} ${styles.scroll}`}>
        
            <div className={styles.bottomFade}></div>
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
            {direction <= 0 ? 
              <ClientRender className={styles.clientRenderer}>
                <HomeChallenges paginate={paginate} global={props.globalProps}/>
              </ClientRender> 
                : <RightSideOther data={currentChallenge, data} func={paginate} />}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
