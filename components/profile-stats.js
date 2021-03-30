import {Bar} from 'react-chartjs-2'
import styles from '../styles/stats.module.css'

const data = {
    labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    datasets: [
        {
            label: 'Challenges',
            backgroundColor: 'white',
            data: [
                10,
                20,
                15,
                30,
                12
            ]
        }
    ],
}

const options = {
    legend : {
        display: false
    },
    scales: {
        yAxes: [{
            gridLines: {
                display: false
            },
            ticks: {
                beginAtZero: true,
                fontSize: 9,
                fontColor: '#BFBFBF'
            }
        }],
        xAxes: [{
            gridLines: {
                display: false
            },
            ticks: {
                fontSize: 9,
                fontColor: '#BFBFBF'
            }
        }]
    }
}

export default function stats() {
    return (
        <div className={styles.parent}>
            <div className={styles.topSection}>
                <div className={styles.chartContainer}>
                    <Bar 
                        data={data}
                        options={options}
                    />

                </div>
                <div className={styles.chartContainer}>

                </div>
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.chartContainer}>

                </div>
            </div>
        </div>

    )
}