//Packages
import Slider from "react-slick";
import { React } from "react";
import { useQuery, gql } from '@apollo/client';

//Components
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
    
    const { loading, error, data } = useQuery(getChallengeInfo);

    if (loading) {
        return <></>;
    }

    if (error) {
        console.log(error);
        return <p>Error</p>;
    }
    return (
            <div className={over.mainBody}>
                <div className={over.rightHeader}>
                    <text className={styles.rightHeaderText}>Join Challenge</text>
                    <button onClick={() => { Router.push(`/challenges/overview`); }} className={styles.rightHeaderButton}>
                        <span className="material-icons">code</span>Challenge Code</button>
                </div>

                <div>
                    <Slider {...settings}>
                        {Object.values(data)[0].map((data, k) => (
                            <Challenge data={data} index={k} />
                        ))}
                    </Slider>
                </div>

            </div>
        )
    
}