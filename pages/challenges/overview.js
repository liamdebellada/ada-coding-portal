//Packages
import Slider from "react-slick";
import { React, useEffect, useState } from "react";
import { GraphQLClient, gql } from 'graphql-request';

// Components
import Challenge from '../../components/challenge-card';

//Styling
import styles from '../../styles/index.module.css';
import over from '../../styles/overview.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function settings(props) {

    const settings = {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        draggable: true,
        variableWidth: true,
    };

    const gqlClient = new GraphQLClient('http://localhost:5000/graphql',
        { headers: { authorization: "Bearer " + props.globalProps.session.accessToken } })

    const [challengeInfo, setChallengeInfo] = useState([]);
    const [formattedTime, setFormattedTime] = useState("");

    const getChallengeInfo = gql`
      {
        findAllChallenges{
            title
            due
            teacher
        }
      }
    `

    useEffect(() => {
        gqlClient.request(getChallengeInfo).then((data) => {
            setChallengeInfo(Object.values(data));
            console.log(data.findAllChallenges[0].due);
            var date = new Date(parseInt(data.findAllChallenges.due))
            setFormattedTime(date.toLocaleDateString())
        });
    }, []);

    if (challengeInfo[0] != null) {
        return (
            <div className={over.mainBody}>
                <div className={over.rightHeader}>
                    <text className={styles.rightHeaderText}>Join Challenge</text>
                    <button onClick={() => { Router.push(`/challenges/overview`); }} className={styles.rightHeaderButton}>
                        <span className="material-icons">add</span> Join Challenge</button>
                </div>

                <div>
                    <Slider {...settings}>
                        {challengeInfo[0].map((data, k) => (
                            <Challenge data={data} index={k} client={gqlClient} />
                        ))}
                    </Slider>
                </div>

            </div>
        )
    } else {
        return (
            <>
                <div>Loading</div>
            </>
        )
    }
}