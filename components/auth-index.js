import styles from '../styles/index.module.css'
import Submission from '../components/submission-preview'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChallengeView from "../components/challenge";

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


function RightSideDefault() {
  return (
    <>
    <div className={styles.rightHeader}>
      <text className={styles.rightHeaderText}>My Challenges</text>
      <button className={styles.rightHeaderButton}><span className="material-icons">add</span> Join Challenge</button>
    </div>
    <div className={styles.challenges}>
      {[1,2].map((c,k) => (
      <div key={k} className={`${styles.iChallenge} ${styles.myChallenge}`}>
        <div className={styles.cardHeader}>
          <img className={styles.languageIcon} src="/icons/swift.svg"/>
          <div className={`${styles.dateContainer} ${styles.colouredDate}`}>
              <span className="material-icons">date_range</span>
              <text>10/11/22</text>
          </div>
        </div>
        <div className={styles.cardBody}>
          <text className={styles.challengeTitle}>Unit 4 - Test content longer and longer</text>
          <div className={styles.publisher}>
            <span className="material-icons">history_edu</span>
            Steve Rich
          </div>
          <div className={styles.horizontalProfileContainer}>
            <img className={styles.iProfilePic} src="/profile.svg"/>
            <img className={styles.iProfilePic} src="/profile.svg"/>
          </div>
        </div>
      </div>
      ))}
    </div>
      <div className={styles.rightHeader}>
        <text className={styles.rightHeaderText}>Upcoming</text>
      </div>
      <div className={styles.challenges}>
        <div className={`${styles.iChallenge} ${styles.upcomingChallenge}`}>
          <div className={styles.cardHeader}>
            <img className={styles.languageIcon} src="/icons/swift.svg"/>
            <div className={`${styles.dateContainer} ${styles.colouredDate}`} style={{background: 'transparent'}}>
                <span className="material-icons">date_range</span>
                <text>10/11/22</text>
            </div>
          </div>
          <div className={`${styles.cardBody}`} style={{gap: '0.7rem'}}>
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

function RightSideOther(props) {
  console.log("rendering right side")
  return (
    <>
      <div className={`${styles.rightHeader} ${styles.spacedHeader}`}>
        <span onClick={() => props.func(-1)} className={`material-icons noselect ${styles.challengeMiniBack}`}>arrow_back</span>
        <img className={styles.inlineLanguageIcon} src="icons/python.svg"/>
        <text className={styles.rightHeaderText}>Challenge title</text>
      </div>
      <ChallengeView/>
    </>
  )
}

export default function authIndex() {
    const [direction, setDirection] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(0);
    
    const paginate = (newDirection, key) => {
      setCurrentChallenge(key)
      if (direction <= 0) {
        //console.log("request data")
      }
      if (newDirection == 1 && direction == 1) {
        if (key != currentChallenge) {
          //console.log("re-request data")
        }
      } else {
        setDirection(newDirection)
      }
    };

    //useEffect(() => console.log(direction), [direction])

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
              <Submission ckey={1} func={paginate}/>
              <Submission ckey={6} func={paginate}/>
              <Submission/>
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
                {direction <= 0 ? <RightSideDefault/> : <RightSideOther data={currentChallenge} func={paginate}/>}
            </motion.div>
            </AnimatePresence>
          </div>
      </div>
    )
}