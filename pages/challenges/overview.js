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

    console.log(props.globalProps.session.accessToken);

    const gqlClient = new GraphQLClient('http://localhost:5000/graphql',
        { headers: { authorization: "Bearer " + props.globalProps.session.accessToken } })

    const [challengeInfo, setChallengeInfo] = useState([]);

    const getChallengeInfo = gql`
      {
        findAllChallenges{
            title
            due
            teacher{
                account{
                    name
                }
            }
        }
      }
    `

    useEffect(() => {
        gqlClient.request(getChallengeInfo).then((data) => {
            setChallengeInfo(Object.values(data));
        });
    }, []);

    if (challengeInfo[0] != null) {
        console.log(challengeInfo[0]);
        return (
            <div className={over.mainBody}>
                <div className={over.rightHeader}>
                    <text className={styles.rightHeaderText}>Join Challenge</text>
                    <button onClick={() => { Router.push(`/challenges/overview`); }} className={styles.rightHeaderButton}>
                        <span className="material-icons">code</span>Challenge Code</button>
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
                <div></div>
            </>
        )
    }
}