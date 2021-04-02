import ChallengeView from '../components/challenge'

const data = {
    title: "Test",
    due: "12/01/2023",
    teacher: [
        {
            account: {
                name: "Mark Campbell"
            }
        }
        
    ]
}

export default function submission() {
    return (
        <ChallengeView data={data}/>
    )
}